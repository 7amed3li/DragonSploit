/**
 * Browser Manager
 * 
 * مسؤول عن إدارة المتصفح: فتح/إغلاق/التحكم
 */

import { chromium, Browser, BrowserContext, Page, LaunchOptions } from 'playwright';
import { VisualVerifierConfig, DEFAULT_CONFIG, shouldRecordVideo, Severity } from './config';
import * as path from 'path';
import * as fs from 'fs';

export class BrowserManager {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private config: VisualVerifierConfig;
    
    constructor(config: Partial<VisualVerifierConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    
    /**
     * Launch browser
     */
    async launch(): Promise<void> {
        if (this.browser) {
            console.log('[BrowserManager] Browser already running');
            return;
        }
        
        const launchOptions: LaunchOptions = {
            headless: this.config.headless,
            args: this.config.stealthMode ? [
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
            ] : [],
        };
        
        console.log(`[BrowserManager] 🚀 Launching ${this.config.browser}...`);
        this.browser = await chromium.launch(launchOptions);
        console.log('[BrowserManager] ✅ Browser launched');
    }
    
    /**
     * Create new context with optional video recording
     */
    async createContext(options: {
        scanId: string;
        severity: Severity;
    }): Promise<BrowserContext> {
        if (!this.browser) {
            await this.launch();
        }
        
        const contextOptions: any = {
            viewport: this.config.viewport,
            ignoreHTTPSErrors: this.config.ignoreHTTPSErrors,
            userAgent: this.getStealthUserAgent(),
        };
        
        // Video للثغرات العالية فقط
        if (shouldRecordVideo(options.severity, this.config)) {
            const videoDir = path.join(this.config.proofsDir, 'scans', options.scanId, 'videos');
            fs.mkdirSync(videoDir, { recursive: true });
            
            contextOptions.recordVideo = {
                dir: videoDir,
                size: this.config.viewport,
            };
            console.log(`[BrowserManager] 🎬 Video recording enabled for ${options.severity} severity`);
        }
        
        this.context = await this.browser!.newContext(contextOptions);
        return this.context;
    }
    
    /**
     * Create new page
     */
    async newPage(): Promise<Page> {
        if (!this.context) {
            throw new Error('No browser context. Call createContext first.');
        }
        
        const page = await this.context.newPage();
        
        // Set timeouts
        page.setDefaultNavigationTimeout(this.config.navigationTimeout);
        page.setDefaultTimeout(this.config.actionTimeout);
        
        return page;
    }
    
    /**
     * Navigate to URL
     */
    async navigate(page: Page, url: string): Promise<void> {
        console.log(`[BrowserManager] 🌐 Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        console.log(`[BrowserManager] ✅ Page loaded: ${page.url()}`);
    }
    
    /**
     * Close context and save video
     */
    async closeContext(): Promise<string | null> {
        if (!this.context) return null;
        
        // Get video path before closing
        const pages = this.context.pages();
        let videoPath: string | null = null;
        
        if (pages && pages.length > 0 && pages[0]) {
            const video = pages[0].video();
            if (video) {
                try {
                    videoPath = await video.path();
                } catch {
                    // Video might not be saved yet
                }
            }
        }
        
        await this.context.close();
        this.context = null;
        
        return videoPath;
    }
    
    /**
     * Close browser
     */
    async close(): Promise<void> {
        if (this.context) {
            await this.closeContext();
        }
        
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            console.log('[BrowserManager] 🔒 Browser closed');
        }
    }
    
    /**
     * Get stealth user agent
     */
    private getStealthUserAgent(): string {
        // يبدو كمتصفح عادي وليس bot
        return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    }
    
    /**
     * Check if browser is running
     */
    isRunning(): boolean {
        return this.browser !== null;
    }
}

export const browserManager = new BrowserManager();
