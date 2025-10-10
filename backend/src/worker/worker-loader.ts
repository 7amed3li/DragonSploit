// src/worker/worker-loader.ts

import { Worker } from 'bullmq';
import { processSqliJob } from './jobs/sqli';
import { sqliQueue } from './queues/sqli'; // استيراد الـ Queue المركزي

export function startWorkers() {
  console.log('🚀 Starting DragonSploit Workers Service...');

  // --- عامل فحص SQLi ---
  // استخدم الخصائص من الكائن المستورد لضمان التطابق
  const sqliWorker = new Worker(sqliQueue.name, processSqliJob, { 
    connection: sqliQueue.opts.connection, // استخدم نفس الاتصال من الـ Queue
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  });

  // يمكنك نقل هذه المستمعين إلى مجلد `listeners` لاحقًا
  sqliWorker.on('completed', job => {
    console.log(`[Worker][${sqliQueue.name}] Job ${job.id} has completed successfully.`);
  });

  sqliWorker.on('failed', (job, err) => {
    console.error(`[Worker][${sqliQueue.name}] Job ${job?.id} has failed with error: ${err.message}`);
  });

  console.log(`✅ Worker for queue "${sqliQueue.name}" is now listening.`);
}
