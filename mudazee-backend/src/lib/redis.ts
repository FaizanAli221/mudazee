import Redis from "ioredis";
import { env } from "../config/env";

export const redis = new Redis(env.redisUrl, {
  maxRetriesPerRequest: 3,
  lazyConnect: false,
});

redis.on("error", (err) => {
  console.error("[redis] connection error:", err.message);
});

/** Cart TTL: guest carts expire after 14 days of inactivity. */
export const GUEST_CART_TTL_SECONDS = 60 * 60 * 24 * 14;

export function cartRedisKey(guestToken: string): string {
  return `cart:guest:${guestToken}`;
}
