import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/errors";

export const bannerService = {
  async listAll() {
    return prisma.promotionalBanner.findMany({ orderBy: { position: "asc" } });
  },

  async listActive() {
    const now = new Date();
    return prisma.promotionalBanner.findMany({
      where: {
        isActive: true,
        OR: [{ startsAt: null }, { startsAt: { lte: now } }],
        AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
      },
      orderBy: { position: "asc" },
    });
  },

  async getById(id: string) {
    const banner = await prisma.promotionalBanner.findUnique({ where: { id } });
    if (!banner) throw AppError.notFound("Banner not found");
    return banner;
  },

  async create(data: Prisma.PromotionalBannerCreateInput) {
    return prisma.promotionalBanner.create({ data });
  },

  async update(id: string, data: Prisma.PromotionalBannerUpdateInput) {
    await this.getById(id);
    return prisma.promotionalBanner.update({ where: { id }, data });
  },

  async remove(id: string) {
    await this.getById(id);
    return prisma.promotionalBanner.delete({ where: { id } });
  },
};
