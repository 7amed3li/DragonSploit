// clear-queue.ts
import { Queue } from 'bullmq';

// ⚠️ تأكد من تطابق تفاصيل الاتصال هذه مع إعداد Redis في مشروعك (عادةً localhost:6379)
const connection = { 
    host: 'localhost', 
    port: 6379 
}; 

// يجب أن يتطابق هذا الاسم مع اسم قائمة انتظار المسح الرئيسية في مشروعك
const queueName = 'scanQueue'; 

async function clearQueue() {
  const queue = new Queue(queueName, { connection });
  
  try {
    // استخدم 'obliterate' لإزالة جميع المهام من جميع حالات قائمة الانتظار (pending, active, completed, failed)
    await queue.obliterate({ force: true });
    console.log(`✅ قائمة الانتظار "${queueName}" تم مسحها بنجاح. جميع المهام حُذفت.`);
  } catch (err) {
    console.error(`❌ فشل مسح قائمة الانتظار "${queueName}". قد تحتاج للتأكد من تشغيل Redis.`, err);
  } finally {
    // تأكد من إغلاق الاتصال
    await queue.close();
    process.exit(0);
  }
}

clearQueue();