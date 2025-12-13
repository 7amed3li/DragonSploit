// src/worker/jobs/sqli-param.ts
import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { AIProvider } from '../../services/ai-provider';
import { ALL_SQL_ERROR_SIGNATURES } from '../sqli/signatures';
import { URL } from 'url';
import axios from 'axios';

// --- Helper Functions ---
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function executeRequest(urlToTest: string) {
    const startTime = Date.now();
    try {
        const response = await axios.get(urlToTest, {
            timeout: 15000,
            headers: { 'User-Agent': 'DragonSploit/2.0' },
            validateStatus: () => true,
        });
        const responseTime = Date.now() - startTime;
        const responseBody = (typeof response.data === 'string' || Buffer.isBuffer(response.data))
            ? response.data.toString()
            : JSON.stringify(response.data);
        return { response, responseTime, responseBody };
    } catch (error: any) {
        return {
            response: { status: 0, statusText: error.code || 'CONNECTION_ERROR' } as any,
            responseTime: Date.now() - startTime,
            responseBody: ''
        };
    }
}

async function recordVulnerability(prisma: PrismaClient, scanId: string, type: VulnerabilityType, severity: Severity, description: string, proof: string) {
    try {
        await prisma.vulnerability.create({ data: { scanId, type, severity, description, proof } });
        console.log("✅ Vulnerability successfully recorded in the database.");
        return true;
    } catch (error: any) {
        console.error(`❌ CRITICAL: Failed to record vulnerability. Error: ${error.message}`);
        return false;
    }
}

const MAX_ATTEMPTS = 10;
const BASIC_SIGNATURE_PAYLOADS = ["'", "\"", "1' OR 1=1--"];

/**
 * Child Processor: Handles a single parameter scan
 */
export const processSqliParamJob = async (job: Job, prisma: PrismaClient): Promise<void> => {
    const { targetUrl, scanId, param } = job.data;
    console.log(`[SQLi-Param] Starting scan for parameter: '${param}' (Job ${job.id})`);

    // Step 1: Quick Win (Signature Scan)
    let quickWinFound = false;
    for (const basicPayload of BASIC_SIGNATURE_PAYLOADS) {
        try {
            const testUrl = new URL(targetUrl);
            testUrl.searchParams.set(param, basicPayload);
            const { responseBody } = await executeRequest(testUrl.toString());
            const foundSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => responseBody.toLowerCase().includes(sig.toLowerCase()));
            if (foundSignature) {
                console.log(`\n✅✅✅ Quick Win! VULNERABILITY CONFIRMED in '${param}' ✅✅✅`);
                const proof = `Basic Payload: ${basicPayload}\nSignature: ${foundSignature}\nURL: ${testUrl}`;
                const description = `Signature-based SQL Injection confirmed in '${param}' with basic payload.`;
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                quickWinFound = true;
                break;
            }
        } catch (e) { }
    }

    if (quickWinFound) {
        console.log(`[SQLi-Param] Quick win found for '${param}'. Skipping AI scan.`);
        return;
    }

    // Step 2: Deep AI Scan
    console.log(`[Hybrid] Escalating to Conversational AI for '${param}'...`);

    let feedback = `Begin analysis on parameter '${param}'. Phase 1: Exploration.`;
    let aiFinished = false;
    let attempts = 0;

    // Tracking
    const triedPayloads = new Set<string>();
    const ineffectiveModes = new Set<string>();
    const modeTracker: Record<string, { successCount: number; failureCount: number; totalTime: number; calls: number }> = {};

    let consecutiveIneffectiveCount = 0;
    let lastResponseSignature = "";

    while (attempts < MAX_ATTEMPTS && !aiFinished) {
        attempts++;
        console.log(`\n[Deep Scan Attempt #${attempts} on '${param}']`);

        if (attempts > 1) await delay(3000); // Shorter delay for individual jobs

        const fingerprint = {
            server: 'Express',
            language: 'Node.js',
            database: 'SQLite',
            orm: 'Sequelize'
        };

        const { payload, reasoning, mode, finished } = await AIProvider.getPayload(feedback, {
            vector: 'sqli',
            parameter: param,
            attemptNumber: attempts,
            targetUrl: targetUrl,
            fingerprint: fingerprint,
            previousPayloads: Array.from(triedPayloads),
            avoidModes: Array.from(ineffectiveModes),
            modeStats: Object.entries(modeTracker).reduce((acc, [k, v]) => {
                acc[k] = {
                    successCount: v.successCount,
                    failureCount: v.failureCount,
                    avgTimeMs: v.calls > 0 ? v.totalTime / v.calls : 0
                };
                return acc;
            }, {} as any)
        });

        aiFinished = finished;

        if (aiFinished || !payload) {
            console.log(`[AI decided to end attempt on param '${param}']`);
            break;
        }

        console.log(`[AI Mode] ${mode} | Payload: "${payload}"`);
        triedPayloads.add(payload);

        try {
            const testUrl = new URL(targetUrl);
            testUrl.searchParams.set(param, payload);
            const { response, responseBody, responseTime } = await executeRequest(testUrl.toString());

            const errorSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => responseBody.toLowerCase().includes(sig.toLowerCase()));

            // --- RL Tracking ---
            if (mode) {
                if (!modeTracker[mode]) modeTracker[mode] = { successCount: 0, failureCount: 0, totalTime: 0, calls: 0 };
                modeTracker[mode].totalTime += responseTime;
                modeTracker[mode].calls++;

                const isInterest = errorSignature || response.status === 500;
                if (isInterest) modeTracker[mode].successCount++;
                else modeTracker[mode].failureCount++;
            }

            // Mode Switching
            const currentSignature = `${response.status}-${responseBody.length}`;
            if (currentSignature === lastResponseSignature && !errorSignature) consecutiveIneffectiveCount++;
            else consecutiveIneffectiveCount = 0;
            lastResponseSignature = currentSignature;

            if (consecutiveIneffectiveCount >= 2 && mode) {
                ineffectiveModes.add(mode);
                consecutiveIneffectiveCount = 0;
            }

            // Feedback Generation
            feedback = `Target responded to '${payload}' with: Status=${response.status}, Time=${responseTime.toFixed(0)}ms, Length=${responseBody.length}, Error='${errorSignature || 'None'}'`;

            // Check for Vulnerability
            if (errorSignature || responseBody.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(root@localhost)|(@@version)/i)) {
                console.log(`[AI-driven Scan] ✅ VULNERABILITY CONFIRMED in '${param}'!`);

                // Auto-Exploitation (Simplified for Child Job)
                let proof = `Payload: ${payload}\nAI Reasoning: ${reasoning}\nResponse Snippet: ${responseBody.substring(0, 200)}...`;
                const description = `AI-driven SQLi in '${param}'. Vulnerability confirmed.`;

                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                // Do NOT break. We want to find ALL types (Union, Boolean, Time, etc.)
                // Mark this mode as 'explored' so the AI switches to a new one
                if (mode) ineffectiveModes.add(mode);
                feedback = `[SYSTEM] GREAT SUCCESS with ${mode}! Now, forget ${mode}. your goal is to find a DIFFERENT type of SQL Injection (e.g. Error-Based, Boolean, Time-Based) in this SAME parameter.`;

            }

        } catch (error: any) {
            feedback = `Execution failed: ${error.message}`;
        }
    }
    console.log(`[SQLi-Param] Finished scan for '${param}'.`);
};
