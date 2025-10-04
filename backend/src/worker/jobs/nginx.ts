// src/worker/jobs/nginx.ts
import { Job } from 'bullmq';
export const processNginxJob = async (job: Job): Promise<void> => {
  console.log(`[Nginx Worker] Starting job ${job.id} for target ${job.data.targetUrl}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(`[Nginx Worker] Finished job ${job.id}`);
};
