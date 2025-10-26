// src/services/kullanici.ts

import { PrismaClient, User, RefreshToken, Role, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isPrismaError, ConflictError, ForbiddenError, InternalServerError, UnauthorizedError } from '../utils/errors';

const prisma = new PrismaClient();

// --- واجهات البيانات (Interfaces) ---
interface KullaniciOlusturmaVerisi {
  email: string;
  name: string;
  password_hash: string;
}

// --- دوال الخدمة (Services) ---

/**
 * دالة لتسجيل مستخدم جديد، وإنشاء منظمة افتراضية له،
 * وربطه بها كـ ADMIN، كل ذلك في معاملة واحدة.
 * @param veri - بيانات المستخدم (البريد الإلكتروني، الاسم، وهاش كلمة المرور)
 * @returns - المستخدم الجديد الذي تم إنشاؤه (بدون كلمة المرور)
 */
export const registerUserAndCreateOrg = async (veri: KullaniciOlusturmaVerisi) => {
  try {
    const newUser = await prisma.$transaction(async (tx) => {
      // 1. إنشاء المستخدم
      const user = await tx.user.create({
        data: {
          email: veri.email,
          name: veri.name,
          password: veri.password_hash,
        },
      });

      // 2. إنشاء منظمة افتراضية للمستخدم
      const organization = await tx.organization.create({
        data: {
          name: `${veri.name}'s Organization`, // اسم افتراضي للمنظمة
          slug: `${veri.name.toLowerCase().replace(/\s+/g, '-')}-${user.id.slice(-6)}`,
        },
      });

      // 3. إنشاء عضوية لربط المستخدم بالمنظمة كـ ADMIN
      await tx.membership.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          role: 'ADMIN', // تعيين المستخدم كمدير لمنظمته
        },
      });

      return user;
    });

    // إرجاع المستخدم بدون كلمة المرور
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;

  } catch (hata) {
    if (hata instanceof Prisma.PrismaClientKnownRequestError && hata.code === 'P2002') {
      throw new ConflictError('Bu e-posta adresi veya organizasyon adı zaten kullanılıyor.');
    }
    console.error("Error during registration transaction:", hata);
    throw new InternalServerError("Kayıt işlemi sırasında beklenmedik bir hata oluştu.");
  }
};


/**
 * دالة لجلب مستخدم واحد باستخدام البريد الإلكتروني (مع عضوياته).
 */
export const kullaniciGetirByEmail = async (email: string) => {
  try {
    const kullanici = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          select: {
            role: true,
            organizationId: true,
          }
        }
      }
    });
    return kullanici;
  } catch (hata) {
    console.error(`${email} e-postalı kullanıcı getirilirken hata oluştu:`, hata);
    throw hata;
  }
};

export const yeniRefreshTokenOlustur = async (userId: string, refreshToken: string): Promise<RefreshToken> => {
  const hashedToken = await bcrypt.hash(refreshToken, 10);
  const yeniToken = await prisma.refreshToken.create({
    data: {
      userId: userId,
      hashedToken: hashedToken,
    },
  });
  return yeniToken;
};

export const refreshTokenIptalEt = async (refreshToken: string): Promise<boolean> => {
  try {
    const decoded = jwt.decode(refreshToken) as { sub: string };
    if (!decoded || !decoded.sub) return true;

    const userTokens = await prisma.refreshToken.findMany({
      where: { userId: decoded.sub, revoked: false },
    });

    for (const token of userTokens) {
      const isMatch = await bcrypt.compare(refreshToken, token.hashedToken);
      if (isMatch) {
        await prisma.refreshToken.delete({ where: { id: token.id } });
        return true;
      }
    }
    return true;
  } catch (error) {
    console.error("RefreshToken iptal edilirken hata:", error);
    return true;
  }
};

export const refreshTokenGuncelle = async (oldRefreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
  if (!process.env.JWT_REFRESH_SECRET || !process.env.JWT_ACCESS_SECRET) {
    throw new InternalServerError("Sunucu yapılandırması eksik.");
  }

  const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET) as { sub: string, role: Role };
  if (!decoded || !decoded.sub) {
    throw new UnauthorizedError('Geçersiz Refresh Token.');
  }

  const userTokens = await prisma.refreshToken.findMany({
    where: { userId: decoded.sub, revoked: false },
  });

  let matchingToken: RefreshToken | null = null;
  for (const token of userTokens) {
    const isMatch = await bcrypt.compare(oldRefreshToken, token.hashedToken);
    if (isMatch) {
      matchingToken = token;
      break;
    }
  }

  if (!matchingToken) {
    await prisma.refreshToken.updateMany({
      where: { userId: decoded.sub },
      data: { revoked: true },
    });
    throw new ForbiddenError('Token kötüye kullanımı tespit edildi. Tüm oturumlar sonlandırıldı.');
  }

  // تم التعديل هنا لحذف التوكن القديم بدلاً من تحديثه فقط
  await prisma.refreshToken.delete({
    where: { id: matchingToken.id },
  });

  const { accessToken, refreshToken: newRefreshToken } = signTokens({ id: decoded.sub, role: decoded.role });
  await yeniRefreshTokenOlustur(decoded.sub, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

// دالة مساعدة لتوقيع التوكنات، يجب أن تكون هنا أو في ملف مساعد
const signTokens = (user: { id: string; role: Role }) => {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets must be defined");
  }
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};
