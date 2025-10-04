// src/worker/jobs/apache.ts
import { Job } from 'bullmq';
export const processApacheJob = async (job: Job): Promise<void> => {
  console.log(`[Apache Worker] Starting job ${job.id} for target ${job.data.targetUrl}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(`[Apache Worker] Finished job ${job.id}`);
};
