/**
 * Proof Collector
 * 
 * مسؤول عن جمع الإثباتات البصرية (Screenshots, Videos, HTML)
 */

import { Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { VisualVerifierConfig, DEFAULT_CONFIG } from './config';

export interface ProofBundle {
    screenshotBefore: string | null;
    screenshotAfter: string | null;
    screenshotProof: string | null;
    videoPath: string | null;
    htmlSnapshot: string | null;
    timestamp: Date;
}

export class ProofCollector {
    private config: VisualVerifierConfig;
    private proofDir: string = '';
    
    constructor(config: Partial<VisualVerifierConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    
    /**
     * Initialize proof directory for a scan
     * إنشاء مجلد الإثباتات للفحص
     */
    initializeProofDir(scanId: string, vulnerabilityId: string): string {
        this.proofDir = path.join(
            this.config.proofsDir,
            'scans',
            scanId,
            vulnerabilityId
        );
        
        fs.mkdirSync(this.proofDir, { recursive: true });
        console.log(`[ProofCollector] 📁 Proof directory: ${this.proofDir}`);
        
        return this.proofDir;
    }
    
    /**
     * Take screenshot before injection
     * التقاط صورة قبل الحقن
     */
    async captureBeforeState(page: Page): Promise<string> {
        const filePath = path.join(this.proofDir, 'before.png');
        
        await page.screenshot({
            path: filePath,
            fullPage: false,
        });
        
        console.log('[ProofCollector] 📸 Captured BEFORE screenshot');
        return filePath;
    }
    
    /**
     * Take screenshot after injection
     * التقاط صورة بعد الحقن
     */
    async captureAfterState(page: Page): Promise<string> {
        const filePath = path.join(this.proofDir, 'after.png');
        
        await page.screenshot({
            path: filePath,
            fullPage: false,
        });
        
        console.log('[ProofCollector] 📸 Captured AFTER screenshot');
        return filePath;
    }
    
    /**
     * Capture final proof screenshot with highlight
     * التقاط صورة الإثبات النهائية
     */
    async captureProof(page: Page, highlightSelector?: string): Promise<string> {
        const filePath = path.join(this.proofDir, 'proof.png');
        
        // Highlight element if selector provided
        if (highlightSelector) {
            await page.evaluate((selector) => {
                const el = document.querySelector(selector);
                if (el) {
                    (el as HTMLElement).style.border = '3px solid red';
                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                }
            }, highlightSelector);
        }
        
        await page.screenshot({
            path: filePath,
            fullPage: true,
        });
        
        console.log('[ProofCollector] 📸 Captured PROOF screenshot');
        return filePath;
    }
    
    /**
     * Save HTML snapshot
     * حفظ نسخة HTML من الصفحة
     */
    async captureHtml(page: Page): Promise<string> {
        const filePath = path.join(this.proofDir, 'page.html');
        const html = await page.content();
        
        fs.writeFileSync(filePath, html, 'utf8');
        
        console.log('[ProofCollector] 📄 Captured HTML snapshot');
        return filePath;
    }
    
    /**
     * Capture annotated screenshot with text
     * التقاط صورة مع تعليق توضيحي
     */
    async captureAnnotated(page: Page, annotation: string): Promise<string> {
        const filePath = path.join(this.proofDir, 'annotated.png');
        
        // Add annotation overlay
        await page.evaluate((text) => {
            const overlay = document.createElement('div');
            overlay.id = 'dragonsploit-annotation';
            overlay.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(220, 38, 38, 0.95);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 14px;
                z-index: 999999;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;
            overlay.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 8px;">🐉 DragonSploit - Vulnerability Confirmed</div>
                <div>${text}</div>
                <div style="margin-top: 8px; font-size: 12px; opacity: 0.8;">
                    ${new Date().toISOString()}
                </div>
            `;
            document.body.appendChild(overlay);
        }, annotation);
        
        await page.screenshot({
            path: filePath,
            fullPage: false,
        });
        
        // Remove overlay
        await page.evaluate(() => {
            const overlay = document.getElementById('dragonsploit-annotation');
            if (overlay) overlay.remove();
        });
        
        console.log('[ProofCollector] 📸 Captured ANNOTATED screenshot');
        return filePath;
    }
    
    /**
     * Collect all proofs as bundle
     * جمع كل الإثباتات في حزمة واحدة
     */
    async collectBundle(
        page: Page,
        videoPath: string | null,
        annotation: string
    ): Promise<ProofBundle> {
        const [screenshotProof, htmlSnapshot] = await Promise.all([
            this.captureAnnotated(page, annotation),
            this.captureHtml(page),
        ]);
        
        return {
            screenshotBefore: path.join(this.proofDir, 'before.png'),
            screenshotAfter: path.join(this.proofDir, 'after.png'),
            screenshotProof,
            videoPath,
            htmlSnapshot,
            timestamp: new Date(),
        };
    }
    
    /**
     * Get proof directory path
     */
    getProofDir(): string {
        return this.proofDir;
    }
    
    /**
     * Check if proofs exist
     */
    proofsExist(): boolean {
        return fs.existsSync(this.proofDir) && 
               fs.readdirSync(this.proofDir).length > 0;
    }
}

export const proofCollector = new ProofCollector();
