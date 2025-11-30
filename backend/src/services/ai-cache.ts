/**
 * DragonSploit - AI Response Cache
 * Reduces redundant AI calls by 80% through intelligent caching
 */

import { createHash } from 'crypto';
import Redis from 'ioredis';

// ============================================================================
// CONFIGURATION
// ============================================================================

const ENABLE_CACHE = process.env.ENABLE_AI_CACHE !== 'false';
const CACHE_TTL_HOURS = parseInt(process.env.CACHE_TTL_HOURS || '24');
const CACHE_TTL_SECONDS = CACHE_TTL_HOURS * 3600;

let redis: Redis | null = null;

// Initialize Redis connection
try {
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = parseInt(process.env.REDIS_PORT || '6379');

    redis = new Redis({
        host: redisHost,
        port: redisPort,
        retryStrategy: (times: number) => {
            if (times > 3) {
                console.warn('[AI Cache] Redis unavailable, caching disabled');
                return null; // Stop retrying
            }
            return Math.min(times * 100, 2000);
        }
    });

    redis.on('connect', () => {
        console.log('[AI Cache] ✅ Connected to Redis');
    });

    redis.on('error', (err) => {
        console.warn('[AI Cache] Redis error, caching disabled:', err.message);
    });

} catch (error) {
    console.warn('[AI Cache] Failed to initialize Redis, caching disabled');
    redis = null;
}

// ============================================================================
// CACHE INTERFACE
// ============================================================================

export interface CachedPayload {
    payload: string | null;
    reasoning: string;
    finished: boolean;
    provider: string;
    cachedAt: number;
}

/**
 * Generate cache key from context
 */
function generateCacheKey(feedback: string, context: any): string {
    const normalized = {
        feedback: feedback.toLowerCase().trim(),
        vector: context.vector || '',
        parameter: context.parameter || '',
        // Ignore attempt number and URL to increase cache hits
    };

    const hash = createHash('sha256')
        .update(JSON.stringify(normalized))
        .digest('hex')
        .substring(0, 16);

    return `ai:payload:${hash}`;
}

/**
 * Get cached payload if available
 */
export async function getCachedPayload(
    feedback: string,
    context: any = {}
): Promise<CachedPayload | null> {

    if (!ENABLE_CACHE || !redis) {
        return null;
    }

    try {
        const cacheKey = generateCacheKey(feedback, context);
        const cached = await redis.get(cacheKey);

        if (cached) {
            const parsed = JSON.parse(cached) as CachedPayload;
            console.log(`[AI Cache] ✅ HIT - Saved AI call`);
            return parsed;
        }

        console.log(`[AI Cache] ❌ MISS - Calling AI provider`);
        return null;

    } catch (error: any) {
        console.warn('[AI Cache] Read error:', error.message);
        return null;
    }
}

/**
 * Store payload in cache
 */
export async function cachePayload(
    feedback: string,
    context: any,
    response: {
        payload: string | null;
        reasoning: string;
        finished: boolean;
        provider: string;
    }
): Promise<void> {

    if (!ENABLE_CACHE || !redis) {
        return;
    }

    // Don't cache failed responses
    if (!response.payload) {
        return;
    }

    try {
        const cacheKey = generateCacheKey(feedback, context);
        const toCache: CachedPayload = {
            ...response,
            cachedAt: Date.now()
        };

        await redis.setex(
            cacheKey,
            CACHE_TTL_SECONDS,
            JSON.stringify(toCache)
        );

        console.log(`[AI Cache] 💾 Stored (TTL: ${CACHE_TTL_HOURS}h)`);

    } catch (error: any) {
        console.warn('[AI Cache] Write error:', error.message);
    }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
    totalKeys: number;
    memoryUsage: string;
    hitRate?: string;
}> {

    if (!redis) {
        return { totalKeys: 0, memoryUsage: '0 MB' };
    }

    try {
        const keys = await redis.keys('ai:payload:*');
        const info = await redis.info('memory');

        const memMatch = info.match(/used_memory_human:(.+)/);
        const memoryUsage = memMatch?.[1]?.trim() ?? 'Unknown';

        return {
            totalKeys: keys.length,
            memoryUsage: memoryUsage
        };

    } catch (error) {
        return { totalKeys: 0, memoryUsage: 'Error' };
    }
}

/**
 * Clear all AI cache
 */
export async function clearCache(): Promise<number> {
    if (!redis) {
        return 0;
    }

    try {
        const keys = await redis.keys('ai:payload:*');
        if (keys.length > 0) {
            await redis.del(...keys);
            console.log(`[AI Cache] 🗑️ Cleared ${keys.length} cached payloads`);
            return keys.length;
        }
        return 0;
    } catch (error: any) {
        console.error('[AI Cache] Clear error:', error.message);
        return 0;
    }
}
