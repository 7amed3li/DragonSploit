// src/worker/queues/drupal.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';
export const DRUPAL_QUEUE_NAME = 'drupal-scans';
export const drupalQueue = new Queue(DRUPAL_QUEUE_NAME, { connection: redisConnection });
