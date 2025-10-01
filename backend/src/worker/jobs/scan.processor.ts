import { Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';

// نقوم بإنشاء نسخة واحدة من Prisma Client لإعادة استخدامها في جميع أنحاء التطبيق.
const prisma = new PrismaClient();

// هذا هو تعريف نوع البيانات التي نتوقعها في كل مهمة.
// يساعدنا في الحصول على تكملة تلقائية للكود وتجنب الأخطاء.
interface ScanJobData {
  scanId: string;
}

/**
 * معالج مهمة الفحص
 * @param job المهمة القادمة من قائمة الانتظار
 */
const processScanJob = async (job: Job<ScanJobData>) => {
  const { scanId } = job.data;
  console.log(`[Worker] Processing scan job: ${scanId}`);

  try {
    // الخطوة 1: تحديث حالة الفحص في قاعدة البيانات إلى "RUNNING"
    await prisma.scan.update({
      where: { id: scanId },
      data: { status: 'RUNNING' },
    });
    console.log(`[Worker] Updated scan ${scanId} status to RUNNING`);

    // --- منطقة المحاكاة ---
    // في المستقبل، سيتم وضع منطق الفحص الفعلي (البصمة، الذكاء الاصطناعي، إلخ) هنا.
    // الآن، سنقوم فقط بمحاكاة عملية تستغرق 5 ثوانٍ.
    console.log(`[Worker] ...performing a 5-second mock scan...`);
    await new Promise(resolve => setTimeout(resolve, 5000));
    // --- نهاية منطقة المحاكاة ---

    // الخطوة 2: تحديث حالة الفحص إلى "COMPLETED"
    await prisma.scan.update({
      where: { id: scanId },
      data: { status: 'COMPLETED' },
    });
    console.log(`[Worker] Scan ${scanId} completed successfully!`);

  } catch (error) {
    console.error(`[Worker] Error processing scan ${scanId}:`, error);
    
    // في حالة حدوث خطأ، نقوم بتحديث الحالة إلى "FAILED".
    // نضع هذا في كتلة try-catch خاصة به لضمان تحديث الحالة حتى لو فشلت العملية الرئيسية.
    try {
      await prisma.scan.update({
        where: { id: scanId },
        data: { status: 'FAILED' },
      });
    } catch (dbError) {
      console.error(`[Worker] CRITICAL: Failed to update scan ${scanId} status to FAILED.`, dbError);
    }

    // نقوم برمي الخطأ مرة أخرى لإعلام BullMQ بأن المهمة قد فشلت.
    throw error;
  }
};

export default processScanJob;
