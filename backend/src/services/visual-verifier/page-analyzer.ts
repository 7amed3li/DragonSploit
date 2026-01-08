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
        const indicators = SUCCESS_INDICATORS.authBypass;
        
        // 1. فحص تغير الـ URL
        for (const pattern of indicators.urlPatterns) {
            if (pattern.test(currentUrl) && !pattern.test(originalUrl)) {
                return {
                    success: true,
                    reason: 'URL changed to authenticated area',
                    evidence: {
                        url: currentUrl,
                        matchedPattern: pattern.toString(),
                    },
                };
            }
        }
        
        // 2. فحص محتوى الصفحة لمؤشرات النجاح
        const pageContent = await page.content();
        const pageText = await page.innerText('body').catch(() => '');
        
        // فحص وجود كلمات النجاح
        for (const pattern of indicators.textPatterns) {
            if (pattern.test(pageText)) {
                // التأكد من عدم وجود كلمات الفشل
                const hasExclude = indicators.excludePatterns.some(p => p.test(pageText));
                if (!hasExclude) {
                    return {
                        success: true,
                        reason: 'Success text found on page',
                        evidence: {
                            matchedPattern: pattern.toString(),
                            matchedText: pageText.substring(0, 200),
                        },
                    };
                }
            }
        }
        
        // 3. فحص وجود عناصر تدل على تسجيل الدخول
        const logoutButton = await page.$('a:has-text("logout"), button:has-text("logout"), a:has-text("sign out")');
        if (logoutButton) {
            return {
                success: true,
                reason: 'Logout button found - user is authenticated',
                evidence: {
                    matchedText: 'Logout/Sign out button present',
                },
            };
        }
        
        // فشل
        return {
            success: false,
            reason: 'No authentication indicators found',
            evidence: {
                url: currentUrl,
            },
        };
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
