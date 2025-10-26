// src/worker/queues/nginx.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';
export const NGINX_QUEUE_NAME = 'nginx-scans';
export const nginxQueue = new Queue(NGINX_QUEUE_NAME, { connection: redisConnection });
