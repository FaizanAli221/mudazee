import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "../lib/redis";

/**
 * Redis-backed rate limiter so limits are enforced consistently across
 * multiple API instances (not per-process, in-memory).
 */
function buildLimiter(windowMs: number, max: number, prefix: string) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      // @ts-expect-error - ioredis call signature is compatible at runtime
      sendCommand: (...args: string[]) => redis.call(...args),
      prefix,
    }),
    message: {
      success: false,
      error: { code: "TOO_MANY_REQUESTS", message: "Too many requests, please slow down" },
    },
  });
}

/** General public API limiter: 300 requests / 15 min per IP. */
export const publicApiLimiter = buildLimiter(15 * 60 * 1000, 300, "rl:public:");

/** Stricter limiter for auth endpoints to slow down credential stuffing. */
export const authLimiter = buildLimiter(15 * 60 * 1000, 20, "rl:auth:");

/** Order creation limiter to blunt checkout abuse / stock-lock spam. */
export const orderLimiter = buildLimiter(60 * 1000, 10, "rl:order:");
