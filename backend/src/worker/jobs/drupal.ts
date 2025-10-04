// src/worker/jobs/drupal.ts
import { Job } from 'bullmq';
export const processDrupalJob = async (job: Job): Promise<void> => {
  console.log(`[Drupal Worker] Starting job ${job.id} for target ${job.data.targetUrl}`);
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log(`[Drupal Worker] Finished job ${job.id}`);
};
