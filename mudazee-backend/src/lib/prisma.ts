import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

// Reuse a single PrismaClient instance across hot reloads in dev.
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: env.isProduction ? ["error", "warn"] : ["error", "warn", "query"],
  });

if (!env.isProduction) {
  global.__prisma = prisma;
}
