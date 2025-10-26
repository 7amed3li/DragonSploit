import { PrismaClient, ScanStatus } from '@prisma/client';
import { ForbiddenError, NotFoundError } from '../utils/errors';
import { scanQueue } from '../worker/queues/scan'; 

const prisma = new PrismaClient();

// 🆕 دالة وهمية للحصول على بصمة التقنية (يجب استبدالها بمنطق كشف حقيقي)
// نفترض هنا أننا نستخدم هدفاً معروفاً أو خوارزمية كشف
const getTechnologyFingerprint = async (targetUrl: string): Promise<string> => {
    // ⚠️ يجب استبدال هذا بمنطق كشف تقنية حقيقي (مثل Web technology profiler)
    // نُرجع قيمة افتراضية لغرض الاختبار
    if (targetUrl.includes('juice-shop')) {
        return "Node.js, Express, SQLite (Fallback to PostgreSQL syntax for AI)";
    }
    return "Unknown Stack";
};


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

    // 🆕 الخطوة الإضافية: كشف البصمة التقنية قبل إنشاء سجل الفحص
    const techFingerprint = await getTechnologyFingerprint(target.url);
    console.log(`[API Service] Detected Technology Fingerprint: ${techFingerprint}`);


    // 4. أنشئ سجل الفحص الجديد بحالة "QUEUED".
    const scan = await prisma.scan.create({
        data: {
            targetId: targetId,
            organizationId: target.organizationId, 
            status: ScanStatus.QUEUED,
            configurationId: configurationId || null,
            technologyFingerprint: techFingerprint, // 🆕 حفظ بصمة التقنية في سجل الفحص
        },
    });

    // 5. أضف مهمة جديدة إلى قائمة الانتظار.
    // 🛑 لاحظ: تم استخدام await قبل create لضمان أن scan.id موجود في DB قبل الإرسال للطابور.
    await scanQueue.add('scan-job', { 
        scanId: scan.id,
        targetUrl: target.url, // 🆕 إرسال الـ URL مباشرةً لتجنب البحث في DB
        technologyFingerprint: techFingerprint, // 🆕 إرسال البصمة مباشرةً للعامل
    }); 
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
    // 1. ابحث عن الفحص.
    const scan = await prisma.scan.findUnique({
        where: { id: scanId },
        include: {
            vulnerabilities: true, 
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
                organizationId: scan.organizationId,
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

    const scans = await prisma.scan.findMany({
        where: {
            organizationId: organizationId,
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