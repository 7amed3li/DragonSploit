/**
 * DragonSploit - Unified AI Provider with Intelligent Fallback
 * Manages multiple AI providers (Ollama, Groq, Gemini) with automatic failover
 */

import { getNextSqlPayloadOllama, isOllamaAvailable } from './ai-ollama';
import { getNextSqlPayload as getNextSqlPayloadGemini, startSqliExploitationChat } from './ai';
import { ChatSession } from '@google/generative-ai';

// ============================================================================
// CONFIGURATION
// ============================================================================

const AI_PROVIDER_ORDER = (process.env.AI_PROVIDER_ORDER || 'ollama,gemini').split(',');
const ENABLE_FALLBACK = process.env.ENABLE_AI_FALLBACK !== 'false';

console.log(`\n🤖 ==================================================`);
console.log(`🤖 DragonSploit AI Provider Manager v1.0`);
console.log(`🤖 Provider Priority: ${AI_PROVIDER_ORDER.join(' → ')}`);
console.log(`🤖 Fallback Enabled: ${ENABLE_FALLBACK}`);
console.log(`🤖 ==================================================\n`);

// ============================================================================
// TYPES
// ============================================================================

export interface AIContext {
    vector?: string;
    parameter?: string;
    targetUrl?: string;
    attemptNumber?: number;
    chatSession?: ChatSession; // For Gemini continuity
}

export interface AIResponse {
    payload: string | null;
    reasoning: string;
    finished: boolean;
    provider: 'ollama' | 'groq' | 'gemini' | 'fallback';
}

// ============================================================================
// PROVIDER MANAGER
// ============================================================================

class AIProviderManager {
    private providerStats: Map<string, { calls: number; failures: number; totalTime: number }>;
    private geminiSessions: Map<string, ChatSession>;

    constructor() {
        this.providerStats = new Map();
        this.geminiSessions = new Map();

        // Initialize stats
        ['ollama', 'groq', 'gemini'].forEach(provider => {
            this.providerStats.set(provider, { calls: 0, failures: 0, totalTime: 0 });
        });
    }

    /**
     * Get next SQL injection payload using best available provider
     */
    async getPayload(feedback: string, context: AIContext = {}): Promise<AIResponse> {

        for (const provider of AI_PROVIDER_ORDER) {
            try {
                const startTime = Date.now();
                let result: AIResponse;

                switch (provider) {
                    case 'ollama':
                        if (await isOllamaAvailable()) {
                            const ollamaResult = await getNextSqlPayloadOllama(feedback, context);
                            result = { ...ollamaResult, provider: 'ollama' };
                            this.recordSuccess('ollama', Date.now() - startTime);
                            return result;
                        } else {
                            console.log('[AI Provider] Ollama unavailable, trying next provider...');
                            continue;
                        }

                    case 'gemini':
                        // Get or create chat session for continuity
                        const sessionKey = context.vector || 'default';
                        if (!this.geminiSessions.has(sessionKey)) {
                            this.geminiSessions.set(sessionKey, startSqliExploitationChat());
                        }
                        const chatSession = this.geminiSessions.get(sessionKey)!;

                        const geminiResult = await getNextSqlPayloadGemini(chatSession, feedback);
                        result = { ...geminiResult, provider: 'gemini' };
                        this.recordSuccess('gemini', Date.now() - startTime);
                        return result;

                    case 'groq':
                        // TODO: Implement Groq integration
                        console.log('[AI Provider] Groq not yet implemented, skipping...');
                        continue;

                    default:
                        console.warn(`[AI Provider] Unknown provider: ${provider}`);
                        continue;
                }

            } catch (error: any) {
                const errorMsg = error.message || String(error);
                console.error(`[AI Provider] ${provider} failed: ${errorMsg}`);
                this.recordFailure(provider);

                // If this is the last provider or fallback is disabled, throw
                if (!ENABLE_FALLBACK || provider === AI_PROVIDER_ORDER[AI_PROVIDER_ORDER.length - 1]) {
                    throw error;
                }

                // Otherwise, continue to next provider
                console.log(`[AI Provider] Falling back to next provider...`);
            }
        }

        // If all providers failed, return fallback response
        console.warn('[AI Provider] All providers failed, using deterministic fallback');
        return {
            payload: null,
            reasoning: 'All AI providers unavailable',
            finished: true,
            provider: 'fallback'
        };
    }

    /**
     * Get provider statistics
     */
    getStats() {
        const stats: any = {};
        this.providerStats.forEach((value, key) => {
            stats[key] = {
                ...value,
                successRate: value.calls > 0
                    ? ((value.calls - value.failures) / value.calls * 100).toFixed(1) + '%'
                    : 'N/A',
                avgResponseTime: value.calls > 0
                    ? (value.totalTime / value.calls / 1000).toFixed(2) + 's'
                    : 'N/A'
            };
        });
        return stats;
    }

    /**
     * Clear Gemini chat sessions (to free memory)
     */
    clearGeminiSessions() {
        this.geminiSessions.clear();
        console.log('[AI Provider] Cleared all Gemini chat sessions');
    }

    private recordSuccess(provider: string, timeMs: number) {
        const stats = this.providerStats.get(provider);
        if (stats) {
            stats.calls++;
            stats.totalTime += timeMs;
        }
    }

    private recordFailure(provider: string) {
        const stats = this.providerStats.get(provider);
        if (stats) {
            stats.calls++;
            stats.failures++;
        }
    }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const AIProvider = new AIProviderManager();

/**
 * Convenience function for backward compatibility
 */
export async function getNextSqlPayloadSmart(
    feedback: string,
    context: AIContext = {}
): Promise<AIResponse> {
    return AIProvider.getPayload(feedback, context);
}
