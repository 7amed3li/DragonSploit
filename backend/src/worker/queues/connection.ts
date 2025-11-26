import IORedis from 'ioredis';
import 'dotenv/config';

// نقوم بإنشاء اتصال Redis واحد فقط ونعيد استخدامه في جميع أنحاء التطبيق
// هذا يتبع أفضل الممارسات لتحسين الأداء.
export const redisConnection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false, // Disable ready check for faster connections
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  connectTimeout: 10000,
  // commandTimeout removed - no timeout limit to prevent "Command timed out" errors
  lazyConnect: false,
  enableOfflineQueue: false  // Fail fast if Redis is down
});
