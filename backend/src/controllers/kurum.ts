import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { yeniKurumOlustur, kullaniciKurumlariniGetir } from '../services/kurum';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

/**
 * وحدة تحكم لإنشاء مؤسسة جديدة
 */
export const kurumOlustur = async (req: Request, res: Response) => {
  const hatalar = validationResult(req);
  if (!hatalar.isEmpty()) {
    return res.status(400).json({ hatalar: hatalar.array() });
  }

  try {
    // --- بداية التعديل الرئيسي ---
    // اقرأ 'sub' (subject) من التوكن، فهو يحتوي على معرف المستخدم
    const kullaniciId = req.kullanici.sub; 
    // --- نهاية التعديل الرئيسي ---

    // فحص أمان: تأكد من أن معرف المستخدم موجود بالفعل
    if (!kullaniciId) {
      return res.status(403).json({ mesaj: "Token geçersiz: Kullanıcı kimliği bulunamadı." });
    }

    const { name } = req.body;
    const slug = slugify(name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });

    const yeniKurum = await yeniKurumOlustur({ name, slug, olusturanId: kullaniciId });
    return res.status(201).json(yeniKurum);

  } catch (hata: any) {
    if (hata instanceof Prisma.PrismaClientKnownRequestError && hata.code === 'P2002') {
      return res.status(409).json({
        mesaj: 'Bu kurum adı veya slug zaten mevcut.',
      });
    }
    
    console.error("Hata sırasında kurum oluşturma:", hata.message);
    return res.status(400).json({ 
        mesaj: 'İstek işlenemedi. Lütfen kurum adını kontrol edin.',
        aciklama: 'Kurum adı geçersiz karakterler içeriyor olabilir.'
    });
  }
};

/**
 * وحدة تحكم لجلب قائمة المؤسسات الخاصة بالمستخدم الحالي فقط
 */
export const kurumlariListele = async (req: Request, res: Response) => {
  try {
    // --- بداية التعديل الرئيسي ---
    // اقرأ 'sub' (subject) من التوكن هنا أيضًا
    const kullaniciId = req.kullanici.sub;
    // --- نهاية التعديل الرئيسي ---

    if (!kullaniciId) {
      return res.status(403).json({ mesaj: "Token geçersiz: Kullanıcı kimliği bulunamadı." });
    }

    const kurumlar = await kullaniciKurumlariniGetir(kullaniciId);
    return res.status(200).json(kurumlar);
    
  } catch (hata) {
    console.error("Kurumlar listelenirken bir hata oluştu:", hata);
    return res.status(500).json({ mesaj: 'Kurumlar listelenirken bir sunucu hatası oluştu.' });
  }
};
