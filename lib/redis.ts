import "server-only";

import { createClient } from "redis";

import { serverEnv } from "@/lib/env";

type RedisClient = ReturnType<typeof createClient>;

let redisClientPromise: Promise<RedisClient | null> | null = null;

async function createRedisClient() {
  if (!serverEnv.REDIS_URL) {
    return null;
  }

  const client = createClient({
    url: serverEnv.REDIS_URL,
  });

  client.on("error", () => {
    // Swallow connection noise here so writes can return safe messages upstream.
  });

  await client.connect();
  return client;
}

export async function getRedisClient() {
  if (!redisClientPromise) {
    redisClientPromise = createRedisClient().catch(() => null);
  }

  return redisClientPromise;
}
