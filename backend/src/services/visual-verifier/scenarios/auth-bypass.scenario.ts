/**
 * Auth Bypass Scenario
 * 
 * سيناريو التحقق من تجاوز المصادقة عبر SQL Injection
 */

import { Page } from 'playwright';
import { PageAnalyzer, AnalysisResult } from '../page-analyzer';
import { ProofCollector, ProofBundle } from '../proof-collector';

export interface AuthBypassInput {
    loginUrl: string;
    payload: string;
    passwordValue?: string;
}

export interface AuthBypassResult {
    success: boolean;
    analysis: AnalysisResult;
    proofs: ProofBundle | null;
    executionTime: number;
}

export class AuthBypassScenario {
    private pageAnalyzer: PageAnalyzer;
    private proofCollector: ProofCollector;
    
    constructor(proofCollector: ProofCollector) {
        this.pageAnalyzer = new PageAnalyzer();
        this.proofCollector = proofCollector;
    }
    
    /**
     * Execute auth bypass verification
     * تنفيذ التحقق من تجاوز المصادقة
     */
    async execute(page: Page, input: AuthBypassInput): Promise<AuthBypassResult> {
        const startTime = Date.now();
        const originalUrl = input.loginUrl;
        
        console.log(`\n[AuthBypass] 🎯 Starting verification...`);
        console.log(`[AuthBypass] 🌐 Target: ${input.loginUrl}`);
        console.log(`[AuthBypass] 💉 Payload: ${input.payload}`);
        
        try {
            // 1. Navigate to login page
            console.log('[AuthBypass] Step 1: Navigating to login page...');
            await page.goto(input.loginUrl, { waitUntil: 'domcontentloaded' });
            await this.pageAnalyzer.waitForStability(page);
            
            // 2. Capture BEFORE state
            console.log('[AuthBypass] Step 2: Capturing BEFORE state...');
            await this.proofCollector.captureBeforeState(page);
            
            // 3. Find form fields
            console.log('[AuthBypass] Step 3: Finding form fields...');
            const fields = await this.pageAnalyzer.findFormFields(page);
            
            if (!fields.usernameField) {
                console.log('[AuthBypass] ❌ No username field found');
                return {
                    success: false,
                    analysis: {
                        success: false,
                        reason: 'Could not find username input field',
                        evidence: { url: page.url() },
                    },
                    proofs: null,
                    executionTime: Date.now() - startTime,
                };
            }
            
            // 4. Fill the form with payload
            console.log('[AuthBypass] Step 4: Injecting payload...');
            await fields.usernameField.fill(input.payload);
            
            if (fields.passwordField) {
                await fields.passwordField.fill(input.passwordValue || 'anything');
            }
            
            // 5. Submit the form
            console.log('[AuthBypass] Step 5: Submitting form...');
            if (fields.submitButton) {
                await fields.submitButton.click();
            } else {
                // Try pressing Enter
                await fields.usernameField.press('Enter');
            }
            
            // 6. Wait for navigation/response
            console.log('[AuthBypass] Step 6: Waiting for response...');
            await page.waitForTimeout(2000); // Wait for page to load
            await this.pageAnalyzer.waitForStability(page);
            
            // 7. Capture AFTER state
            console.log('[AuthBypass] Step 7: Capturing AFTER state...');
            await this.proofCollector.captureAfterState(page);
            
            // 8. Analyze result
            console.log('[AuthBypass] Step 8: Analyzing result...');
            const analysis = await this.pageAnalyzer.analyzeAuthBypass(page, originalUrl);
            
            // 9. Collect proofs if successful
            let proofs: ProofBundle | null = null;
            if (analysis.success) {
                console.log('[AuthBypass] ✅✅✅ VULNERABILITY CONFIRMED! ✅✅✅');
                console.log(`[AuthBypass] Reason: ${analysis.reason}`);
                
                proofs = await this.proofCollector.collectBundle(
                    page,
                    null, // Video path will be set by context close
                    `Auth Bypass via SQL Injection\n\nPayload: ${input.payload}\n\nResult: ${analysis.reason}`
                );
            } else {
                console.log('[AuthBypass] ❌ Attack did not succeed');
                console.log(`[AuthBypass] Reason: ${analysis.reason}`);
            }
            
            return {
                success: analysis.success,
                analysis,
                proofs,
                executionTime: Date.now() - startTime,
            };
            
        } catch (error: any) {
            console.log(`[AuthBypass] ⚠️ Error during verification: ${error.message}`);
            
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
