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
 * // Middleware للتحقق من صحة توكن JWT
 * @param req - كائن الطلب
 * @param res - كائن الاستجابة
 * @param next - دالة للانتقال إلى الـ Middleware التالي أو وحدة التحكم
 */
export const kimlikDoğrula = (req: Request, res: Response, next: NextFunction) => {
  // استخراج التوكن من الهيدر 'Authorization'
  // الشكل المتوقع: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // استخراج الجزء الثاني بعد "Bearer "

  // إذا لم يتم توفير التوكن
  if (token == null) {
    return res.status(401).json({ mesaj: 'Yetkisiz: Erişim tokeni gerekli.' }); // Unauthorized
  }

  // التحقق من صحة التوكن
  jwt.verify(token, process.env.JWT_SECRET || 'varsayilan_super_gizli_anahtar', (err: any, kullanici: any) => {
    // إذا كان التوكن غير صالح (منتهي الصلاحية، تالف، إلخ)
    if (err) {
      return res.status(403).json({ mesaj: 'Yasak: Geçersiz veya süresi dolmuş token.' }); // Forbidden
    }

    // إذا كان التوكن صالحًا، قم بتخزين بيانات المستخدم في كائن الطلب
    req.kullanici = kullanici;

    // اسمح للطلب بالمرور إلى وجهته التالية
    next();
  });
};
