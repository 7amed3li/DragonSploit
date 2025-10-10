// src/services/ai.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

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

export const generateSqlPayloadsWithGemini = async (targetUrl: string, technologyContext: string): Promise<string[]> => {
  console.log(`[Gemini Service] Generating SQLi payloads for ${targetUrl} with context: ${technologyContext}`);
  
  try {
    // --- التعديل الرئيسي والنهائي ---
    // استخدام اسم الموديل الصحيح والمستقر الذي يعمل مع أحدث إصدار من المكتبة
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", safetySettings });
    // --- نهاية التعديل ---

    const prompt = `
      Task: Generate 5 different and effective error-based SQL Injection payloads for a SQLite database.
      Output Format: Respond with ONLY a valid JSON array of strings. Do not include explanations or markdown.
      Example: ["'","' OR 1=1","'--"]
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const payloads: string[] = JSON.parse(cleanedText);

    if (Array.isArray(payloads)) {
      console.log(`[Gemini Service] Successfully generated ${payloads.length} payloads.`);
      return payloads;
    }
    return [];
  } catch (error) {
    console.error("[Gemini Service] Error communicating with Google AI:", error);
    return [];
  }
};
