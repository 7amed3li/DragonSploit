/**
 * DragonSploit - Ollama Local LLM Integration
 * Provides unlimited, uncensored AI-powered payload generation for security testing
 */

import axios from 'axios';
import { SECURITY_TESTING_INSTRUCTION, TRIBUNAL_PROMPT } from './ai-prompts';

// ============================================================================
// CONFIGURATION
// ============================================================================

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const PRIMARY_MODEL = process.env.OLLAMA_PRIMARY_MODEL || 'llama3.1:8b-instruct-q4_K_M';
const FALLBACK_MODEL = process.env.OLLAMA_FALLBACK_MODEL || 'qwen2.5-coder:7b';
const TIMEOUT_MS = parseInt(process.env.OLLAMA_TIMEOUT || '120000');

console.log(`\n🦙 ==================================================`);
console.log(`🦙 DragonSploit Ollama Engine v1.0`);
console.log(`🦙 Primary: ${PRIMARY_MODEL}`);
console.log(`🦙 Fallback: ${FALLBACK_MODEL}`);
console.log(`🦙 Endpoint: ${OLLAMA_BASE_URL}`);
console.log(`🦙 Status: UNCENSORED | UNLIMITED | LOCAL`);
console.log(`🦙 ==================================================\n`);

// ============================================================================
// SEMAPHORE FOR OLLAMA RATE LIMITING
// ============================================================================

class Semaphore {
    private tasks: (() => void)[] = [];
    private count: number;

    constructor(private max: number) {
        this.count = max;
    }

    async acquire(): Promise<void> {
        if (this.count > 0) {
            this.count--;
            return;
        }
        return new Promise<void>(resolve => this.tasks.push(resolve));
    }

    release(): void {
        if (this.tasks.length > 0) {
            const next = this.tasks.shift();
            if (next) next();
        } else {
            this.count++;
        }
    }
}

// Global semaphore to prevent OOM on local machine
const ollamaSemaphore = new Semaphore(1);

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

export async function isOllamaAvailable(): Promise<boolean> {
    try {
        await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 2000 });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Generates the next SQL injection payload using Ollama.
 */
export async function getNextSqlPayloadOllama(
    feedback: string, 
    context: any = {}
): Promise<any> {
    await ollamaSemaphore.acquire();
    
    // Construct Prompt
    const historyText = (context.history || [])
        .map((h: any, i: number) => `Attempt #${i+1} [${h.payload}]: ${h.status} - ${h.response?.substring(0, 100)}...`)
        .join('\n');

    const prompt = `
${SECURITY_TESTING_INSTRUCTION}

TARGET CONTEXT:
URL: ${context.url || 'Unknown'}
Fingerprint: ${context.fingerprint ? JSON.stringify(context.fingerprint) : 'Unknown'}

ATTACK HISTORY:
${historyText}

LATEST FEEDBACK:
${feedback}

Based on the history and feedback, generate the NEXT single best payload.
Remember to return ONLY JSON.
`;

    try {
        let modelToUse = PRIMARY_MODEL;
        let response = null;

        // Try Primary Model
        try {
            response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
                model: modelToUse,
                prompt: prompt,
                stream: false,
                format: 'json', // 👈 FORCE JSON MODE (Crucial for Llama 3)
                options: { temperature: 0.7, num_predict: 256 }
            }, { timeout: TIMEOUT_MS });
        } catch (err: any) {
            console.warn(`[Ollama] Primary model failed, switching to fallback: ${FALLBACK_MODEL}`);
            modelToUse = FALLBACK_MODEL;
            response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
                model: modelToUse,
                prompt: prompt,
                stream: false,
                format: 'json', // 👈 FORCE JSON MODE
                options: { temperature: 0.5, num_predict: 256 }
            }, { timeout: TIMEOUT_MS });
        }

        if (!response || !response.data || !response.data.response) {
            throw new Error('Empty response from Ollama');
        }

        const rawResponse = response.data.response;
        // console.log(`[Ollama DEBUG] Raw: ${rawResponse}`); // Uncomment for debugging

        // 🛠️ SMART JSON EXTRACTION
        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        
        let result: any;
        if (!jsonMatch) {
            // If regex fails despite JSON mode, try direct parse
            try {
                result = JSON.parse(rawResponse);
            } catch (e) {
                 console.warn(`[Ollama] ⚠️ JSON parse failed. Raw: "${rawResponse.substring(0, 50)}..."`);
                 // FALLBACK: Don't stop the scan!
                 return {
                     payload: "' OR 1=1 --", // Safe fallback
                     reasoning: "AI Parsing Error (Fallback)",
                     finished: false,
                     confidence: 10
                 };
            }
        } else {
             try {
                result = JSON.parse(jsonMatch[0]);
             } catch (e) {
                console.warn(`[Ollama] ⚠️ Extracted JSON invalid.`);
                 return {
                     payload: "' OR '1'='1",
                     reasoning: "AI JSON Invalid (Fallback)",
                     finished: false,
                     confidence: 10
                 };
             }
        }

        return {
            payload: result.payload,
            reasoning: result.reasoning || "AI generated",
            finished: result.finished || false,
            confidence: result.confidence || 50,
            mode: result.mode // 👈 Pass the strategy mode
        };

    } catch (error: any) {
        console.error(`[Ollama] Error generating payload: ${error.message}`);
        return {
            payload: null,
            reasoning: `Ollama Error: ${error.message}`,
            finished: true
        };
    } finally {
        ollamaSemaphore.release();
    }
}

/**
 * THE AI TRIBUNAL (JUDGE 2)
 * Analyzes page content to determine if authentication was successful.
 */
export async function analyzePageContent(pageText: string): Promise<{
    authenticated: boolean;
    confidence: number;
    reason: string;
}> {
    await ollamaSemaphore.acquire();

    try {
        // Inject page text into the template
        const prompt = TRIBUNAL_PROMPT.replace('{{PAGE_TEXT}}', pageText.substring(0, 4000));

        const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
            model: PRIMARY_MODEL,
            prompt: prompt,
            stream: false,
            options: { temperature: 0.1, num_predict: 128 } // Low temp for deterministic logic
        }, { timeout: TIMEOUT_MS });

        let jsonStr = response.data.response.trim();
        jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const result = JSON.parse(jsonStr);
        
        return {
            authenticated: result.authenticated === true,
            confidence: typeof result.confidence === 'number' ? result.confidence : 50,
            reason: result.reason || "AI Judgment"
        };
        
    } catch (error: any) {
        console.error(`[AI Tribunal] ❌ Judge 2 Failed: ${error.message}`);
        return { authenticated: false, confidence: 0, reason: `AI Error: ${error.message}` };
    } finally {
        ollamaSemaphore.release();
    }
}
