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

// 🚀 PERFORMANCE OVERRIDE: Using 'Scout' default for speed
export const SCOUT_PERSONA: AttackerPersona = {
    name: 'SCOUT',
    description: 'The Scout Dragon - Reflex & Speed. Uses only top statistical payloads. No deep thinking.',
    maxAttempts: 2, // ⚡ ULTRA FAST
    maxSuccessFindings: 1, 
    allowEnumeration: false,
    structuralAnalysis: false,
    timeoutMs: 60000, // 1 minute
    aiTemperature: 0.1, 
    systemPromptModifier: `
    [PERSONA: THE SCOUT]
    Your goal is SPEED. 
    Select the single most statistically probable payload for this technology stack.
    If 2 attempts fail, ABORT immediately.
    Output extremely concise JSON.
    `
};

export const WARRIOR_PERSONA: AttackerPersona = {
    name: 'WARRIOR',
    description: 'The Warrior Dragon - Tactical & Robust. Standard attack loop with reasoning.',
    maxAttempts: 4, // ⚡ REDUCED FROM 12
    maxSuccessFindings: 1,
    allowEnumeration: true,
    structuralAnalysis: false,
    timeoutMs: 300000, // 5 minutes
    aiTemperature: 0.3, 
    systemPromptModifier: `
    [PERSONA: THE WARRIOR]
    Your goal is EFFICIENT RELIABILITY.
    Do not waste tokens. Identify the vulnerability in < 4 moves.
    Analyze the error messages carefully.
    `
};

export const ELDER_PERSONA: AttackerPersona = {
    name: 'ELDER',
    description: 'The Elder Dragon - Wisdom & Forensics. Structural Reverse Engineering.',
    maxAttempts: 10, // Reduced from 30
    maxSuccessFindings: 3,
    allowEnumeration: true,
    structuralAnalysis: true, 
    timeoutMs: 600000, 
    aiTemperature: 0.7, 
    systemPromptModifier: `
    [PERSONA: THE ELDER]
    Your goal is OMNISCIENCE.
    Infer the database schema.
    `
};

export const DEFAULT_PERSONA = SCOUT_PERSONA; // 👈 SWITCH TO SCOUT BY DEFAULT FOR SPEED
