import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { COMMON_FALLBACK_PARAMS } from './common';

// استيراد وحدات الفحص (Attack Vectors)
import { executeAuthBypassAttack } from './vector0-auth-bypass';
import { executeInBandAttack } from './vector1-in-band';
import { executeBlindAttack } from './vector2-blind';
import { executeOutOfBandAttack } from './vector3-out-of-band';
import { executeSecondOrderAttack } from './vector4-second-order';
import { executeStackedQueriesAttack } from './vector5-stacked-queries';

/**
 * DragonSploit Orchestrator (Enterprise Edition)
 * المحرك الرئيسي لإدارة وتنسيق عمليات فحص SQL Injection.
 * يركز على الأداء العالي والموثوقية من خلال التنفيذ المتوازي وإدارة الموارد.
 */
export async function runSqliScan(job: Job, prisma: PrismaClient): Promise<void> {
    const { scanId, targetUrl } = job.data;
    console.log(`\n[Orchestrator] 🚀 Initiating Enterprise SQLi Scan: ${targetUrl} (ID: ${scanId})`);
    
    let totalVulnerabilities = 0;
    
    try {
        // 1. تحديث حالة الفحص إلى "قيد التنفيذ"
        await prisma.scan.update({
            where: { id: scanId },
            data: { status: 'RUNNING', startedAt: new Date() },
        });

        // --- المرحلة الأولى: فحوصات النطاق العام (Wave 1) ---
        // يتم تشغيلها مرة واحدة لأنها لا تعتمد على بارامترات محددة في الرابط
        console.log('\n--- Wave 1: Global Vectors (Auth Bypass) ---');
        if (await executeAuthBypassAttack(job, prisma)) totalVulnerabilities++;
        
        await job.updateProgress(10); // تحديث التقدم المبدئي
        // 🆕 حفظ التقدم الأولي
        try {
             // @ts-ignore: Prisma Client types might be stale
             await prisma.scan.update({ where: { id: scanId }, data: { progress: 10 } });
        } catch (e) { /* Ignore stale client error */ }

        // --- المرحلة الثانية: الفحص الدقيق لكل بارامتر (Waves 2-6) ---
        // نحتفظ بنسخة من البيانات الأصلية لتجنب تلوث البيانات أثناء التكرار
        const baseJobData = { ...job.data };
        const totalParams = COMMON_FALLBACK_PARAMS.length;

        for (let i = 0; i < totalParams; i++) {
            const param = COMMON_FALLBACK_PARAMS[i];
            console.log(`\n[Orchestrator] 🎯 Targeting Parameter: [${param}] (${i + 1}/${totalParams})`);

            // تحديث سياق المهمة للباراميتر الحالي
            job.data.parameter = param;

            // ⚡ تحسين الأداء: التشغيل المتوازي (Parallel Execution)
            // نقوم بتشغيل متجهات الفحص المستقلة في آن واحد لتقليل وقت الانتظار.
            // نستخدم Promise.allSettled لضمان استمرار الفحص حتى لو فشل أحد المتجهات.
            
            const attackResults = await Promise.allSettled([
                executeInBandAttack(job, prisma),       // Wave 2: In-Band
                executeBlindAttack(job, prisma),        // Wave 3: Blind
                executeOutOfBandAttack(job, prisma),    // Wave 4: OOB
                executeStackedQueriesAttack(job, prisma)// Wave 6: Stacked
            ]);

            // تحليل نتائج التوازي
            attackResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    if (result.value === true) totalVulnerabilities++;
                } else {
                    // تسجيل الخطأ دون إيقاف الفحص (Graceful Degradation)
                    const vectorNames = ['In-Band', 'Blind', 'OOB', 'Stacked'];
                    console.error(`[Orchestrator] ⚠️ Warning: ${vectorNames[index]} vector failed on param '${param}':`, result.reason);
                }
            });

            // تحديث شريط التقدم بناءً على عدد البارامترات المنجزة
            // المعادلة: نوزع 80% من التقدم على هذه المرحلة
            const progress = 10 + Math.floor(((i + 1) / totalParams) * 80);
            await job.updateProgress(progress);
            
            // 🆕 تحديث التقدم في قاعدة البيانات للعرض في الواجهة (مع حماية من الأخطاء)
            try {
                // @ts-ignore: Prisma Client types might be stale
                await prisma.scan.update({
                    where: { id: scanId },
                    data: { progress: progress }
                });
            } catch (e) {
                // قد يفشل إذا لم يتم تحديث Prisma Client بعد، نتجاهل الخطأ لكي لا يتوقف الفحص
                console.warn('[Orchestrator] Failed to sync progress to DB (Non-fatal)');
            }
        }

        // استعادة البيانات الأصلية للمرحلة الأخيرة
        job.data = baseJobData;

        // --- المرحلة الثالثة: فحوصات الدرجة الثانية (Final Wave) ---
        // يجب أن تكون هذه المرحلة الأخيرة لأنها قد تعتمد على بيانات تم تخزينها سابقاً
        console.log('\n--- Final Wave: Second-Order (Stored Attacks) ---');
        if (await executeSecondOrderAttack(job, prisma)) totalVulnerabilities++;
        
        await job.updateProgress(100);
        // لا نحتاج لتحديث التقدم هنا لأن التحديث الأخير سيضع الحالة COMPLETED والتقدم 100

        // --- إتمام المهمة ---
        // @ts-ignore: Prisma Client types might be stale
        await prisma.scan.update({
            where: { id: scanId },
            data: { 
                status: 'COMPLETED', 
                progress: 100, // 🆕 تأكيد الوصول لـ 100%
                completedAt: new Date(),
                // يمكن إضافة حقل لعدد النتائج إذا كان مدعوماً في قاعدة البيانات
                // findingsCount: totalVulnerabilities 
            },
        });
        
        console.log(`\n[Orchestrator] ✅ Mission Accomplished. Scan ${scanId} completed.`);
        console.log(`[Orchestrator] 📊 Total Vulnerabilities Found: ${totalVulnerabilities}`);

    } catch (error: any) {
        // شبكة أمان للأخطاء الحرجة (Critical Failure Catch-All)
        const errorMessage = error instanceof Error ? error.message : 'Unknown system error';
        console.error(`[Orchestrator] 💥 CRITICAL FAILURE: ${errorMessage}`, error);
        
        try {
            await prisma.scan.update({
                where: { id: scanId },
                data: { status: 'FAILED', completedAt: new Date() },
            });
        } catch (dbError) {
            console.error(`[Orchestrator] ‼️ Fatal DB Error (Could not update status):`, dbError);
        }
        
        // إعادة رمي الخطأ ليتمكن نظام الجدولة (BullMQ) من التعامل معه (Retry/Dead Letter Queue)
        throw error;
    }
}