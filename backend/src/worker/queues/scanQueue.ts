// src/worker/queues/scanQueue.ts
import { Queue } from 'bullmq';

// إعدادات الاتصال بـ Redis
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

// قم بإنشاء وتصدير كائن الـ Queue مرة واحدة فقط
export const scanQueue = new Queue('scan-queue', { connection: redisConnection });
