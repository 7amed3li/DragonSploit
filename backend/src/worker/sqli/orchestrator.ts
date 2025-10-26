// backend/src/worker/jobs/sqli/orchestrator.ts

import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';

// استيراد جميع المتخصصين
import { executeAuthBypassAttack } from './vector0-auth-bypass';
import { executeInBandAttack } from './vector1-in-band';
import { executeBlindAttack } from './vector2-blind';
import { executeOutOfBandAttack } from './vector3-out-of-band';
import { executeSecondOrderAttack } from './vector4-second-order';
import { executeStackedQueriesAttack } from './vector5-stacked-queries';

/**
 * القائد الأعلى: ينظم تسلسل الهجمات باستخدام جيش المتخصصين.
 * هذا هو التنفيذ الكامل لمنطقك المتسلسل.
 */
export async function runSqliScan(job: Job, prisma: PrismaClient): Promise<void> {
    const { scanId, targetUrl } = job.data;
    console.log(`[Orchestrator] 🚀 Launching full-spectrum SQLi assault on ${targetUrl} for scan ${scanId}`);
    let successes = 0;

    try {
        // تنفيذ المتجهات بالتسلسل، مع تسجيل كل خطوة
        console.log('\n--- Wave 1: Authentication Bypass ---');
        if (await executeAuthBypassAttack(job, prisma)) successes++;

        console.log('\n--- Wave 2: In-Band (Error & UNION) ---');
        if (await executeInBandAttack(job, prisma)) successes++;

        console.log('\n--- Wave 3: Blind (Boolean & Time) ---');
        if (await executeBlindAttack(job, prisma)) successes++;
        
        console.log('\n--- Wave 4: Out-of-Band (OOB) ---');
        if (await executeOutOfBandAttack(job, prisma)) successes++;
        
        console.log('\n--- Wave 5: Second-Order (Stored) ---');
        if (await executeSecondOrderAttack(job, prisma)) successes++;

        console.log('\n--- Wave 6: Stacked Queries (Execution) ---');
        if (await executeStackedQueriesAttack(job, prisma)) successes++;

        // تحديث حالة الفحص إلى "مكتمل" بعد انتهاء جميع الهجمات
        await prisma.scan.update({
            where: { id: scanId },
            data: { status: 'COMPLETED', completedAt: new Date() },
        });
        
        console.log(`\n[Orchestrator] ✅ Comprehensive scan finished for scan ${scanId}. Found ${successes} vulnerability vectors.`);

    } catch (error: unknown) {
        // في حالة حدوث خطأ فادح أثناء الفحص
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error(`[Orchestrator] ❌ A critical error stopped the scan: ${errorMessage}`, error);
        
        try {
            await prisma.scan.update({
                where: { id: scanId },
                data: { status: 'FAILED', completedAt: new Date() },
            });
        } catch (updateError: unknown) {
            const updateErrorMessage = updateError instanceof Error ? updateError.message : 'An unknown error occurred';
            console.error(`[Orchestrator] ‼️ Failed to even update scan status to FAILED: ${updateErrorMessage}`);
        }
    }
};
