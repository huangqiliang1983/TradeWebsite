import { serverEnv } from "@/lib/env";
import { getRedisClient } from "@/lib/redis";

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  reason?: "limit" | "unavailable";
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function checkMemoryRateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      resetAt,
    };
  }

  current.count += 1;
  buckets.set(key, current);

  if (current.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
      reason: "limit",
    };
  }

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
  };
}

export async function checkRateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const resetAt = windowStart + windowMs;
  const redisKey = `${serverEnv.REDIS_PREFIX}rate-limit:${key}:${windowStart}`;

  const client = await getRedisClient();

  if (!client) {
    if (!serverEnv.isProduction) {
      return checkMemoryRateLimit({ key, limit, windowMs });
    }

    return {
      allowed: false,
      remaining: 0,
      resetAt,
      reason: "unavailable",
    };
  }

  try {
    const currentCount = await client.incr(redisKey);

    if (currentCount === 1) {
      await client.pExpire(redisKey, Math.max(resetAt - now, 1));
    }

    if (currentCount > limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        reason: "limit",
      };
    }

    return {
      allowed: true,
      remaining: Math.max(limit - currentCount, 0),
      resetAt,
    };
  } catch {
    if (!serverEnv.isProduction) {
      return checkMemoryRateLimit({ key, limit, windowMs });
    }

    return {
      allowed: false,
      remaining: 0,
      resetAt,
      reason: "unavailable",
    };
  }
}
