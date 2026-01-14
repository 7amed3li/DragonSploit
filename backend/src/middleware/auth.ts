import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// توسيع واجهة الطلب (Request) في Express لإضافة خاصية 'kullanici'
// هذا يسمح لنا بتخزين بيانات المستخدم من التوكن في الطلب نفسه
declare global {
  namespace Express {
    interface Request {
      kullanici?: any; // يمكنك استخدام واجهة أكثر تحديدًا بدلاً من 'any'
    }
  }
}

/**
 * Middleware للتحقق من صحة توكن JWT
 * @param req - كائن الطلب
 * @param res - كائن الاستجابة
 * @param next - دالة للانتقال إلى الـ Middleware التالي أو وحدة التحكم
 */
export const kimlikDoğrula = (req: Request, res: Response, next: NextFunction) => {
  // استخراج التوكن من الهيدر 'Authorization'
  // الشكل المتوقع: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // إذا لم يتم توفير التوكن
  if (token == null) {
    return res.status(401).json({ mesaj: 'Yetkisiz: Erişim tokeni gerekli.' }); // Unauthorized
  }

  // --- بداية التعديل الرئيسي ---

  // 1. اقرأ المفتاح السري الصحيح من متغيرات البيئة
  const secret = process.env.JWT_ACCESS_SECRET;

  // 2. تحقق من أن المفتاح السري موجود بالفعل
  if (!secret) {
    // هذا خطأ فادح في إعدادات الخادم ويجب أن يوقف العملية
    console.error("FATAL ERROR: JWT_ACCESS_SECRET is not defined in the .env file.");
    return res.status(500).json({ mesaj: "خطأ في إعدادات الخادم: مفتاح المصادقة غير موجود." });
  }

  // 3. التحقق من صحة التوكن باستخدام المفتاح السري الصحيح
  jwt.verify(token, secret, (err: any, kullanici: any) => {
    // إذا كان التوكن غير صالح (منتهي الصلاحية، تالف، إلخ)
    if (err) {
      // يمكنك إبقاء هذا السطر مؤقتًا لتصحيح الأخطاء
      console.error('JWT Verify Error:', err.message); 
      return res.status(403).json({ mesaj: 'Yasak: Geçersiz veya süresi dolmuş token.' }); // Forbidden
    }

    // إذا كان التوكن صالحًا، قم بتخزين بيانات المستخدم في كائن الطلب
    req.kullanici = kullanici;

    // اسمح للطلب بالمرور إلى وجهته التالية
    next();
  });
  // --- نهاية التعديل الرئيسي ---
};
