/**
 * Visual Verifier - Main Entry Point
 * 
 * نقطة الدخول الرئيسية لنظام الإثبات البصري
 * يدير عملية التحقق من الثغرات عبر المتصفح
 */

import { BrowserManager } from './browser-manager';
import { ProofCollector, ProofBundle } from './proof-collector';
import { PageAnalyzer } from './page-analyzer';
import { VisualVerifierConfig, DEFAULT_CONFIG, Severity } from './config';
import { AuthBypassScenario, AuthBypassInput, AuthBypassResult } from './scenarios/auth-bypass.scenario';
import { DataLeakScenario, DataLeakInput, DataLeakResult } from './scenarios/sqli-data-leak.scenario';
import { ErrorBasedScenario, ErrorBasedInput, ErrorBasedResult } from './scenarios/sqli-error-based.scenario';
import { v4 as uuidv4 } from 'uuid';

export interface VerificationContext {
    scanId: string;
    severity: Severity;
    vulnerabilityType: string;
}

export interface VerificationResult {
    verified: boolean;
    proofs: ProofBundle | null;
    videoPath: string | null;
    executionTime: number;
    reason: string;
}

export class VisualVerifier {
    private browserManager: BrowserManager;
    private proofCollector: ProofCollector;
    private config: VisualVerifierConfig;
    
    constructor(config: Partial<VisualVerifierConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.browserManager = new BrowserManager(this.config);
        this.proofCollector = new ProofCollector(this.config);
    }
    
    /**
     * Verify Auth Bypass vulnerability
     * التحقق من ثغرة تجاوز المصادقة
     */
    async verifyAuthBypass(
        input: AuthBypassInput,
        context: VerificationContext
    ): Promise<VerificationResult> {
        console.log('\n' + '='.repeat(60));
        console.log('🐉 DRAGONSPLOIT VISUAL VERIFIER - Auth Bypass');
        console.log('='.repeat(60));
        
        const vulnerabilityId = uuidv4();
        
        try {
            // Initialize
            await this.browserManager.launch();
            const browserContext = await this.browserManager.createContext({
                scanId: context.scanId,
                severity: context.severity,
            });
            
            this.proofCollector.initializeProofDir(context.scanId, vulnerabilityId);
            
            const page = await this.browserManager.newPage();
            
            // Execute scenario
            const scenario = new AuthBypassScenario(this.proofCollector);
            const result = await scenario.execute(page, input);
            
            // Get video path (closes context)
            const videoPath = await this.browserManager.closeContext();
            
            return {
                verified: result.success,
                proofs: result.proofs,
                videoPath,
                executionTime: result.executionTime,
                reason: result.analysis.reason,
            };
            
        } catch (error: any) {
            console.log(`[VisualVerifier] ❌ Error: ${error.message}`);
            return {
                verified: false,
                proofs: null,
                videoPath: null,
                executionTime: 0,
                reason: error.message,
            };
        } finally {
            await this.browserManager.close();
        }
    }
    
    /**
     * Verify Data Leak (UNION-based) vulnerability
     * التحقق من ثغرة تسريب البيانات
     */
    async verifyDataLeak(
        input: DataLeakInput,
        context: VerificationContext
    ): Promise<VerificationResult> {
        console.log('\n' + '='.repeat(60));
        console.log('🐉 DRAGONSPLOIT VISUAL VERIFIER - Data Leak');
        console.log('='.repeat(60));
        
        const vulnerabilityId = uuidv4();
        
        try {
            await this.browserManager.launch();
            const browserContext = await this.browserManager.createContext({
                scanId: context.scanId,
                severity: context.severity,
            });
            
            this.proofCollector.initializeProofDir(context.scanId, vulnerabilityId);
            
            const page = await this.browserManager.newPage();
            
            const scenario = new DataLeakScenario(this.proofCollector);
            const result = await scenario.execute(page, input);
            
            const videoPath = await this.browserManager.closeContext();
            
            return {
                verified: result.success,
                proofs: result.proofs,
                videoPath,
                executionTime: result.executionTime,
                reason: result.analysis.reason,
            };
            
        } catch (error: any) {
            console.log(`[VisualVerifier] ❌ Error: ${error.message}`);
            return {
                verified: false,
                proofs: null,
                videoPath: null,
                executionTime: 0,
                reason: error.message,
            };
        } finally {
            await this.browserManager.close();
        }
    }
    
    /**
     * Verify Error-Based SQLi vulnerability
     * التحقق من ثغرة Error-Based
     */
    async verifyErrorBased(
        input: ErrorBasedInput,
        context: VerificationContext
    ): Promise<VerificationResult> {
        console.log('\n' + '='.repeat(60));
        console.log('🐉 DRAGONSPLOIT VISUAL VERIFIER - Error-Based SQLi');
        console.log('='.repeat(60));
        
        const vulnerabilityId = uuidv4();
        
        try {
            await this.browserManager.launch();
            const browserContext = await this.browserManager.createContext({
                scanId: context.scanId,
                severity: context.severity,
            });
            
            this.proofCollector.initializeProofDir(context.scanId, vulnerabilityId);
            
            const page = await this.browserManager.newPage();
            
            const scenario = new ErrorBasedScenario(this.proofCollector);
            const result = await scenario.execute(page, input);
            
            const videoPath = await this.browserManager.closeContext();
            
            return {
                verified: result.success,
                proofs: result.proofs,
                videoPath,
                executionTime: result.executionTime,
                reason: result.analysis.reason,
            };
            
        } catch (error: any) {
            console.log(`[VisualVerifier] ❌ Error: ${error.message}`);
            return {
                verified: false,
                proofs: null,
                videoPath: null,
                executionTime: 0,
                reason: error.message,
            };
        } finally {
            await this.browserManager.close();
        }
    }
    
    /**
     * Quick check if browser automation is available
     */
    static async isAvailable(): Promise<boolean> {
        try {
            const { chromium } = await import('playwright');
            const browser = await chromium.launch({ headless: true });
            await browser.close();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Close the verifier and cleanup resources
     */
    async close(): Promise<void> {
        await this.browserManager.close();
    }
}

// Export all components
export { BrowserManager } from './browser-manager';
export { PageAnalyzer, AnalysisResult } from './page-analyzer';
export { ProofCollector, ProofBundle } from './proof-collector';
export { VisualVerifierConfig, DEFAULT_CONFIG, Severity, shouldRecordVideo } from './config';
export { AuthBypassScenario } from './scenarios/auth-bypass.scenario';
export { DataLeakScenario } from './scenarios/sqli-data-leak.scenario';
export { ErrorBasedScenario } from './scenarios/sqli-error-based.scenario';

// Default instance
export const visualVerifier = new VisualVerifier();
