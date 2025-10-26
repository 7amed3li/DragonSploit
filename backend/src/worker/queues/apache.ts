// src/worker/queues/apache.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';
export const APACHE_QUEUE_NAME = 'apache-scans';
export const apacheQueue = new Queue(APACHE_QUEUE_NAME, { connection: redisConnection });
