// src/worker/worker-loader.ts (النسخة النهائية المصححة)

import 'dotenv/config';
import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';

// استيراد قائمة الانتظار والمعالج الخاص بالـ SQLi (كمثال)
import { sqliQueue } from './queues/sqli';
import { processSqliJob } from './jobs/sqli';
import { sqliParamQueue } from './queues/sqli-param';
import { processSqliParamJob } from './jobs/sqli-param';

// إنشاء نسخة PrismaClient واحدة لهذه العملية (العامل)
const prisma = new PrismaClient();

// تعريف الأنواع للوظائف
type ProcessorFunction = (job: Job, prisma: PrismaClient) => Promise<void>;

// ==================================================================
// === ✅ التعديل الرئيسي: إنشاء وتصدير دالة startWorkers         ===
// ==================================================================
export function startWorkers() {
    console.log('🚀 Starting Dedicated Workers...');

    // -----------------------------------------------------
    // إنشاء العاملين (استخدم الـ Wrapper لتمرير Prisma)
    // -----------------------------------------------------

    // وظيفة مُغلِّفة (Wrapper) لحل مشكلة توقيع BullMQ
    const sqliProcessorWrapper = async (job: Job) => {
        // نُنفذ المعالج الأصلي، ونُمرر إليه نسخة PrismaClient
        return (processSqliJob as ProcessorFunction)(job, prisma);
    };

    const sqliWorker = new Worker(sqliQueue.name, sqliProcessorWrapper, {
        connection: sqliQueue.opts.connection, // استخدم اتصال قائمة الانتظار
        concurrency: 4,
    });

    sqliWorker.on('completed', (job) => {
        console.log(`✅ [SQLi] Job ${job.id} has completed.`);
    });

    sqliWorker.on('failed', (job, err) => {
        console.error(`❌ [SQLi] Job ${job?.id} has failed with error: ${err.message}`);
    });

    console.log(`👷 Worker for [${sqliQueue.name}] queue is running.`);

    // -----------------------------------------------------
    // SQLi Parameter Worker (Child)
    // -----------------------------------------------------
    const sqliParamProcessorWrapper = async (job: Job) => {
        return (processSqliParamJob as ProcessorFunction)(job, prisma);
    };

    const sqliParamWorker = new Worker(sqliParamQueue.name, sqliParamProcessorWrapper, {
        connection: sqliParamQueue.opts.connection,
        concurrency: 8, // Higher concurrency for granular jobs
        limiter: {
            max: 5, // Limit burst rate to prevent overloading Ollama
            duration: 1000
        }
    });

    sqliParamWorker.on('completed', (job) => {
        console.log(`✅ [SQLi-Param] Job ${job.id} (param: ${job.data.param}) completed.`);
    });

    sqliParamWorker.on('failed', (job, err) => {
        console.error(`❌ [SQLi-Param] Job ${job?.id} failed: ${err.message}`);
    });

    console.log(`👷 Worker for [${sqliParamQueue.name}] queue is running.`);


    // دالة الإغلاق الآمن
    const gracefulShutdown = async () => {
        console.log('...Initiating graceful shutdown for workers...');
        await sqliWorker.close();
        await sqliParamWorker.close();
        await prisma.$disconnect();
        console.log('Worker connections closed. Exiting worker process.');
        process.exit(0);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
}
