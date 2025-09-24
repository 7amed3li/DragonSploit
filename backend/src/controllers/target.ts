// src/controllers/target.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Prisma } from '@prisma/client';
import {
  organizasyonIcinHedefOlustur,
  organizasyonHedefleriniGetir,
  tekHedefiGetir,
  hedefiSil
} from '../services/target';

// --- وحدة التحكم 1: إنشاء هدف ---
export const hedefOlustur = async (req: Request, res: Response) => {
  const hatalar = validationResult(req);
  if (!hatalar.isEmpty()) {
    return res.status(400).json({ hatalar: hatalar.array() });
  }
  const olusturanId = req.kullanici.id;
  const { name, url, organizationId } = req.body;
  try {
    const yeniHedef = await organizasyonIcinHedefOlustur({ name, url, organizationId, olusturanId });
    return res.status(201).json(yeniHedef);
  } catch (hata) {
    if (hata instanceof Error && hata.message.startsWith('YASAK')) {
      return res.status(403).json({ mesaj: 'Yasak: Bu organizasyona hedef ekleme izniniz yok.' });
    }
    if (hata instanceof Prisma.PrismaClientKnownRequestError && hata.code === 'P2003') {
      return res.status(404).json({ mesaj: 'Hata: Belirtilen organizasyon mevcut değil.' });
    }
    console.error("Hedef oluşturulurken beklenmedik hata:", hata);
    return res.status(500).json({ mesaj: 'Beklenmedik bir sunucu hatası oluştu.' });
  }
};

// --- وحدة التحكم 2: عرض قائمة الأهداف ---
export const hedefleriListele = async (req: Request, res: Response) => {
  const userId = req.kullanici.id;
  const { organizationId } = req.query;
  if (!organizationId || typeof organizationId !== 'string') {
    return res.status(400).json({ mesaj: 'organizationId query parametresi zorunludur.' });
  }
  try {
    const hedefler = await organizasyonHedefleriniGetir(organizationId, userId);
    return res.status(200).json(hedefler);
  } catch (hata) {
    if (hata instanceof Error && hata.message.startsWith('YASAK')) {
      return res.status(403).json({ mesaj: 'Yasak: Bu organizasyonun hedeflerini görüntüleme izniniz yok.' });
    }
    console.error("Hedefler listelenirken beklenmedik hata:", hata);
    return res.status(500).json({ mesaj: 'Beklenmedik bir sunucu hatası oluştu.' });
  }
};

// --- وحدة التحكم 3: عرض هدف واحد ---
export const getSingleTarget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.kullanici.id;

  // --- أضف نفس الفحص هنا أيضًا ---
  if (!id) {
    return res.status(400).json({ mesaj: 'Hedef IDsi gereklidir.' });
  }

  try {
    const hedef = await tekHedefiGetir(id, userId);
    if (!hedef) {
      return res.status(404).json({ mesaj: 'Hedef bulunamadı veya bu hedefe erişim izniniz yok.' });
    }
    return res.status(200).json(hedef);
  } catch (hata) {
    console.error("Tek hedef getirilirken hata:", hata);
    return res.status(500).json({ mesaj: 'Beklenmedik bir sunucu hatası oluştu.' });
  }
};

// --- وحدة التحكم 4: حذف هدف ---
export const deleteTarget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.kullanici.id;

  // --- هذا هو السطر الجديد الذي يحل المشكلة ---
  if (!id) {
    return res.status(400).json({ mesaj: 'Hedef IDsi gereklidir.' });
  }

  try {
    // الآن TypeScript متأكد 100% أن 'id' هو 'string'
    await hedefiSil(id, userId);
    return res.status(204).send();
    
  } catch (hata) {
    if (hata instanceof Error && hata.message === 'NOT_FOUND_OR_FORBIDDEN') {
      return res.status(404).json({ mesaj: 'Silinecek hedef bulunamadı veya bu hedefe erişim izniniz yok.' });
    }
    console.error("Hedef silinirken hata:", hata);
    return res.status(500).json({ mesaj: 'Beklenmedik bir sunucu hatası oluştu.' });
  }
};
