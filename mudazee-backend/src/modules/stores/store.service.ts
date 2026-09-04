import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/errors";

export const storeService = {
  async listActive() {
    return prisma.store.findMany({ where: { isActive: true }, orderBy: { branchName: "asc" } });
  },

  async listAll() {
    return prisma.store.findMany({ orderBy: { branchName: "asc" } });
  },

  async getById(id: string) {
    const store = await prisma.store.findUnique({ where: { id } });
    if (!store) throw AppError.notFound("Store not found");
    return store;
  },

  async create(data: Prisma.StoreCreateInput) {
    return prisma.store.create({ data });
  },

  async update(id: string, data: Prisma.StoreUpdateInput) {
    await this.getById(id);
    return prisma.store.update({ where: { id }, data });
  },

  async remove(id: string) {
    await this.getById(id);
    return prisma.store.delete({ where: { id } });
  },
};
