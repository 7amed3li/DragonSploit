// src/worker/jobs/sqli-param.ts
import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { AIProvider } from '../../services/ai-provider';
import { ALL_SQL_ERROR_SIGNATURES } from '../sqli/signatures';
import { URL } from 'url';
import axios from 'axios';
import { createHash } from 'crypto';
import { AttackerPersona, DEFAULT_PERSONA, ELDER_PERSONA } from '../config/personas';

// --- Types ---
type ScanState = 'TESTING' | 'CONFIRMED' | 'ENUMERATING' | 'STRUCTURAL_ANALYSIS' | 'STOPPED';

// --- Helper Functions ---
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function calculateNoveltyHash(body: string): string {
    return createHash('md5').update(body).digest('hex');
}

async function executeRequest(urlToTest: string) {
    const startTime = Date.now();
    try {
        const response = await axios.get(urlToTest, {
            timeout: 10000,
            headers: { 'User-Agent': 'DragonSploit/2.0 (Cognitive)' },
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
        console.log("✅ Vulnerability recorded.");
        return true;
    } catch (error: any) {
        console.error(`❌ DB Error: ${error.message}`);
        return false;
    }
}

/**
 * Child Processor: Handles a single parameter scan with PERSONA LOGIC
 */
export const processSqliParamJob = async (job: Job, prisma: PrismaClient): Promise<void> => {
    const { targetUrl, scanId, param, persona: personaData } = job.data;

    // Hydrate persona (use default if missing)
    const persona: AttackerPersona = personaData || DEFAULT_PERSONA;

    console.log(`\n[SQLi-Param] 🚀 Starting scan for '${param}' using Persona: [${persona.name}]`);
    console.log(`[Config] MaxAttempts: ${persona.maxAttempts} | StructureAnalysis: ${persona.structuralAnalysis}`);

    // --- State Machine Initialization ---
    let state: ScanState = 'TESTING';
    let attempts = 0;
    let successfulFindings = 0;
    const startTime = Date.now();
    const noveltyHistory: string[] = [];

    // AI Context
    let feedback = `Begin analysis on parameter '${param}'. Phase: ${state}.`;
    const triedPayloads = new Set<string>();
    const ineffectiveModes = new Set<string>();
    const modeTracker: Record<string, any> = {};

    // --- MAIN STATE LOOP ---
    while (state !== 'STOPPED') {

        // 1. GLOBAL QUOTA CHECKS
        if (attempts >= persona.maxAttempts) {
            console.log(`[Quota] Max attempts (${persona.maxAttempts}) reached. Stopping.`);
            state = 'STOPPED';
            break;
        }

        if (Date.now() - startTime > persona.timeoutMs) {
            console.log(`[Quota] Timeout (${persona.timeoutMs}ms) reached. Stopping.`);
            state = 'STOPPED';
            break;
        }

        if (successfulFindings >= persona.maxSuccessFindings) {
            console.log(`[Quota] Max findings (${persona.maxSuccessFindings}) reached. Mission Accomplished.`);
            state = 'STOPPED';
            break;
        }

        attempts++;
        console.log(`\n[${persona.name}] Step ${attempts}/${persona.maxAttempts} | State: ${state}`);

        // AI GENERATION
        const fingerprint = job.data.technologyFingerprint || { server: 'Unknown', language: 'Unknown', database: 'Unknown' };

        const aiResponse = await AIProvider.getPayload(feedback, {
            vector: 'sqli',
            parameter: param,
            attemptNumber: attempts,
            targetUrl,
            method: job.data.requestMethod || 'GET', // Pass Method
            fingerprint,
            previousPayloads: Array.from(triedPayloads),
            avoidModes: Array.from(ineffectiveModes),
            modeStats: modeTracker,
            persona: persona // PASS PERSONA TO AI SERVICE
        });

        if (aiResponse.finished || !aiResponse.payload) {
            console.log(`[AI] Decided to stop.`);
            state = 'STOPPED';
            break;
        }

        console.log(`[AI] Payload: "${aiResponse.payload}" (Mode: ${aiResponse.mode})`);
        triedPayloads.add(aiResponse.payload);

        // 3. EXECUTION
        const testUrl = new URL(targetUrl);
        testUrl.searchParams.set(param, aiResponse.payload);

        const { response, responseBody, responseTime } = await executeRequest(testUrl.toString());

        // 4. NOVELTY DETECTION
        const currentHash = calculateNoveltyHash(responseBody);
        noveltyHistory.push(currentHash);
        if (noveltyHistory.length > 3) noveltyHistory.shift();

        // Check for 3 repeats
        if (noveltyHistory.length === 3 && noveltyHistory.every(h => h === currentHash)) {
            console.log(`[Novelty] Loop detected (Same response 3 times). Aborting this branch.`);
            // Penalize this mode
            if (aiResponse.mode) ineffectiveModes.add(aiResponse.mode);
            feedback = `[SYSTEM] You are stuck in a loop. The last 3 payloads produced IDENTICAL responses. CHANGE STRATEGY immediately.`;
            continue; // Retry with feedback
        }

        // 5. ANALYSIS & STATE TRANSITIONS
        const errorSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => responseBody.toLowerCase().includes(sig.toLowerCase()));

        // --- State: TESTING ---
        if (state === 'TESTING') {
            const hasHighConfidence = aiResponse.confidence && aiResponse.confidence >= 80;
            const hasMediumConfidence = aiResponse.confidence && aiResponse.confidence >= 50;

            // STRICT CONFIRMATION LOGIC (Two-Witness Rule)
            if (errorSignature) {
                console.log(`[${persona.name}] 💥 Confirmed by SQL Error Signature: "${errorSignature}"`);
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, `SQL Injection (Error-Based) in '${param}'`, `Payload: ${aiResponse.payload}\nError: ${errorSignature}`);
                successfulFindings++;
                state = 'CONFIRMED';
            }
            else if (hasHighConfidence) {
                console.log(`[${persona.name}] 💥 Confirmed by AI High Confidence (${aiResponse.confidence}%).`);
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, `SQL Injection (AI-Verified) in '${param}'`, `Payload: ${aiResponse.payload}\nReasoning: ${aiResponse.reasoning}`);
                successfulFindings++;
                state = 'CONFIRMED';
            }
            else if (response.status === 500) {
                console.log(`[Insight] HTTP 500 detected, but insufficient evidence (No SQL Error / Low Confidence). Ignoring as per strict rules.`);
            }
        }

        // --- State: CONFIRMED ---
        else if (state === 'CONFIRMED') {
            if (persona.structuralAnalysis) {
                state = 'STRUCTURAL_ANALYSIS';
                feedback = `[SYSTEM] Vulnerability Confirmed. SWITCHING TO PHASE: STRUCTURAL_ANALYSIS. Your goal is to infer the table names and schema.`;
            } else if (persona.allowEnumeration) {
                state = 'ENUMERATING';
                feedback = `[SYSTEM] Vulnerability Confirmed. SWITCHING TO PHASE: ENUMERATION. Extract version and user.`;
            } else {
                console.log(`[${persona.name}] Enumeration not allowed. Stopping.`);
                state = 'STOPPED';
            }
        }

        // --- State: STRUCTURAL_ANALYSIS (The Elder) ---
        else if (state === 'STRUCTURAL_ANALYSIS') {
            // Check if AI inferred anything useful
            if (responseBody.includes("syntax") || responseBody.includes("column")) {
                console.log(`[Elder] Structural clue found!`);
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.INFO, `Schema Inference Clue`, `Reasoning: ${aiResponse.reasoning}`);
            }
            // Keep going until quota
        }

        // Update Feedback for next loop
        feedback = `Last Payload: ${aiResponse.payload}\nResponse: Status=${response.status}, Time=${responseTime}ms, Len=${responseBody.length}\nError=${errorSignature || 'None'}`;

        // Tracking
        if (aiResponse.mode) {
            if (!modeTracker[aiResponse.mode]) modeTracker[aiResponse.mode] = { successCount: 0, failureCount: 0, avgTimeMs: 0, calls: 0 };
            // Update stats...
        }
    }

    console.log(`[SQLi-Param] Scan completed for '${param}'. Final State: ${state}`);
};
