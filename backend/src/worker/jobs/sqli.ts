// src/worker/jobs/sqli.ts (النسخة النهائية والمستقرة)

import { Job } from 'bullmq';
import axios from 'axios';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client'; 
import { startSqliExploitationChat, getNextSqlPayload } from '../../services/ai';
import { ALL_SQL_ERROR_SIGNATURES } from '../signatures';
import { URL } from 'url';

const prisma = new PrismaClient();
const sqlErrorSignatures = ALL_SQL_ERROR_SIGNATURES;
const MAX_ATTEMPTS_PER_PARAM = 7;
const COMMON_FALLBACK_PARAMS = ['id', 'q', 'search', 'query', 'page', 'category', 'item', 'view'];
const TIME_DELAY_THRESHOLD = 4000;


/**
 * دالة مساعدة للتأخير لعدد معين من الميلي ثانية.
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * دالة مساعدة لتنفيذ طلب HTTP وتسجيل الوقت.
 */
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

/**
 * 🆕 دالة مساعدة لتسجيل الثغرة مع معالجة أخطاء Prisma.
 * هذا يضمن عدم تعطل العامل (Worker) عند فشل قاعدة البيانات.
 */
async function recordVulnerability(scanId: string, type: VulnerabilityType, severity: Severity, description: string, proof: string) {
    
    // 🛑 التعديل الحاسم: التحقق من وجود سجل الفحص قبل التسجيل لمنع Foreign Key Violation
    const scanExists = await prisma.scan.findUnique({
        where: { id: scanId },
        select: { id: true },
    });
    
    if (!scanExists) {
        console.error(`❌ CRITICAL: Scan ID ${scanId} does not exist. Cannot record vulnerability due to Foreign Key Constraint violation.`);
        return false;
    }

    try {
        await prisma.vulnerability.create({
            data: {
                scanId: scanId, 
                type: type, 
                severity: severity,
                description: description,
                proof: proof,
            }
        });
        console.log("✅ Vulnerability successfully recorded in the database.");
        return true;
    } catch (error: any) {
        console.error(`❌ CRITICAL: Failed to record vulnerability [${type}] in DB. Error: ${error.message}`);
        return false;
    }
}


export const processSqliJob = async (job: Job): Promise<void> => {
    const { targetUrl, scanId, technologyFingerprint } = job.data;
    console.log(`[SQLi Worker] Starting DYNAMIC DISCOVERY & EXPLOITATION for job ${job.id}`);
    
    const url = new URL(targetUrl);
    let paramsToTest = Array.from(url.searchParams.keys());

    if (paramsToTest.length === 0) {
        console.log('[SQLi Worker] No parameters found in URL, using common fallback list.');
        paramsToTest = COMMON_FALLBACK_PARAMS;
    }
    console.log(`[SQLi Worker] Identified parameters to test: [${paramsToTest.join(', ')}]`);

    // **الخطوة 1: حساب خط الأساس (BASELINE)**
    console.log('[SQLi Worker] Calculating baseline metrics...');
    const { response: baselineResponse, responseTime: baselineTime, responseBody: baselineBody } = await executeRequest(targetUrl);
    
    const baselineLength = baselineBody.length;
    console.log(`[SQLi Worker] Baseline: Status ${baselineResponse.status}, Time ${baselineTime}ms, Length ${baselineLength}`);


    for (const param of paramsToTest) {
        console.log(`\n--- Testing Parameter: [${param}] ---`);
        
        const technologyContext = JSON.stringify(technologyFingerprint) || 'Unknown Stack (Defaulting to basic SQL payloads)';
        const chat = startSqliExploitationChat(technologyContext);

        let attempts = 0;
        let feedback = "Start. Give me the first payload.";

        while (attempts < MAX_ATTEMPTS_PER_PARAM) {
            attempts++;
            console.log(`[Attempt #${attempts} on param '${param}']`);

            if (attempts > 1) {
                console.log(`[Throttling] Waiting for 6 seconds to respect API rate limits...`);
                await delay(6000); 
            }

            const { payload, finished } = await getNextSqlPayload(chat, feedback);

            if (finished || !payload) {
                console.log(`[AI decided to end attempt on param '${param}']`);
                break;
            }

            console.log(`[AI suggested payload: "${payload}"]`);

            try {
                const testUrl = new URL(targetUrl);
                testUrl.searchParams.set(param, payload);
                const urlToTest = testUrl.toString();

                const { response, responseTime, responseBody } = await executeRequest(urlToTest);
                const responseBodyLower = responseBody.toLowerCase();

                // **المنطق الذهبي 1: التحقق من الثغرات الزمنية العمياء (Time-Based)**
                if (responseTime > baselineTime + TIME_DELAY_THRESHOLD) {
                    console.log(`\n🔥🔥🔥 CRITICAL VULNERABILITY CONFIRMED: Time-Based SQLi 🔥🔥🔥`);
                    
                    const proof = `Payload: ${payload}\nURL: ${urlToTest}\nResponse Delay: ${responseTime}ms (Baseline: ${baselineTime}ms)`;
                    const description = `Conversational AI confirmed Time-Based Blind SQL Injection in '${param}'. Server delayed response for ${responseTime}ms.`;

                    await recordVulnerability(scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                    
                    return; 
                }
                
                // **المنطق الذهبي 2: التحقق من رسائل الخطأ (Error-Based)**
                for (const signature of sqlErrorSignatures) {
                    if (response.status === 500 || responseBodyLower.includes(signature.toLowerCase())) {
                        console.log(`\n✅✅✅ VULNERABILITY CONFIRMED: Error-Based SQLi ✅✅✅`);

                        const proof = `Payload: ${payload}\nError Signature: "${signature || 'Status 500 error'}"\nURL: ${urlToTest}`;
                        const description = `Error-based SQL Injection confirmed in the '${param}' parameter. Signature found in Status ${response.status} response.`;
                        
                        await recordVulnerability(scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                        
                        return;
                    }
                }
                
                // إرسال التغذية الراجعة الغنية إلى AI للمحاولة التالية
                feedback = `Input '${payload}' gave: Status ${response.status}, Time ${responseTime}ms, Length ${responseBody.length}. (Baseline: Status ${baselineResponse.status}, Time ${baselineTime}ms, Length ${baselineLength}). Analyze and suggest next payload or conclude.`;

            } catch (error: any) {
                feedback = `Input string '${payload}' for parameter '${param}' resulted in a network error: ${error.message}. Suggest an alternative payload or decide to stop.`;
            }
        }
    }

    console.log(`\n[SQLi Worker] Finished dynamic scan for job ${job.id}. No vulnerabilities found.`);
};