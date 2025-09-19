import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// واجهة (Interface) لتحديد البيانات المطلوبة لإنشاء مستخدم
interface KullaniciOlusturmaVerisi {
  email: string;
  name: string;
  password_hash: string; // سنحفظ الهاش وليس كلمة المرور الأصلية
}

/**
 * // دالة لإنشاء مستخدم جديد في قاعدة البيانات
 * @param veri - بيانات المستخدم (البريد الإلكتروني، الاسم، وهاش كلمة المرور)
 * @returns - المستخدم الذي تم إنشاؤه (بدون كلمة المرور)
 */
export const yeniKullaniciOlustur = async (veri: KullaniciOlusturmaVerisi): Promise<Omit<User, 'password'>> => {
  try {
    const yeniKullanici = await prisma.user.create({
      data: {
        email: veri.email,
        name: veri.name,
        password: veri.password_hash,
      },
      // تحديد الحقول التي سيتم إرجاعها (لإخفاء كلمة المرور)
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return yeniKullanici;
  } catch (hata) {
    console.error("Kullanıcı oluşturulurken hata oluştu:", hata);
    throw hata;
  }
};
/**
 * // دالة لجلب مستخدم واحد باستخدام البريد الإلكتروني (مع كلمة المرور)
 * @param email - البريد الإلكتروني للمستخدم المطلوب
 * @returns - كائن المستخدم كاملاً إذا تم العثور عليه، أو null
 */
export const kullaniciGetirByEmail = async (email: string): Promise<User | null> => {
  try {
    // استخدام Prisma للبحث عن مستخدم يطابق البريد الإلكتروني
    const kullanici = await prisma.user.findUnique({
      where: { email },
    });
    return kullanici;
  } catch (hata) {
    console.error(`${email} e-postalı kullanıcı getirilirken hata oluştu:`, hata);
    throw hata;
  }
};