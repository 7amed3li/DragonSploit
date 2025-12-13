// backend/src/worker/jobs/sqli.ts (Dispatcher Logic)
import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { sqliParamQueue } from '../queues/sqli-param';

const COMMON_FALLBACK_PARAMS = ['id', 'q', 'search', 'query', 'page', 'category', 'item', 'view'];

/**
 * Parent Dispatcher: Schedules parameter-level jobs
 */
export const processSqliJob = async (job: Job, prisma: PrismaClient): Promise<void> => {
    const { targetUrl, scanId } = job.data;
    console.log(`[SQLi Dispatcher] Starting scan fan-out for job ${job.id}`);
    console.log(`[SQLi Dispatcher] Target: ${targetUrl}`);

    try {
        const jobs = COMMON_FALLBACK_PARAMS.map(param => ({
            name: `scan-param-${param}`,
            data: {
                targetUrl,
                scanId,
                param
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
