import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

// **تصحيح 1:** استيراد الدوال بالأسماء الصحيحة من ملف الخدمة
import {
  registerUserAndCreateOrg, // <<<< الدالة الجديدة للتسجيل الكامل
  kullaniciGetirByEmail,
  yeniRefreshTokenOlustur,
  refreshTokenGuncelle,
  refreshTokenIptalEt
} from '../services/kullanici'; // تأكد من أن المسار صحيح

import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { signTokens } from '../utils/jwt'; // افتراض أن دالة signTokens موجودة في ملف مساعد

// --- وحدات التحكم (Controllers) ---

/**
 * @description يسجل مستخدمًا جديدًا، وينشئ له منظمة، ويعيد التوكنات.
 */
export const kullaniciKaydi = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);

    // **تصحيح 2:** استدعاء الدالة الجديدة التي تقوم بكل شيء
    const yeniKullanici = await registerUserAndCreateOrg({ email, name, password_hash });

    // توقيع التوكنات مباشرة بعد التسجيل (الدور الافتراضي هو ADMIN لمنظمته)
    const { accessToken, refreshToken } = signTokens({ id: yeniKullanici.id, role: 'ADMIN' });

    // تخزين الـ Refresh Token
    await yeniRefreshTokenOlustur(yeniKullanici.id, refreshToken);

    // إرسال الـ Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    } );

    // إرسال الـ Access Token
    return res.status(201).json({ accessToken });

  } catch (hata) {
    next(hata);
  }
};

/**
 * @description يسجل دخول مستخدم موجود ويعيد التوكنات.
 */
export const kullaniciGiris = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const kullanici = await kullaniciGetirByEmail(email);
    if (!kullanici) {
      throw new UnauthorizedError('Geçersiz e-posta veya şifre.');
    }

    const sifreDogruMu = await bcrypt.compare(password, kullanici.password);
    if (!sifreDogruMu) {
      throw new UnauthorizedError('Geçersiz e-posta veya şifre.');
    }

    const firstMembership = kullanici.memberships?.[0];
    if (!firstMembership) {
      throw new ForbiddenError('Bu kullanıcının herhangi bir organizasyona erişimi yok.');
    }

    const userRole = firstMembership.role;
    const { accessToken, refreshToken } = signTokens({
      id: kullanici.id,
      role: userRole,
    });

    await yeniRefreshTokenOlustur(kullanici.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    } );

    return res.status(200).json({ accessToken });

  } catch (hata) {
    next(hata);
  }
};

/**
 * @description يجدد الـ Access Token باستخدام الـ Refresh Token.
 */
export const refreshTokenYenile = async (req: Request, res: Response, next: NextFunction) => {
  const oldRefreshToken = req.cookies.refreshToken;
  if (!oldRefreshToken) {
    return next(new UnauthorizedError('Refresh token bulunamadı.'));
  }
  try {
    const { accessToken, refreshToken: newRefreshToken } = await refreshTokenGuncelle(oldRefreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    } );

    res.status(200).json({ accessToken });
  } catch (hata) {
    res.clearCookie('refreshToken');
    next(hata);
  }
};

/**
 * @description يسجل خروج المستخدم ويمسح التوكن.
 */
export const cikisYap = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (refreshToken) {
      await refreshTokenIptalEt(refreshToken);
    }
    res.clearCookie('refreshToken');
    return res.status(200).json({ mesaj: 'Çıkış başarılı.' });
  } catch (hata) {
    next(hata);
  }
};
