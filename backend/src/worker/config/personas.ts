// src/worker/config/personas.ts

export interface AttackerPersona {
    name: 'SCOUT' | 'WARRIOR' | 'ELDER';
    description: string;
    maxAttempts: number;
    maxSuccessFindings: number;
    allowEnumeration: boolean;
    structuralAnalysis: boolean; // For "The Elder" schema inference
    timeoutMs: number;
    aiTemperature: number; // Low for Scout, High for Elder (Creativity)
    systemPromptModifier: string;
}

export const SCOUT_PERSONA: AttackerPersona = {
    name: 'SCOUT',
    description: 'The Scout Dragon - Reflex & Speed. Uses only top statistical payloads. No deep thinking.',
    maxAttempts: 3,
    maxSuccessFindings: 1, // Stop AT ONCE
    allowEnumeration: false,
    structuralAnalysis: false,
    timeoutMs: 300000, // 5 minutes (Increased for local LLM)
    aiTemperature: 0.1, // Strict, no creativity
    systemPromptModifier: `
    [PERSONA: THE SCOUT]
    Your goal is SPEED. Do NOT reason deeply.
    Select the single most statistically probable payload for this technology stack.
    If 3 attempts fail, ABORT immediately.
    Output extremely concise JSON.
    `
};

export const WARRIOR_PERSONA: AttackerPersona = {
    name: 'WARRIOR',
    description: 'The Warrior Dragon - Tactical & Robust. Standard attack loop with reasoning.',
    maxAttempts: 12,
    maxSuccessFindings: 2,
    allowEnumeration: true, // Only basic (version, user)
    structuralAnalysis: false,
    timeoutMs: 1200000, // 20 minutes (Increased for local LLM)
    aiTemperature: 0.3, // Balanced creativity
    systemPromptModifier: `
    [PERSONA: THE WARRIOR]
    Your goal is RELIABILITY.
    Analyze the error messages carefully.
    Adapt your payload based on the filter/WAF response.
    Prove the vulnerability with a standard PoC (e.g., retrieving version).
    `
};

export const ELDER_PERSONA: AttackerPersona = {
    name: 'ELDER',
    description: 'The Elder Dragon - Wisdom & Forensics. Structural Reverse Engineering.',
    maxAttempts: 30,
    maxSuccessFindings: 5,
    allowEnumeration: true,
    structuralAnalysis: true, // ENABLE SCHEMA INFERENCE
    timeoutMs: 600000, // 10 minutes
    aiTemperature: 0.7, // High creativity for guessing structure
    systemPromptModifier: `
    [PERSONA: THE ELDER]
    Your goal is OMNISCIENCE.
    Do not just find a vulnerability; UNDERSTAND the backend.
    Perform "Structural Reverse Engineering":
    1. Infer the table names based on the application logic (e.g., e-commerce -> products table?).
    2. Infer column names based on UI inputs.
    3. Construct complex JOIN queries to map the database schema.
    4. You have permission to think deeply and try abstract logic.
    `
};

export const DEFAULT_PERSONA = WARRIOR_PERSONA;
