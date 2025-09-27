import { PrismaClient, ScanStatus } from '@prisma/client';
import { ForbiddenError, NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();

/**
 * يبدأ عملية فحص جديدة بعد التحقق من الصلاحيات.
 * @param userId - معرف المستخدم الذي بدأ الفحص.
 * @param targetId - معرف الهدف المراد فحصه.
 * @param configurationId - (اختياري) معرف تكوين الفحص المراد استخدامه.
 * @returns كائن الفحص الذي تم إنشاؤه.
 */
export const initiateScan = async (
  userId: string,
  targetId: string,
  configurationId?: string
) => {
  // --- التعديل الأول: فصل التحقق ---
  // 1. ابحث عن الهدف أولاً.
  const target = await prisma.target.findUnique({
    where: { id: targetId },
  });

  // إذا لم يتم العثور على الهدف، أرسل خطأ 404 واضح.
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

  // إذا لم يكن المستخدم عضوًا، أرسل خطأ 403 واضح.
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

  // 4. أنشئ سجل الفحص الجديد.
  const scan = await prisma.scan.create({
    data: {
      targetId: targetId,
      status: ScanStatus.PENDING,
      configurationId: configurationId || null,
    },
  });

  // TODO: Trigger background job here
  return scan;
};

/**
 * يجلب تفاصيل فحص معين بالمعرف الخاص به.
 * @param userId - معرف المستخدم الذي يطلب الفحص.
 * @param scanId - معرف الفحص المراد جلبه.
 * @returns كائن الفحص مع تفاصيله.
 */
export const getScanById = async (userId: string, scanId: string) => {
  // --- التعديل الثاني: فصل التحقق ---
  // 1. ابحث عن الفحص أولاً.
  const scan = await prisma.scan.findUnique({
    where: { id: scanId },
    include: {
      vulnerabilities: true,
      target: true, // قم بتضمين الهدف للحصول على organizationId
    },
  });

  // إذا لم يتم العثور على الفحص، أرسل خطأ 404 واضح.
  if (!scan) {
    throw new NotFoundError('Scan not found');
  }

  // 2. الآن بعد أن تأكدنا من وجود الفحص، تحقق من صلاحيات المستخدم.
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: scan.target.organizationId,
      },
    },
  });

  // إذا لم يكن المستخدم عضوًا، أرسل خطأ 403 واضح.
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
  // هذا الكود كان صحيحًا بالفعل ولا يحتاج إلى تعديل.
  // يتحقق أولاً من العضوية، ثم يجلب البيانات.
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

  const scans = await prisma.scan.findMany({
    where: {
      target: {
        organizationId: organizationId,
      },
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
