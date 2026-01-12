// backend/src/worker/jobs/sqli.ts (Dispatcher Logic)
import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { sqliParamQueue } from '../queues/sqli-param';
import { executeAuthBypassAttack } from '../sqli/vector0-auth-bypass';

const COMMON_FALLBACK_PARAMS = ['id', 'q', 'search', 'query', 'page', 'category', 'item', 'view'];

export const processSqliJob = async (job: Job, prisma: PrismaClient): Promise<void> => {
    const { targetUrl, scanId, persona, requestMethod, requestBody } = job.data;
    console.log(`[SQLi Dispatcher] Starting scan fan-out for job ${job.id}`);
    console.log(`[SQLi Dispatcher] Target: ${targetUrl} [${requestMethod || 'GET'}]`);
    if (persona) console.log(`[SQLi Dispatcher] Using Persona: ${persona.name}`);

    // 🛑 Wave 0 REMOVED: Auth Bypass is now handled by a dedicated queue before this point.
    // If we are here, we either have a token or we are fuzzing unauthenticated.
    
    // 💡 EXCEPT: If this job is EXPLICITLY tagged as 'AUTH_BYPASS' (e.g. Login API)
    if (job.data.intent === 'AUTH_BYPASS') {
        console.log(`[SQLi Dispatcher] 🛡️ Explicit Auth Bypass Job Triggered!`);
        try {
            const authBypassFound = await executeAuthBypassAttack(job, prisma);
            if (authBypassFound) {
                 console.log(`[SQLi Dispatcher] ✅ Auth Bypass CONFIRMED!`);
                 return; // Stop here, no need to fuzz parameters for the login form itself if vectors are exhausted
            }
        } catch (error: any) {
            console.warn(`[SQLi Dispatcher] ⚠️ Auth Bypass failed: ${error.message}`);
        }
    }
    
    if (job.data.authDetails) {
        console.log(`[SQLi Dispatcher] 🔑 Using existing Auth Token: ${job.data.authDetails.token.substring(0, 10)}...`);
    } else {
        console.log(`[SQLi Dispatcher] ℹ️ Running unauthenticated scan.`);
    }

    try {
        let paramsToScan: string[] = [];

        // 1. If POST and has JSON body, extract keys
        if (requestMethod === 'POST' && requestBody) {
            const keys = Object.keys(requestBody);
            if (keys.length > 0) {
                paramsToScan = keys;
                console.log(`[SQLi Dispatcher] Found POST JSON keys: ${paramsToScan.join(', ')}`);
            }
        }

        // 2. If no POST keys, use fallback GET params
        if (paramsToScan.length === 0) {
            paramsToScan = COMMON_FALLBACK_PARAMS;
            console.log(`[SQLi Dispatcher] Using default URL parameters for fuzzing.`);
        }

        const jobs = paramsToScan.map(param => ({
            name: `scan-param-${param}`,
            data: {
                targetUrl,
                scanId,
                param,
                persona,
                requestMethod, // Propagate method
                requestBody,   // Propagate original body
                technologyFingerprint: job.data.technologyFingerprint // 👈 CRITICAL: Propagate Fingerprint
            },
            opts: {
                removeOnComplete: true,
                removeOnFail: false
            }
        }));

        await sqliParamQueue.addBulk(jobs);

        console.log(`[SQLi Dispatcher] Successfully scheduled ${jobs.length} parameter jobs.`);

        await prisma.scan.update({
            where: { id: scanId },
            data: {
                status: 'RUNNING'
            }
        });

    } catch (error: any) {
        console.error(`[SQLi Dispatcher] Failed to schedule jobs: ${error.message}`);
        throw error;
    }
};
