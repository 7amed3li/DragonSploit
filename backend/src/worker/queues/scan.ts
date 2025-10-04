// src/worker/queues/scan.ts

import { Queue } from 'bullmq';
import { redisConnection } from './connection';

// 1. قم بتعريف الاسم في متغير ثابت
export const SCAN_QUEUE_NAME = 'scanQueue';

// 2. استخدم هذا المتغير عند إنشاء الطابور
export const scanQueue = new Queue(SCAN_QUEUE_NAME, {
  connection: redisConnection,
});
