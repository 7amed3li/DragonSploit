// src/worker/jobs/laravel.ts
import { Job } from 'bullmq';
export const processLaravelJob = async (job: Job): Promise<void> => {
  console.log(`[Laravel Worker] Starting job ${job.id} for target ${job.data.targetUrl}`);
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log(`[Laravel Worker] Finished job ${job.id}`);
};
