// هذا الملف هو نقطة الدخول لتشغيل عملية العامل بشكل منفصل
import 'dotenv/config'; // مهم جداً لتحميل متغيرات البيئة
import { Worker } from 'bullmq';
import { redisConnection } from './worker/queues/connection';
import { SCAN_QUEUE_NAME } from './worker/queues/scan.queue';
import processScanJob from './worker/jobs/scan.processor';

console.log('🚀 DragonSploit Worker has started...');

const worker = new Worker(
  SCAN_QUEUE_NAME,
  processScanJob,
  { 
    connection: redisConnection,
    concurrency: 5 // يمكن للعامل معالجة 5 مهام في نفس الوقت
  }
);

worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} has completed successfully.`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} has failed with error: ${err.message}`);
});

const gracefulShutdown = async () => {
  console.log('...Initiating graceful shutdown...');
  await worker.close();
  await redisConnection.quit();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
