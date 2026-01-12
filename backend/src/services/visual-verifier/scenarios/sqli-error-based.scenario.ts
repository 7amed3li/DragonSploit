/**
 * Error-Based SQLi Scenario
 * 
 * سيناريو التحقق من Error-Based SQL Injection
 */

import { Page } from 'playwright';
import { PageAnalyzer, AnalysisResult } from '../page-analyzer';
import { ProofCollector, ProofBundle } from '../proof-collector';

export interface ErrorBasedInput {
    targetUrl: string;
    paramName: string;
    payload: string;
}

export interface ErrorBasedResult {
    success: boolean;
    analysis: AnalysisResult;
    proofs: ProofBundle | null;
    executionTime: number;
}

export class ErrorBasedScenario {
    private pageAnalyzer: PageAnalyzer;
    private proofCollector: ProofCollector;
    
    constructor(proofCollector: ProofCollector) {
        this.pageAnalyzer = new PageAnalyzer();
        this.proofCollector = proofCollector;
    }
    
    /**
     * Execute error-based SQLi verification
     */
    async execute(page: Page, input: ErrorBasedInput): Promise<ErrorBasedResult> {
        const startTime = Date.now();
        
        console.log(`\n[ErrorBased] 🎯 Starting verification...`);
        console.log(`[ErrorBased] 🌐 Target: ${input.targetUrl}`);
        console.log(`[ErrorBased] 💉 Payload: ${input.payload}`);
        
        try {
            // 1. Navigate with payload
            console.log('[ErrorBased] Step 1: Injecting payload via URL...');
            const url = new URL(input.targetUrl);
            url.searchParams.set(input.paramName, input.payload);
            
            // Capture clean first
            await page.goto(input.targetUrl, { waitUntil: 'domcontentloaded' });
            await this.proofCollector.captureBeforeState(page);
            
            // Now inject
            await page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
            await this.pageAnalyzer.waitForStability(page);
            
            // 2. Capture AFTER state
            console.log('[ErrorBased] Step 2: Capturing result...');
            await this.proofCollector.captureAfterState(page);
            
            // 3. Analyze for SQL errors
            console.log('[ErrorBased] Step 3: Analyzing for SQL errors...');
            const analysis = await this.pageAnalyzer.analyzeErrorBased(page);
            
            // 4. Collect proofs
            let proofs: ProofBundle | null = null;
            if (analysis.success) {
                console.log('[ErrorBased] ✅✅✅ ERROR-BASED SQLi CONFIRMED! ✅✅✅');
                console.log(`[ErrorBased] Error found: ${analysis.evidence.matchedText}`);
                
                proofs = await this.proofCollector.collectBundle(
                    page,
                    null,
                    `Error-Based SQLi\n\nPayload: ${input.payload}\n\nError: ${analysis.evidence.matchedText}`
                );
            } else {
                console.log('[ErrorBased] ❌ No SQL error detected');
            }
            
            return {
                success: analysis.success,
                analysis,
                proofs,
                executionTime: Date.now() - startTime,
            };
            
        } catch (error: any) {
            console.log(`[ErrorBased] ⚠️ Error: ${error.message}`);
            
            return {
                success: false,
                analysis: {
                    success: false,
                    reason: `Verification error: ${error.message}`,
                    evidence: {},
                },
                proofs: null,
                executionTime: Date.now() - startTime,
            };
        }
    }
}
