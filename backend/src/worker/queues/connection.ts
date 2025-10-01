import IORedis from 'ioredis';
import 'dotenv/config';

// نقوم بإنشاء اتصال Redis واحد فقط ونعيد استخدامه في جميع أنحاء التطبيق
// هذا يتبع أفضل الممارسات لتحسين الأداء.
export const redisConnection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null // يمنع BullMQ من التوقف عن محاولة الاتصال
});
