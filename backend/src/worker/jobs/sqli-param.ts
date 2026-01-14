// src/worker/jobs/sqli-param.ts
import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { AIProvider } from '../../services/ai-provider';
import { ALL_SQL_ERROR_SIGNATURES } from '../sqli/signatures';
import { URL } from 'url';
import axios from 'axios';
import { createHash } from 'crypto';
import { AttackerPersona, DEFAULT_PERSONA, ELDER_PERSONA } from '../config/personas';
import { VisualVerifier, Severity as VisualSeverity } from '../../services/visual-verifier';
import { FingerprintEngine, Fingerprint } from '../../services/fingerprint/engine';

// --- Types ---
type ScanState = 'TESTING' | 'CONFIRMED' | 'ENUMERATING' | 'STRUCTURAL_ANALYSIS' | 'STOPPED';

// --- Helper Functions ---
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * 🕵️‍♂️ AUTO-FINGERPRINTING: Detects DB and Server type dynamically
 */
async function detectFingerprint(targetUrl: string): Promise<Fingerprint> {
    console.log(`[Fingerprint] 🕵️‍♂️ Initiating DRAGON-EYE Analysis on ${targetUrl}...`);
    
    let fingerprint: Fingerprint = { 
        lang: 'Unknown', 
        db: 'Unknown', 
        server: 'Unknown', 
        confidence: 0, 
        source: 'None' 
    };

    try {
        // --- PHASE 1: Passive Analysis (Cookies & Headers) ---
        // We use a harmless HEAD request first
        const response = await axios.head(targetUrl, { 
            validateStatus: () => true,
            timeout: 15000 
        });

        const headers = response.headers;
        const cookies = headers['set-cookie'] || [];
        
        console.log(`[Fingerprint] 🔍 Passive Scan: Analyzing ${cookies.length} cookies and headers...`);
        
        // Use the Engine for Passive Analysis
        const passiveResult = FingerprintEngine.analyzePassive(headers, cookies);
        fingerprint = { ...fingerprint, ...passiveResult };

        if (fingerprint.confidence > 0) {
            console.log(`[Fingerprint] 💡 Passive Match: ${JSON.stringify(fingerprint)}`);
        }

        // --- PHASE 2: Active Error Provocation (The "Hacker" Touch) ---
        // If we aren't 100% sure, or just to be safe, we try to provoke an error
        const errorUrl = `${targetUrl}'`; // Simple quote injection
        console.log(`[Fingerprint] ⚡ Active Probe: Provoking errors via ${errorUrl}`);

        try {
            const errResponse = await axios.get(errorUrl, { 
                validateStatus: () => true,
                timeout: 15000 
            });
            
            const body = typeof errResponse.data === 'string' ? errResponse.data : JSON.stringify(errResponse.data);
            
            // Use the Engine for Active Analysis
            const activeResult = FingerprintEngine.analyzeActive(body);

            if (activeResult) {
                console.log(`[Fingerprint] 🎯 Active Hit: Found Error Signature for [${activeResult.db}]`);
                // Merge Active result (High Priority) with Passive result
                fingerprint = FingerprintEngine.merge(fingerprint, activeResult);
            }

        } catch (probeError: any) {
             console.log(`[Fingerprint] ⚠️ Active probe failed (Network Error): ${probeError.message}`);
        }

    } catch (error: any) {
        console.log(`[Fingerprint] ❌ Fingerprinting failed: ${error.message}`);
    }

    console.log(`[Fingerprint] 📝 FINAL REPORT: [DB: ${fingerprint.db || 'Unknown'}] | [Server: ${fingerprint.server || 'Unknown'}] | [Lang: ${fingerprint.lang || 'Unknown'}]`);
    return fingerprint;
}



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

/**
 * 🎬 VISUAL VERIFICATION: Opens browser to show the vulnerability to user
 * Works for ALL vulnerability types (Error-Based, UNION, Blind, etc.)
 */

async function visualVerifyInjection(targetUrl: string, payload: string, scanId: string, paramName?: string): Promise<void> {
    console.log(`\n[Visual] 🎬 Opening browser to show vulnerability...`);
    
    try {
        const verifier = new VisualVerifier({ headless: false }); // 👈 VISIBLE BROWSER
        
        // Build the injection URL
        const testUrl = new URL(targetUrl);
        const actualParam = paramName || testUrl.searchParams.keys().next().value || 'q';
        
        // Use data leak verifier (shows the response in browser)
        await verifier.verifyDataLeak(
            {
                targetUrl: targetUrl,
                paramName: actualParam,
                payload: payload,
                method: 'GET'
            },
            {
                scanId: scanId,
                severity: VisualSeverity.HIGH,
                vulnerabilityType: 'SQL_INJECTION'
            }
        );
        
        console.log(`[Visual] ✅ Browser verification complete!`);
    } catch (error: any) {
        console.warn(`[Visual] ⚠️ Browser verification failed: ${error.message}`);
    }
}

async function recordVulnerability(
    prisma: PrismaClient, 
    scanId: string, 
    type: VulnerabilityType, 
    severity: Severity, 
    description: string, 
    proof: string,
    targetUrl?: string,  // 🆕 For visual verification
    payload?: string     // 🆕 For visual verification
) {
    try {
        await prisma.vulnerability.create({ data: { scanId, type, severity, description, proof } });
        console.log("✅ Vulnerability recorded.");
        
        // 🎬 OPEN BROWSER TO SHOW USER
        if (targetUrl && payload) {
            await visualVerifyInjection(targetUrl, payload, scanId);
        }
        
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

    // 🕵️‍♂️ AUTO-FINGERPRINTING (ONCE PER JOB)
    // Optimization: If fingerprint was already detected by the dispatcher, reuse it.
    let fingerprint: Fingerprint;
    if (job.data.technologyFingerprint && job.data.technologyFingerprint.confidence > 0) {
        console.log(`[Fingerprint] ♻️ Reusing existing fingerprint for ${targetUrl}`);
        fingerprint = job.data.technologyFingerprint;
    } else {
        fingerprint = await detectFingerprint(targetUrl);
    }
    
    await job.updateProgress(5); // Initial progress

    // --- MAIN STATE LOOP ---
    while (state !== 'STOPPED') {

        // Keep job alive
        await job.updateProgress(Math.min(95, Math.floor((attempts / persona.maxAttempts) * 100)));

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

    // AI GENERATION: Use Real Fingerprint
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
        
        // 🆕 HEURISTIC: Check for Data Leaks (Juice Shop specific but useful generally)
        // If we injected 'sqlite_version', and getting a version-like string back?
        // Or if response contains the payload we injected (reflected) - that's XSS not SQLi, but maybe useful context.
        // Better: Check for known table names or DB keywords that shouldn't be there.
        const dataLeakSignature = responseBody.match(/(sqlite_version|sqlite_master|admin@|pass_hash)/i);

        // --- State: TESTING ---
        if (state === 'TESTING') {
            const hasHighConfidence = aiResponse.confidence && aiResponse.confidence >= 80;
            const hasMediumConfidence = aiResponse.confidence && aiResponse.confidence >= 50;

            // STRICT CONFIRMATION LOGIC (Two-Witness Rule)
            if (errorSignature) {
                console.log(`[${persona.name}] 💥 Confirmed by SQL Error Signature: "${errorSignature}"`);
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, `SQL Injection (Error-Based) in '${param}'`, `Payload: ${aiResponse.payload}\nError: ${errorSignature}`, targetUrl, aiResponse.payload);
                successfulFindings++;
                state = 'CONFIRMED';
            }
            else if (dataLeakSignature) {
                 console.log(`[${persona.name}] 💥 Confirmed by Data Leak: "${dataLeakSignature[0]}"`);
                 await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, `SQL Injection (Data Leak) in '${param}'`, `Payload: ${aiResponse.payload}\nLeak: ${dataLeakSignature[0]}`, targetUrl, aiResponse.payload);
                 successfulFindings++;
                 state = 'CONFIRMED';
            }
            else if (hasHighConfidence) {
                console.log(`[${persona.name}] 💥 Confirmed by AI High Confidence (${aiResponse.confidence}%).`);
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.MEDIUM, `SQL Injection (AI-Verified) in '${param}'`, `Payload: ${aiResponse.payload}\nReasoning: ${aiResponse.reasoning}`, targetUrl, aiResponse.payload);
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
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.INFO, `Schema Inference Clue`, `Reasoning: ${aiResponse.reasoning}`, targetUrl, aiResponse.payload);
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
