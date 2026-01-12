import { DRAGON_SIGNATURES, TechSignature } from './signatures';

export interface Fingerprint extends TechSignature {
    confidence: number;
    source: string; // 'Active' or 'Passive'
}

export class FingerprintEngine {
    
    /**
     * Analyze headers and cookies for passive detection
     */
    static analyzePassive(headers: any, cookies: string[]): Fingerprint {
        let bestMatch: Fingerprint = { confidence: 0, source: 'Passive' };

        // 1. Analyze Cookies
        // 1. Analyze Cookies
        for (const cookie of cookies) {
            if (!cookie) continue;
            const parts = cookie.split('=');
            if (parts.length === 0 || !parts[0]) continue;
            
            const cookieName = parts[0].trim().toLowerCase();
            const match = DRAGON_SIGNATURES.cookies[cookieName];
            
            // Explicit null check to prevent TS errors
            if (match) {
                const conf = match.confidence || 0;
                if (conf > bestMatch.confidence) {
                    bestMatch = { ...match, confidence: conf, source: 'Passive (Cookie)' };
                }
            }
        }

        // 2. Analyze Headers
        // X-Powered-By
        if (headers['x-powered-by']) {
            const poweredBy = headers['x-powered-by'].toLowerCase();
            for (const [key, signature] of Object.entries(DRAGON_SIGNATURES.headers['x-powered-by'])) {
                if (poweredBy.includes(key) && (signature.confidence || 0) > bestMatch.confidence) {
                    bestMatch = { ...signature, confidence: signature.confidence || 0, source: 'Passive (Header: X-Powered-By)' };
                }
            }
        }

        // Server
        if (headers['server']) {
            const server = headers['server'].toLowerCase();
            for (const [key, signature] of Object.entries(DRAGON_SIGNATURES.headers['server'])) {
                if (server.includes(key) && signature && (signature.confidence || 0) > bestMatch.confidence) {
                    bestMatch = { ...signature, confidence: signature.confidence || 0, source: 'Passive (Header: Server)' };
                }
            }
        }
        
        // Specific Juice Shop check (Legacy heuristic maintained for compatibility)
        if (headers['x-recruiting'] || headers['x-feature-policy']) {
             if (bestMatch.confidence < 100) {
                 bestMatch = {
                     lang: 'Node.js (Express)',
                     db: 'SQLite',
                     server: 'Express',
                     confidence: 100,
                     source: 'Passive (Juice Shop Heuristic)'
                 };
             }
        }

        return bestMatch;
    }

    /**
     * Analyze error messages for active detection
     */
    static analyzeActive(errorBody: string): Fingerprint | null {
        for (const errSig of DRAGON_SIGNATURES.errors) {
            if (errorBody.includes(errSig.sig)) {
                return {
                    db: errSig.db,
                    confidence: errSig.confidence,
                    source: `Active (Error: ${errSig.db})`
                };
            }
        }
        return null;
    }

    /**
     * Merge passive and active fingerprints
     * Active detection (errors) usually overrides passive hints (headers)
     */
    static merge(passive: Fingerprint, active: Fingerprint | null): Fingerprint {
        if (!active) return passive;

        // If active found a database, it overrides the passive DB guess
        // BUT we keep the passive Language/Server info if active didn't provide it
        return {
            lang: active.lang || passive.lang || undefined,
            server: active.server || passive.server || undefined,
            db: active.db, // Active DB is always truth (it's an error message!)
            confidence: active.confidence, // Active confidence is usually 100%
            source: active.source
        };
    }
}
