 // src/worker/jobs/sqli.ts
 import { Job } from 'bullmq';
 import axios from 'axios';
 import { PrismaClient } from '@prisma/client';
 import { generateSqlPayloadsWithGemini } from '../../services/ai';

 const prisma = new PrismaClient();

 const sqlErrorSignatures: string[] = [
   'you have an error in your sql syntax', 'unclosed quotation mark', 'supplied argument is not a valid mysql',
   'mysql_fetch_array()', 'sql syntax', 'syntax error', 'unexpected end of command', 'invalid query',
   'sql error', 'pg_query()', 'ora-00921',
 ];

 export const processSqliJob = async (job: Job): Promise<void> => {
   const { targetUrl, scanId, organizationId, technologyFingerprint } = job.data;
   console.log(`[SQLi Worker] Starting GEMINI-POWERED scan job ${job.id} for target: ${targetUrl}`);

   const technologyContext = JSON.stringify(technologyFingerprint) || 'Unknown Stack';
   const smartPayloads = await generateSqlPayloadsWithGemini(targetUrl, technologyContext);

   if (smartPayloads.length === 0) {
     console.log(`[SQLi Worker] Could not generate smart payloads for job ${job.id}. Skipping.`);
     return;
   }
   console.log(`[SQLi Worker] Generated Payloads via Gemini: [${smartPayloads.join(", ")}]`);

   const baseUrl = targetUrl.includes('?') ? `${targetUrl}&` : `${targetUrl}?`;
   const testParam = 'id';

   for (const payload of smartPayloads) {
     try {
       const urlToTest = `${baseUrl}${testParam}=${encodeURIComponent(payload)}`;
       const response = await axios.get(urlToTest, { timeout: 10000, headers: { 'User-Agent': 'DragonSploit/2.0' } });
       const responseBody = response.data.toString().toLowerCase();

       for (const signature of sqlErrorSignatures) {
         if (responseBody.includes(signature)) {
           console.log(`[SQLi Worker] VULNERABILITY FOUND! Target: ${targetUrl}, Payload: ${payload}`);
           await prisma.vulnerability.create({
             data: {
               scanId: scanId,
               type: 'SQL_INJECTION_ERROR_BASED_AI_GEMINI',
               severity: 'HIGH',
               description: `A Gemini-AI-generated payload detected an error-based SQL Injection.`,
               proof: `Payload: ${payload}\nURL: ${urlToTest}\nError Signature: "${signature}"`,
             }
           });
           return;
         }
       }
     } catch (error) { /* Ignore errors */ }
   }
   console.log(`[SQLi Worker] Finished GEMINI-POWERED scan for job ${job.id}. No vulnerabilities found.`);
 };
