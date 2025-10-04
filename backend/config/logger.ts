// src/config/logger.ts

import winston from 'winston';

// 1. تحديد مستويات الأولوية للسجلات (من الأعلى للأدنى)
const levels = {
  error: 0, // الأخطاء الفادحة التي توقف شيئًا ما
  warn: 1,  // تحذيرات، أشياء قد تسبب مشاكل
  info: 2,  // معلومات عامة عن سير عمل التطبيق
  http: 3,  // سجلات خاصة بطلبات HTTP
  debug: 4, // معلومات تفصيلية للمساعدة في تصحيح الأخطاء
};

// 2. تحديد الألوان لكل مستوى (لجعل الطرفية سهلة القراءة )
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};

// 3. إضافة الألوان إلى Winston
winston.addColors(colors );

// 4. تحديد شكل (Format) السجل
// كيف سيبدو كل سطر يتم تسجيله
const format = winston.format.combine(
  // أضف طابعًا زمنيًا لكل سجل
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // أضف الألوان التي حددناها
  winston.format.colorize({ all: true }),
  // تحديد الشكل النهائي للطباعة
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// 5. تحديد وجهات (Transports) السجلات
// أين سيتم كتابة هذه السجلات؟
const transports = [
  // الوجهة الأولى: الطرفية (Console)
  // ستظهر السجلات مباشرة في نافذة الأوامر أثناء التطوير
  new winston.transports.Console(),

  // الوجهة الثانية: ملف للأخطاء فقط
  // مفيد جدًا للعثور على الأخطاء بسرعة في بيئة الإنتاج
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error', // سجل فقط الأخطاء هنا
  }),

  // الوجهة الثالثة: ملف لجميع السجلات
  // يحتوي على كل شيء، مفيد للتحليل الكامل لما حدث
  new winston.transports.File({ filename: 'logs/all.log' }),
];

// 6. إنشاء كائن الـ Logger النهائي
const logger = winston.createLogger({
  // تحديد أدنى مستوى للسجلات التي سيتم عرضها (debug هو الأدنى، لذا سيعرض كل شيء)
  level: 'debug',
  levels,
  format,
  transports,
});

export default logger;
