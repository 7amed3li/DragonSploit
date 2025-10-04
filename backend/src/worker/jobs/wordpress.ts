// src/worker/jobs/wordpress.ts
import { Job } from 'bullmq';
import { prisma } from '../../db';

interface WordPressJobData {
  scanId: string;
  targetUrl: string;
}

export const processWordPressJob = async (job: Job<WordPressJobData>): Promise<void> => {
  const { scanId, targetUrl } = job.data;
  console.log(`[WordPress Worker] Starting WordPress scan for ${targetUrl} (Scan ID: ${scanId})`);

  await new Promise(resolve => setTimeout(resolve, 7000));

  console.log(`[WordPress Worker] Finished WordPress scan for ${targetUrl}`);
};
