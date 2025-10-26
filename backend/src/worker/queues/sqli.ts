// src/worker/queues/sqli.ts
import { Queue } from 'bullmq';
// أفترض أن لديك ملف connection.ts يقوم بتصدير redisConnection
import { redisConnection } from './connection'; 

export const SQLI_QUEUE_NAME = 'sqli-scans';

// قم بإنشاء وتصدير كائن الـ Queue مرة واحدة فقط
export const sqliQueue = new Queue(SQLI_QUEUE_NAME, { connection: redisConnection });
