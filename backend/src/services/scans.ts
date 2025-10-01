import { PrismaClient, ScanStatus } from '@prisma/client';
import { ForbiddenError, NotFoundError } from '../utils/errors';
import { scanQueue } from '../worker/queues/scan.queue'; 

const prisma = new PrismaClient();

/**
 * يبدأ عملية فحص جديدة بعد التحقق من الصلاحيات، ويضعها في قائمة الانتظار.
 * @param userId - معرف المستخدم الذي بدأ الفحص.
 * @param targetId - معرف الهدف المراد فحصه.
 * @param configurationId - (اختياري) معرف تكوين الفحص المراد استخدامه.
 * @returns كائن الفحص الذي تم إنشاؤه ووضعه في قائمة الانتظار.
 */
export const initiateScan = async (
  userId: string,
  targetId: string,
  configurationId?: string
) => {
  // 1. ابحث عن الهدف أولاً.
  const target = await prisma.target.findUnique({
    where: { id: targetId },
  });

  if (!target) {
    throw new NotFoundError('Target not found');
  }

  // 2. الآن بعد أن تأكدنا من وجود الهدف، تحقق من صلاحيات المستخدم.
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: target.organizationId,
      },
    },
  });

  if (!membership) {
    throw new ForbiddenError('You do not have permission to scan this target');
  }

  // 3. (اختياري) تحقق من وجود تكوين الفحص.
  if (configurationId) {
    const config = await prisma.scanConfiguration.findFirst({
      where: {
        id: configurationId,
        organizationId: target.organizationId,
      },
    });
    if (!config) {
      throw new NotFoundError('Scan configuration not found or does not belong to this organization');
    }
  }


  // 4. أنشئ سجل الفحص الجديد بحالة "QUEUED".
  const scan = await prisma.scan.create({
    data: {
      targetId: targetId,
      organizationId: target.organizationId, // <-- (التعديل 2: إضافة علاقة المنظمة)
      status: ScanStatus.QUEUED, // <-- (التعديل 3: تغيير الحالة)
      configurationId: configurationId || null,
    },
  });

  // 5. أضف مهمة جديدة إلى قائمة الانتظار.
  await scanQueue.add('scan-job', { scanId: scan.id }); // <-- (التعديل 4: إضافة المهمة)
  console.log(`✅ Scan job added to queue for scanId: ${scan.id}`);

  // 6. أرجع سجل الفحص الذي تم إنشاؤه.
  return scan;


};

/**
 * يجلب تفاصيل فحص معين بالمعرف الخاص به.
 * @param userId - معرف المستخدم الذي يطلب الفحص.
 * @param scanId - معرف الفحص المراد جلبه.
 * @returns كائن الفحص مع تفاصيله.
 */
export const getScanById = async (userId: string, scanId: string) => {
  // 1. ابحث عن الفحص. لم نعد بحاجة لتضمين الهدف.
  const scan = await prisma.scan.findUnique({
    where: { id: scanId },
    include: {
      vulnerabilities: true, // ما زلنا نريد رؤية الثغرات
    },
  });

  if (!scan) {
    throw new NotFoundError('Scan not found');
  }

  // 2. تحقق من الصلاحيات باستخدام الحقل المباشر.
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: scan.organizationId, // <-- التصحيح هنا. استخدم الحقل المباشر.
      },
    },
  });

  if (!membership) {
    throw new ForbiddenError('You do not have permission to view this scan');
  }

  return scan;
};


/**
 * يجلب قائمة بجميع الفحوصات لمنظمة معينة.
 * @param userId - معرف المستخدم الذي يطلب القائمة.
 * @param organizationId - معرف المنظمة.
 * @returns قائمة بالفحوصات.
 */
export const listScansForOrg = async (userId: string, organizationId: string) => {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: organizationId,
      },
    },
  });

  if (!membership) {
    throw new ForbiddenError('You are not a member of this organization');
  }

  // لقد قمت بإضافة organizationId مباشرة إلى Scan, لذا يمكننا تبسيط هذا الاستعلام
  const scans = await prisma.scan.findMany({
    where: {
      organizationId: organizationId, // <-- أصبح الاستعلام أبسط الآن
    },
    include: {
      target: {
        select: { name: true, url: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return scans;
};
