/**
 * SQLi Data Leak Scenario
 * 
 * سيناريو التحقق من تسريب البيانات عبر UNION-based SQL Injection
 */

import { Page } from 'playwright';
import { PageAnalyzer, AnalysisResult } from '../page-analyzer';
import { ProofCollector, ProofBundle } from '../proof-collector';

export interface DataLeakInput {
    targetUrl: string;
    paramName: string;
    payload: string;
    method: 'GET' | 'POST';
}

export interface DataLeakResult {
    success: boolean;
    analysis: AnalysisResult;
    proofs: ProofBundle | null;
    executionTime: number;
}

export class DataLeakScenario {
    private pageAnalyzer: PageAnalyzer;
    private proofCollector: ProofCollector;
    
    constructor(proofCollector: ProofCollector) {
        this.pageAnalyzer = new PageAnalyzer();
        this.proofCollector = proofCollector;
    }
    
    /**
     * Execute data leak verification (UNION-based)
     */
    async execute(page: Page, input: DataLeakInput): Promise<DataLeakResult> {
        const startTime = Date.now();
        
        console.log(`\n[DataLeak] 🎯 Starting verification...`);
        console.log(`[DataLeak] 🌐 Target: ${input.targetUrl}`);
        console.log(`[DataLeak] 📝 Param: ${input.paramName}`);
        console.log(`[DataLeak] 💉 Payload: ${input.payload}`);
        
        try {
            // 1. Navigate to target (without payload first for BEFORE state)
            console.log('[DataLeak] Step 1: Loading clean page...');
            await page.goto(input.targetUrl, { waitUntil: 'domcontentloaded' });
            await this.pageAnalyzer.waitForStability(page);
            
            // 2. Capture BEFORE state
            console.log('[DataLeak] Step 2: Capturing BEFORE state...');
            await this.proofCollector.captureBeforeState(page);
            
            // 3. Inject payload
            console.log('[DataLeak] Step 3: Injecting payload...');
            
            if (input.method === 'GET') {
                // Build URL with payload
                const url = new URL(input.targetUrl);
                url.searchParams.set(input.paramName, input.payload);
                await page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
            } else {
                // For POST, find and fill input field
                const inputField = await page.$(`input[name="${input.paramName}"], input[id="${input.paramName}"]`);
                if (inputField) {
                    await inputField.fill(input.payload);
                    // Try to submit
                    const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
                    if (submitBtn) {
                        await submitBtn.click();
                    }
                } else {
                    // fallback: use search box if present
                    const searchBox = await page.$('input[type="search"], input[placeholder*="search"]');
                    if (searchBox) {
                        await searchBox.fill(input.payload);
                        await searchBox.press('Enter');
                    }
                }
            }
            
            // 4. Wait for response
            console.log('[DataLeak] Step 4: Waiting for response...');
            await page.waitForTimeout(2000);
            await this.pageAnalyzer.waitForStability(page);
            
            // 5. Capture AFTER state
            console.log('[DataLeak] Step 5: Capturing AFTER state...');
            await this.proofCollector.captureAfterState(page);
            
            // 6. Analyze for data leak
            console.log('[DataLeak] Step 6: Analyzing response for data leak...');
            const analysis = await this.pageAnalyzer.analyzeDataLeak(page);
            
            // 7. Collect proofs if successful
            let proofs: ProofBundle | null = null;
            if (analysis.success) {
                console.log('[DataLeak] ✅✅✅ DATA LEAK CONFIRMED! ✅✅✅');
                console.log(`[DataLeak] Reason: ${analysis.reason}`);
                
                proofs = await this.proofCollector.collectBundle(
                    page,
                    null,
                    `UNION-based SQLi Data Leak\n\nPayload: ${input.payload}\n\nResult: ${analysis.reason}`
                );
            } else {
                console.log('[DataLeak] ❌ No data leak detected');
            }
            
            return {
                success: analysis.success,
                analysis,
                proofs,
                executionTime: Date.now() - startTime,
            };
            
        } catch (error: any) {
            console.log(`[DataLeak] ⚠️ Error: ${error.message}`);
            
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
