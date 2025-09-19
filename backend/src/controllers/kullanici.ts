import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { yeniKullaniciOlustur, kullaniciGetirByEmail } from '../services/kullanici';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * // وحدة تحكم لتسجيل مستخدم جديد
 * @param req - كائن الطلب
 * @param res - كائن الاستجابة
 */
export const kullaniciKaydi = async (req: Request, res: Response) => {
  const hatalar = validationResult(req);
  if (!hatalar.isEmpty()) {
    return res.status(400).json({ hatalar: hatalar.array() });
  }

  const { email, name, password } = req.body;

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const yeniKullanici = await yeniKullaniciOlustur({ email, name, password_hash });
    return res.status(201).json(yeniKullanici);
  } catch (hata) {
    if (hata instanceof Prisma.PrismaClientKnownRequestError && hata.code === 'P2002') {
      return res.status(409).json({ mesaj: 'Bu e-posta adresi zaten kullanılıyor.' });
    }
    console.error("Kayıt sırasında beklenmedik hata:", hata);
    return res.status(500).json({ mesaj: 'Kayıt işlemi sırasında bir sunucu hatası oluştu.' });
  }
};

/**
 * // وحدة تحكم لتسجيل دخول المستخدم وإصدار توكن
 * @param req - كائن الطلب
 * @param res - كائن الاستجابة
 */
export const kullaniciGiris = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mesaj: 'E-posta ve şifre alanları zorunludur.' });
  }

  try {
    const kullanici = await kullaniciGetirByEmail(email);
    if (!kullanici) {
      return res.status(401).json({ mesaj: 'Geçersiz e-posta veya şifre.' });
    }

    const sifreDogruMu = await bcrypt.compare(password, kullanici.password);
    if (!sifreDogruMu) {
      return res.status(401).json({ mesaj: 'Geçersiz e-posta veya şifre.' });
    }

    const payload = { id: kullanici.id, email: kullanici.email };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'varsayilan_super_gizli_anahtar',
      { expiresIn: '1d' }
    );

    return res.status(200).json({ mesaj: 'Giriş başarılı!', token: token });
  } catch (hata) {
    console.error("Giriş sırasında beklenmedik hata:", hata);
    return res.status(500).json({ mesaj: 'Giriş işlemi sırasında bir sunucu hatası oluştu.' });
  }
};
