// src/worker/worker-loader.ts (النسخة النهائية المصححة)

import 'dotenv/config';
import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';

// استيراد قائمة الانتظار والمعالج الخاص بالـ SQLi (كمثال)
import { sqliQueue } from './queues/sqli';
import { processSqliJob } from './jobs/sqli';

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

    // ... (يمكنك إضافة بقية العمال هنا بنفس الطريقة)
    // -----------------------------------------------------

    // دالة الإغلاق الآمن
    const gracefulShutdown = async () => {
        console.log('...Initiating graceful shutdown for workers...');
        await sqliWorker.close();
        await prisma.$disconnect();
        console.log('Worker connections closed. Exiting worker process.');
        process.exit(0);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
}
