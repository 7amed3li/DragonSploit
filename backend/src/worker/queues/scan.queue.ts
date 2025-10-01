import { Queue } from 'bullmq';
import { redisConnection } from './connection';

// اسم قائمة الانتظار يجب أن يكون فريداً ومعبراً
export const SCAN_QUEUE_NAME = 'scan-processing';

// نقوم بإنشاء وتصدير نسخة من قائمة الانتظار
// سنستخدمها في الـ API Server لإضافة المهام، وفي الـ Worker لمعالجتها
export const scanQueue = new Queue(SCAN_QUEUE_NAME, {
  connection: redisConnection,
});
