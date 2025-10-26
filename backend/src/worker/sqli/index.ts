// backend/src/worker/jobs/sqli/index.ts

import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { runSqliScan } from './orchestrator'; // استيراد القائد الأعلى

/**
 * هذه هي نقطة الدخول الوحيدة لجميع مهام SQLi.
 */
export async function processSqliJob(job: Job, prisma: PrismaClient): Promise<void> {
    // تمرير المهمة إلى القائد الأعلى
    await runSqliScan(job, prisma);
}
