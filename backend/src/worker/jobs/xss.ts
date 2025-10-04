// src/worker/jobs/xss.ts
import { Job } from 'bullmq';
export const processXssJob = async (job: Job): Promise<void> => {
  console.log(`[XSS Worker] Starting job ${job.id} for target ${job.data.targetUrl}`);
  await new Promise(resolve => setTimeout(resolve, 8000));
  console.log(`[XSS Worker] Finished job ${job.id}`);
};
