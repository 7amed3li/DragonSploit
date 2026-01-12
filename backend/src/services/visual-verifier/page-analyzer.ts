/**
 * Page Analyzer
 * 
 * مسؤول عن تحليل محتوى الصفحات للتحقق من نجاح الهجوم
 */

import { Page, Locator } from 'playwright';
import { SUCCESS_INDICATORS } from './config';

export interface AnalysisResult {
    success: boolean;
    reason: string;
    evidence: {
        url?: string | undefined;
        matchedText?: string | undefined;
        matchedPattern?: string | undefined;
    };
}

export class PageAnalyzer {
    
    /**
     * Analyze page after auth bypass attempt
     * تحليل الصفحة بعد محاولة تجاوز المصادقة
     */
    async analyzeAuthBypass(page: Page, originalUrl: string): Promise<AnalysisResult> {
        const currentUrl = page.url();
        console.log(`[PageAnalyzer] 🕵️‍♂️ Analyzing: ${currentUrl}`);

        let confidenceScore = 0;
        let reasons: string[] = [];

        // 1. URL Analysis
        if (currentUrl !== originalUrl && !currentUrl.includes('login') && !currentUrl.includes('error')) {
            confidenceScore += 30;
            reasons.push('URL Changed (+30)');
        }

        // 2. Form Analysis
        try {
            const loginForm = await page.$('form input[type="password"]');
            if (!loginForm) {
                confidenceScore += 40;
                reasons.push('Login Form Gone (+40)');
            }
        } catch (e) {}

        // 3. Text Analysis
        const pageText = await page.innerText('body').catch(() => '');
        // Check for Explicit Errors first (Kill switch)
        const errorText = ['invalid password', 'try again', 'access denied', 'wrong credentials'];
        if (errorText.some(w => pageText.toLowerCase().includes(w))) {
             confidenceScore -= 100;
             reasons.push('Explicit Error (-100)');
        } else {
            // Check for Success Keywords
            const strongSuccess = ['welcome', 'dashboard', 'my account', 'logout', 'sign out', 'profile'];
            if (strongSuccess.some(w => pageText.toLowerCase().includes(w))) {
                confidenceScore += 40;
                reasons.push('Success Keywords (+40)');
            }
        }

        // 4. Cookie Analysis
        try {
            const cookies = await page.context().cookies();
            const sessionCookies = cookies.filter(c => 
                c.name.toLowerCase().includes('sess') || 
                c.name.toLowerCase().includes('token') || 
                c.name.toLowerCase().includes('id')
            );
            if (sessionCookies.length > 0) {
                confidenceScore += 10;
                reasons.push(`Cookies Found (+10)`);
            }
        } catch (e) {}

        console.log(`[PageAnalyzer] 🧠 Judge 1.5 Score: ${confidenceScore}/100`);

        // DECISION: FAST TRACK
        if (confidenceScore >= 80) {
             return { success: true, reason: `Judge 1.5 High Confidence: ${reasons.join(', ')}`, evidence: { url: currentUrl } };
        }
        if (confidenceScore < 40) { // < 40 is Fail. 40-79 is Ambiguous.
             return { success: false, reason: `Judge 1.5 Low Confidence (${confidenceScore})`, evidence: { url: currentUrl } };
        }

        // AMBIGUOUS -> AI
        console.log(`[PageAnalyzer] ⚖️ Ambiguous (${confidenceScore}). Escalating to AI...`);
        try {
            const { AIProvider } = await import('../ai-provider');
            const verdict = await AIProvider.analyzePageContent(pageText.substring(0, 3000));
            return {
                success: verdict.authenticated,
                reason: verdict.reason,
                evidence: { url: currentUrl }
            };
        } catch (e: any) {
            console.error(`[PageAnalyzer] AI Failed: ${e.message}`);
             // Fallback: If score > 60, Success. Else Fail.
            return {
                success: confidenceScore > 60,
                reason: `AI Failed. Heuristic Score: ${confidenceScore}`,
                evidence: { url: currentUrl }
            };
        }
    }
    
    /**
     * Analyze page for SQL data leak
     * تحليل الصفحة للبحث عن تسريب بيانات SQL
     */
    async analyzeDataLeak(page: Page): Promise<AnalysisResult> {
        const pageText = await page.innerText('body').catch(() => '');
        const indicators = SUCCESS_INDICATORS.dataLeak;
        
        // فحص معلومات SQL
        for (const pattern of indicators.sqlInfoPatterns) {
            if (pattern.test(pageText)) {
                const match = pageText.match(pattern);
                return {
                    success: true,
                    reason: 'SQL information leaked in response',
                    evidence: {
                        matchedPattern: pattern.toString(),
                        matchedText: match ? match[0] : undefined,
                    },
                };
            }
        }
        
        // فحص بيانات حساسة
        for (const pattern of indicators.dataPatterns) {
            if (pattern.test(pageText)) {
                return {
                    success: true,
                    reason: 'Sensitive data found in response',
                    evidence: {
                        matchedPattern: pattern.toString(),
                    },
                };
            }
        }
        
        return {
            success: false,
            reason: 'No data leak detected',
            evidence: {},
        };
    }
    
    /**
     * Analyze page for SQL error messages
     * تحليل الصفحة للبحث عن رسائل خطأ SQL
     */
    async analyzeErrorBased(page: Page): Promise<AnalysisResult> {
        const pageText = await page.innerText('body').catch(() => '');
        const pageSource = await page.content();
        const combined = pageText + pageSource;
        
        const indicators = SUCCESS_INDICATORS.errorBased;
        
        for (const pattern of indicators.errorPatterns) {
            if (pattern.test(combined)) {
                const match = combined.match(pattern);
                return {
                    success: true,
                    reason: 'SQL error message found',
                    evidence: {
                        matchedPattern: pattern.toString(),
                        matchedText: match ? match[0] : undefined,
                    },
                };
            }
        }
        
        return {
            success: false,
            reason: 'No SQL error detected',
            evidence: {},
        };
    }
    
    /**
     * Wait for page to stabilize
     * انتظار استقرار الصفحة
     */
    async waitForStability(page: Page, timeoutMs: number = 2000): Promise<void> {
        try {
            await page.waitForLoadState('networkidle', { timeout: timeoutMs });
        } catch {
            // تجاهل timeout، الصفحة قد تكون جاهزة
        }
    }
    
    /**
     * Find form fields on page
     * البحث عن حقول النموذج في الصفحة
     */
    async findFormFields(page: Page): Promise<{
        usernameField: Locator | null;
        passwordField: Locator | null;
        submitButton: Locator | null;
    }> {
        // البحث عن حقل اسم المستخدم
        const usernameSelectors = [
            'input[name="username"]',
            'input[name="email"]',
            'input[name="user"]',
            'input[name="login"]',
            'input[type="email"]',
            'input[id*="user"]',
            'input[id*="email"]',
            'input[placeholder*="email"]',
            'input[placeholder*="user"]',
        ];
        
        let usernameField: Locator | null = null;
        for (const selector of usernameSelectors) {
            const field = page.locator(selector).first();
            if (await field.count() > 0) {
                usernameField = field;
                break;
            }
        }
        
        // البحث عن حقل كلمة المرور
        const passwordField = page.locator('input[type="password"]').first();
        
        // البحث عن زر الإرسال
        const submitSelectors = [
            'button[type="submit"]',
            'input[type="submit"]',
            'button:has-text("Login")',
            'button:has-text("Sign in")',
            'button:has-text("Log in")',
            'button:has-text("تسجيل")',
        ];
        
        let submitButton: Locator | null = null;
        for (const selector of submitSelectors) {
            const btn = page.locator(selector).first();
            if (await btn.count() > 0) {
                submitButton = btn;
                break;
            }
        }
        
        return {
            usernameField,
            passwordField: await passwordField.count() > 0 ? passwordField : null,
            submitButton,
        };
    }
}

export const pageAnalyzer = new PageAnalyzer();
