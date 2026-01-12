// src/worker/queues/sqli-param.ts
import { Queue } from 'bullmq';
import { redisConnection } from './connection';

export const SQLI_PARAM_QUEUE_NAME = 'sqli-param-scans';

export const sqliParamQueue = new Queue(SQLI_PARAM_QUEUE_NAME, { connection: redisConnection });
