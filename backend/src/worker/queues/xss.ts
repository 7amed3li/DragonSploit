// src/worker/queues/xss.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';
export const XSS_QUEUE_NAME = 'xss-scans';
export const xssQueue = new Queue(XSS_QUEUE_NAME, { connection: redisConnection });
