/**
 * Visual Verifier Configuration
 * 
 * إعدادات نظام الإثبات البصري
 */

export interface VisualVerifierConfig {
    // Browser settings
    browser: 'chromium' | 'firefox' | 'webkit';
    headless: boolean;
    
    // Timeouts (milliseconds)
    navigationTimeout: number;
    actionTimeout: number;
    verificationTimeout: number;
    
    // Viewport
    viewport: {
        width: number;
        height: number;
    };
    
    // Recording settings
    recordVideoForHighSeverity: boolean;  // Video للثغرات العالية فقط
    alwaysScreenshot: boolean;            // Screenshot لكل الثغرات
    
    // Paths
    proofsDir: string;
    
    // Security
    ignoreHTTPSErrors: boolean;
    
    // Stealth mode
    stealthMode: boolean;
}

export const DEFAULT_CONFIG: VisualVerifierConfig = {
    // المتصفح يظهر أمام المستخدم
    browser: 'chromium',
    headless: false,
    
    // Timeouts
    navigationTimeout: 30000, // 30 ثانية
    actionTimeout: 10000,     // 10 ثوانٍ
    verificationTimeout: 5000, // 5 ثوانٍ للتحقق
    
    // Viewport
    viewport: {
        width: 1280,
        height: 720,
    },
    
    // حسب طلب المستخدم: Video للعالية فقط، Screenshot للكل
    recordVideoForHighSeverity: true,
    alwaysScreenshot: true,
    
    // مسار الإثباتات
    proofsDir: './proofs',
    
    // لفحص مواقع بشهادات غير صالحة
    ignoreHTTPSErrors: true,
    
    // تفعيل وضع التخفي
    stealthMode: true,
};

/**
 * Success indicators - مؤشرات النجاح
 */
export const SUCCESS_INDICATORS = {
    // للـ Auth Bypass
    authBypass: {
        urlPatterns: [
            /dashboard/i,
            /admin/i,
            /home/i,
            /profile/i,
            /account/i,
            /main/i,
        ],
        textPatterns: [
            /welcome/i,
            /dashboard/i,
            /logged in/i,
            /my account/i,
            /logout/i,
            /sign out/i,
        ],
        excludePatterns: [
            /invalid/i,
            /error/i,
            /failed/i,
            /incorrect/i,
            /denied/i,
        ],
    },
    
    // للـ Data Leak
    dataLeak: {
        sqlInfoPatterns: [
            /sqlite_version/i,
            /mysql/i,
            /postgresql/i,
            /sql server/i,
            /version\(\)/i,
        ],
        dataPatterns: [
            /null/i,
            /admin@/i,
            /password/i,
            /user_/i,
        ],
    },
    
    // للـ Error-Based SQLi
    errorBased: {
        errorPatterns: [
            /sqlite_error/i,
            /sql syntax/i,
            /mysql error/i,
            /pg_query/i,
            /ora-\d+/i,
            /sqlstate/i,
            /unclosed quotation/i,
            /near ".*"/i,
        ],
    },
};

/**
 * Severity levels
 */
export enum Severity {
    INFO = 'INFO',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

/**
 * Should record video based on severity
 */
export function shouldRecordVideo(severity: Severity, config: VisualVerifierConfig): boolean {
    if (!config.recordVideoForHighSeverity) return false;
    return severity === Severity.HIGH || severity === Severity.CRITICAL;
}
