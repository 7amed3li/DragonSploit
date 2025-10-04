// src/worker/jobs/sqli.ts
import { Job } from 'bullmq';
export const processSqliJob = async (job: Job): Promise<void> => {
  console.log(`[SQLi Worker] Starting job ${job.id} for target ${job.data.targetUrl}`);
  await new Promise(resolve => setTimeout(resolve, 8000));
  console.log(`[SQLi Worker] Finished job ${job.id}`);
};
