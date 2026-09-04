import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/errors";

export interface ProductListFilters {
  category?: "men" | "women" | "unisex";
  season?: "summer" | "winter" | "spring" | "fall";
  fragranceType?: "tester" | "full_bottle" | "custom_box";
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isSoldOut?: boolean;
  impressionOf?: string;
  search?: string;
  sort?: "price_asc" | "price_desc" | "newest" | "rating" | "best_selling";
  page: number;
  pageSize: number;
}

function buildWhere(filters: ProductListFilters): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = { isActive: true };

  if (filters.category) where.genderCategory = filters.category.toUpperCase() as any;
  if (filters.season) where.season = filters.season.toUpperCase() as any;
  if (filters.fragranceType) where.fragranceType = filters.fragranceType.toUpperCase() as any;
  if (filters.isNewArrival !== undefined) where.isNewArrival = filters.isNewArrival;
  if (filters.isBestSeller !== undefined) where.isBestSeller = filters.isBestSeller;
  if (filters.isSoldOut !== undefined) where.isSoldOut = filters.isSoldOut;
  if (filters.impressionOf) {
    where.impressionOf = { contains: filters.impressionOf, mode: "insensitive" };
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { impressionOf: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  return where;
}

function buildOrderBy(sort?: ProductListFilters["sort"]): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case "price_asc":
      return { salePrice: "asc" };
    case "price_desc":
      return { salePrice: "desc" };
    case "rating":
      return { ratingAvg: "desc" };
    case "best_selling":
      return { reviewCount: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}

export const productService = {
  async list(filters: ProductListFilters) {
    const where = buildWhere(filters);
    const orderBy = buildOrderBy(filters.sort);
    const skip = (filters.page - 1) * filters.pageSize;

    const [items, total] = await prisma.$transaction([
      prisma.product.findMany({ where, orderBy, skip, take: filters.pageSize }),
      prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: {
        page: filters.page,
        pageSize: filters.pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / filters.pageSize)),
      },
    };
  },

  async getBySlug(slug: string) {
    const product = await prisma.product.findFirst({ where: { slug, isActive: true } });
    if (!product) throw AppError.notFound("Product not found");
    return product;
  },

  async getById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw AppError.notFound("Product not found");
    return product;
  },

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data });
  },

  async update(id: string, data: Prisma.ProductUpdateInput) {
    await this.getById(id);
    return prisma.product.update({ where: { id }, data });
  },

  async remove(id: string) {
    await this.getById(id);
    // Soft delete: keep historical order references intact.
    return prisma.product.update({ where: { id }, data: { isActive: false } });
  },

  async listCustomBoxTemplates() {
    return prisma.customBoxTemplate.findMany({
      where: { isActive: true },
      include: { options: { include: { product: true } } },
    });
  },
};
