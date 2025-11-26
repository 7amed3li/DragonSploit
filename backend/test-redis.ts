import IORedis from 'ioredis';
import 'dotenv/config';

async function testRedis() {
    console.log('Testing Redis connection...');
    console.log('REDIS_URL:', process.env.REDIS_URL || 'NOT SET');

    const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: null,
        connectTimeout: 5000
    });

    redis.on('connect', () => {
        console.log('✅ Connected to Redis successfully!');
    });

    redis.on('error', (err) => {
        console.error('❌ Redis connection error:', err.message);
        process.exit(1);
    });

    try {
        await redis.ping();
        console.log('✅ PING successful');
        await redis.quit();
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Redis test failed:', error.message);
        process.exit(1);
    }
}

testRedis();
