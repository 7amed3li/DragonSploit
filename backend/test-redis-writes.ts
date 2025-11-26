import IORedis from 'ioredis';
import 'dotenv/config';

async function testRedisWrites() {
    console.log('Testing Redis SET/GET operations...');

    const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
        connectTimeout: 5000,
        commandTimeout: 5000
    });

    try {
        // Test PING
        console.log('1. Testing PING...');
        await redis.ping();
        console.log('✅ PING successful');

        // Test SET
        console.log('2. Testing SET...');
        await redis.set('test:key', 'test:value');
        console.log('✅ SET successful');

        // Test GET
        console.log('3. Testing GET...');
        const value = await redis.get('test:key');
        console.log('✅ GET successful, value:', value);

        // Test with expiry
        console.log('4. Testing SETEX...');
        await redis.setex('test:key2', 60, 'expires_in_60s');
        console.log('✅ SETEX successful');

        await redis.quit();
        console.log('\n✅ All Redis operations successful!');
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Redis operation failed:', error.message);
        process.exit(1);
    }
}

testRedisWrites();
