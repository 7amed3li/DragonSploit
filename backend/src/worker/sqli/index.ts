import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { runSqliScan } from './orchestrator';
import { performance } from 'perf_hooks'; // لقياس الأداء بدقة عالية

/**
 * 🛡️ SQL Injection Job Processor Gateway
 * هذه هي نقطة الدخول الرئيسية لجميع مهام SQLi.
 * وظيفتها: التحقق من صحة البيانات، قياس الأداء، وتغليف القائد الأعلى (Orchestrator).
 */
export async function processSqliJob(job: Job, prisma: PrismaClient): Promise<void> {
    const startTime = performance.now();
    const { scanId, targetUrl } = job.data;

    // 1. Input Validation (Sanity Check)
    // قبل أن نزعج الـ Orchestrator، نتأكد أن البيانات الأساسية موجودة
    if (!scanId || !targetUrl) {
        const errorMsg = `[SQLi Job] ❌ Invalid Job Data: Missing scanId or targetUrl. Job ID: ${job.id}`;
        console.error(errorMsg);
        throw new Error(errorMsg); // نرفض المهمة فوراً ليعلم BullMQ أنها فشلت
    }

    console.log(`\n[SQLi Job] 🎬 STARTING JOB #${job.id} | Target: ${targetUrl}`);

    try {
        // 2. Initialize Progress
        await job.updateProgress(0);

        // 3. Execute Core Logic (Delegate to Orchestrator)
        await runSqliScan(job, prisma);

        // 4. Performance Metrics
        const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        console.log(`[SQLi Job] 🏁 JOB FINISHED #${job.id} in ${duration}s`);

    } catch (error: any) {
        // 5. Global Error Safety Net
        // حتى لو فشل الـ Orchestrator، نضمن تسجيل الخطأ هنا كملجأ أخير
        const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        console.error(`[SQLi Job] 💥 JOB FAILED #${job.id} after ${duration}s: ${error.message}`);
        
        // إعادة رمي الخطأ ضروري جداً لكي يعرف BullMQ أن الوظيفة فشلت ويقوم بجدولة إعادة المحاولة (Retry)
        throw error;
    }
}