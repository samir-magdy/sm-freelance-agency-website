import { ipAddress } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { redis } from "@/lib/redis";

// Shared fixed-window rate limiter for every submission endpoint (quote
// form, contact form, ...). Fails open if Redis is unavailable so a
// misconfigured env never blocks real submissions.
export async function isRateLimited(
  request: NextRequest,
  key: string,
  { max, windowSeconds }: { max: number; windowSeconds: number },
): Promise<boolean> {
  try {
    if (!redis) return false;
    const userIdentifier = ipAddress(request);
    if (!userIdentifier) return false;
    const redisKey = `rate-limit:${key}:${userIdentifier}`;
    const count = await redis.incr(redisKey);
    if (count === 1) await redis.expire(redisKey, windowSeconds);
    return count > max;
  } catch {
    // Redis unavailable — skip rate limiting so the form still works
    return false;
  }
}
