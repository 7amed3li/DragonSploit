// src/worker/queues/laravel.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';
export const LARAVEL_QUEUE_NAME = 'laravel-scans';
export const laravelQueue = new Queue(LARAVEL_QUEUE_NAME, { connection: redisConnection });
