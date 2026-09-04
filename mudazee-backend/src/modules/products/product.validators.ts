import { z } from "zod";

export const productListQuerySchema = z.object({
  category: z.enum(["men", "women", "unisex"]).optional(),
  season: z.enum(["summer", "winter", "spring", "fall"]).optional(),
  fragranceType: z.enum(["tester", "full_bottle", "custom_box"]).optional(),
  isNewArrival: z.coerce.boolean().optional(),
  isBestSeller: z.coerce.boolean().optional(),
  isSoldOut: z.coerce.boolean().optional(),
  impressionOf: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  sort: z.enum(["price_asc", "price_desc", "newest", "rating", "best_selling"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1),
});

export const idParamSchema = z.object({
  id: z.string().min(1),
});

const genderCategoryEnum = z.enum(["MEN", "WOMEN", "UNISEX"]);
const seasonEnum = z.enum(["SUMMER", "WINTER", "SPRING", "FALL", "ALL_SEASON"]);
const fragranceTypeEnum = z.enum(["TESTER", "FULL_BOTTLE", "CUSTOM_BOX"]);

export const createProductSchema = z.object({
  title: z.string().min(2).max(150),
  sku: z.string().min(2).max(50),
  description: z.string().min(10),
  originalPrice: z.number().positive(),
  salePrice: z.number().positive().optional(),
  stockQuantity: z.number().int().min(0).default(0),
  images: z.array(z.string().url()).min(1),
  impressionOf: z.string().max(150).optional(),
  genderCategory: genderCategoryEnum.default("UNISEX"),
  season: seasonEnum.default("ALL_SEASON"),
  fragranceType: fragranceTypeEnum.default("FULL_BOTTLE"),
  isNewArrival: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();
