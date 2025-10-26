// src/worker/queues/wordpress.ts

import { Queue } from 'bullmq';
import { redisConnection } from './connection';


// 1. قم بتعريف الاسم في متغير ثابت
export const WORDPRESS_QUEUE_NAME = 'wordpress-scans';

// 2. استخدم هذا المتغير عند إنشاء الطابور
export const wordpressQueue = new Queue(WORDPRESS_QUEUE_NAME, {
  connection: redisConnection,
});

