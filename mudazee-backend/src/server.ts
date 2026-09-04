import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";

async function main() {
  const app = createApp();

  const server = app.listen(env.port, () => {
    console.log(`[mudazee-api] listening on port ${env.port} (${env.nodeEnv})`);
    console.log(`[mudazee-api] routes mounted under ${env.apiPrefix}`);
  });

  async function shutdown(signal: string) {
    console.log(`[mudazee-api] received ${signal}, shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      redis.disconnect();
      process.exit(0);
    });
    // Force-exit if graceful shutdown hangs
    setTimeout(() => process.exit(1), 10_000).unref();
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error("[mudazee-api] fatal startup error:", err);
  process.exit(1);
});
