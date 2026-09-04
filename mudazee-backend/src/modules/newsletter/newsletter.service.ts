import { prisma } from "../../lib/prisma";

export const newsletterService = {
  async subscribe(email: string) {
    return prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { isActive: true },
      create: { email },
    });
  },

  async unsubscribe(email: string) {
    return prisma.newsletterSubscriber.updateMany({
      where: { email },
      data: { isActive: false },
    });
  },

  async listActive(page: number, pageSize: number) {
    const [items, total] = await prisma.$transaction([
      prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
        orderBy: { subscribedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    ]);
    return { items, meta: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) } };
  },
};
