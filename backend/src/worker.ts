// src/worker.ts (مع إصلاح مسار الاستيراد النهائي)

import 'dotenv/config';
import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { redisConnection } from './worker/queues/connection';

// استيراد أسماء الطوابير
import { SCAN_QUEUE_NAME } from './worker/queues/scan';
import { WORDPRESS_QUEUE_NAME } from './worker/queues/wordpress';
import { LARAVEL_QUEUE_NAME } from './worker/queues/laravel';
import { DRUPAL_QUEUE_NAME } from './worker/queues/drupal';
import { NGINX_QUEUE_NAME } from './worker/queues/nginx';
import { APACHE_QUEUE_NAME } from './worker/queues/apache';
import { SQLI_QUEUE_NAME } from './worker/queues/sqli';
import { XSS_QUEUE_NAME } from './worker/queues/xss';

// استيراد معالجات المهام
import { processScanJob } from './worker/jobs/scan.processor';
import { processWordPressJob } from './worker/jobs/wordpress';
import { processLaravelJob } from './worker/jobs/laravel';
import { processDrupalJob } from './worker/jobs/drupal';
import { processNginxJob } from './worker/jobs/nginx';
import { processApacheJob } from './worker/jobs/apache';
import { processSqliJob } from './worker/jobs/sqli'; 
import { processXssJob } from './worker/jobs/xss';

console.log('🚀 DragonSploit Workers Service has started...');

const prisma = new PrismaClient();

type AppPrismaClient = PrismaClient;
type ProcessorFunction = (job: Job, prisma: AppPrismaClient) => Promise<void>;

const workers: { name: string; processor: ProcessorFunction; concurrency: number }[] = [
    { name: SCAN_QUEUE_NAME, processor: processScanJob as ProcessorFunction, concurrency: 5 },
    { name: WORDPRESS_QUEUE_NAME, processor: processWordPressJob as ProcessorFunction, concurrency: 3 },
    { name: LARAVEL_QUEUE_NAME, processor: processLaravelJob as ProcessorFunction, concurrency: 3 },
    { name: DRUPAL_QUEUE_NAME, processor: processDrupalJob as ProcessorFunction, concurrency: 3 },
    { name: NGINX_QUEUE_NAME, processor: processNginxJob as ProcessorFunction, concurrency: 2 },
    { name: APACHE_QUEUE_NAME, processor: processApacheJob as ProcessorFunction, concurrency: 2 },
    { name: SQLI_QUEUE_NAME, processor: processSqliJob as ProcessorFunction, concurrency: 4 },
    { name: XSS_QUEUE_NAME, processor: processXssJob as ProcessorFunction, concurrency: 4 },
];

const activeWorkers: Worker[] = [];

workers.forEach(workerInfo => {
    const workerProcessorWrapper = async (job: Job) => {
        return workerInfo.processor(job, prisma);
    };

    const worker = new Worker(workerInfo.name, workerProcessorWrapper, {
        connection: redisConnection,
        concurrency: workerInfo.concurrency,
    });

    worker.on('completed', (job) => {
        console.log(`✅ [${workerInfo.name}] Job ${job.id} has completed.`);
    });

    worker.on('failed', (job, err) => {
        console.error(`❌ [${workerInfo.name}] Job ${job?.id} has failed with error: ${err.message}`);
    });

    activeWorkers.push(worker);
    console.log(`   - Worker for queue "${workerInfo.name}" is now listening.`);
});

console.log(`✅ All ${activeWorkers.length} workers are running.`);

const gracefulShutdown = async () => {
    console.log('...Initiating graceful shutdown for all workers...');
    await Promise.all(activeWorkers.map(worker => worker.close()));
    await prisma.$disconnect();
    await redisConnection.quit();
    console.log('All workers and connections closed. Exiting.');
    process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
