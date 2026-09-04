import dotenv from "dotenv";

dotenv.config();

function required(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT ?? 4000),
  apiPrefix: process.env.API_PREFIX ?? "/api/v1",

  databaseUrl: required("DATABASE_URL"),
  redisUrl: required("REDIS_URL", "redis://localhost:6379"),

  jwt: {
    accessSecret: required("JWT_ACCESS_SECRET"),
    refreshSecret: required("JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d",
  },

  corsOrigin: process.env.CORS_ORIGIN ?? "*",

  payments: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
    jazzcashMerchantId: process.env.JAZZCASH_MERCHANT_ID ?? "",
    jazzcashPassword: process.env.JAZZCASH_PASSWORD ?? "",
    easypaisaStoreId: process.env.EASYPAISA_STORE_ID ?? "",
    payfastMerchantId: process.env.PAYFAST_MERCHANT_ID ?? "",
  },
};
