import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
// (1) استيراد الدالة الجديدة وتغيير اسم الدالة القديمة
import { yeniKurumOlustur, kullaniciKurumlariniGetir } from '../services/kurum';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

/**
 * // وحدة تحكم لإنشاء مؤسسة جديدة
 * @param req - كائن الطلب
 * @param res - كائن الاستجابة
 */
export const kurumOlustur = async (req: Request, res: Response) => {
  const hatalar = validationResult(req);
  if (!hatalar.isEmpty()) {
    return res.status(400).json({ hatalar: hatalar.array() });
  }

  // استخراج معرف المستخدم من التوكن
  const kullaniciId = req.kullanici.id;

  const { name } = req.body;
  const slug = slugify(name, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });

  try {
    // تمرير 'kullaniciId' إلى دالة الخدمة
    const yeniKurum = await yeniKurumOlustur({ name, slug, olusturanId: kullaniciId });
    return res.status(201).json(yeniKurum);

  } catch (hata) {
    if (hata instanceof Prisma.PrismaClientKnownRequestError && hata.code === 'P2002') {
      return res.status(409).json({
        mesaj: 'Bu kurum adı zaten mevcut.',
        aciklama: `Oluşturulan kısa ad ('${slug}') zaten başka bir kurum tarafından kullanılıyor.`
      });
    }
    console.error("Beklenmedik sunucu hatası:", hata);
    return res.status(500).json({ mesaj: 'İşlem sırasında beklenmedik bir sunucu hatası oluştu.' });
  }
};

/**
 * // وحدة تحكم لجلب قائمة المؤسسات الخاصة بالمستخدم الحالي فقط
 * @param req - كائن الطلب
 * @param res - كائن الاستجابة
 */
export const kurumlariListele = async (req: Request, res: Response) => {
  try {
    // (2) استخراج معرف المستخدم من التوكن
    const kullaniciId = req.kullanici.id;

    // (3) استدعاء دالة الخدمة الجديدة وتمرير معرف المستخدم
    const kurumlar = await kullaniciKurumlariniGetir(kullaniciId);

    // إرسال استجابة ناجحة مع قائمة المؤسسات الخاصة بالمستخدم
    return res.status(200).json(kurumlar);

  } catch (hata) {
    // في حالة حدوث أي خطأ، أرسل خطأ خادم عام
    console.error("Kurumlar listelenirken bir hata oluştu:", hata); // <-- إضافة تسجيل للخطأ
    return res.status(500).json({ mesaj: 'Kurumlar listelenirken bir sunucu hatası oluştu.' });
  }
};
