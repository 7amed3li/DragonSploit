import { PrismaClient, Organization, Role } from '@prisma/client';

const prisma = new PrismaClient();

// واجهة (Interface) لتحديد البيانات المطلوبة لإنشاء مؤسسة
interface KurumOlusturmaVerisi {
  name: string;
  slug: string;
  olusturanId: string; // ID الخاص بالمستخدم الذي يقوم بالإنشاء
}

/**
 * // دالة لإنشاء مؤسسة جديدة وربط المستخدم بها كـ ADMIN
 * @param veri - بيانات المؤسسة + معرف المستخدم
 * @returns - المؤسسة التي تم إنشاؤها
 */
export const yeniKurumOlustur = async (veri: KurumOlusturmaVerisi): Promise<Organization> => {
  try {
    // استخدام Prisma Transaction لضمان تنفيذ العمليتين معًا
    const yeniKurum = await prisma.$transaction(async (tx) => {
      // العملية الأولى: إنشاء المؤسسة
      const kurum = await tx.organization.create({
        data: {
          name: veri.name,
          slug: veri.slug,
        },
      });

      // العملية الثانية: إنشاء سجل عضوية للمستخدم
      await tx.membership.create({
        data: {
          userId: veri.olusturanId,
          organizationId: kurum.id,
          role: Role.ADMIN, // تعيين المستخدم كـ ADMIN لهذه المؤسسة
        },
      });

      return kurum;
    });

    return yeniKurum;
  } catch (hata) {
    console.error("Kurum ve üyelik oluşturulurken hata oluştu:", hata);
    throw hata;
  }
};

/**
 * // دالة لجلب المؤسسات التي ينتمي إليها مستخدم معين فقط
 * @param kullaniciId - معرف المستخدم الذي نريد جلب مؤسساته
 * @returns - مصفوفة تحتوي على المؤسسات التي هو عضو فيها
 */
export const kullaniciKurumlariniGetir = async (kullaniciId: string): Promise<Organization[]> => {
  try {
    // استخدام Prisma لجلب جميع العضويات (Memberships) الخاصة بالمستخدم
    const uyelikler = await prisma.membership.findMany({
      where: {
        userId: kullaniciId,
      },
      // الأهم: جلب بيانات المؤسسة الكاملة المرتبطة بكل عضوية
      include: {
        organization: true,
      },
    });

    // استخراج كائنات المؤسسات فقط من مصفوفة العضويات
    const kurumlar = uyelikler.map(uyelik => uyelik.organization);

    return kurumlar;
  } catch (hata) {
    console.error("Kullanıcının kurumları getirilirken hata oluştu:", hata);
    throw hata;
  }
};
