// src/worker/queues/sqli.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';
export const SQLI_QUEUE_NAME = 'sqli-scans';
export const sqliQueue = new Queue(SQLI_QUEUE_NAME, { connection: redisConnection });
