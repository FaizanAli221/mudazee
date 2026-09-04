import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../middleware/asyncHandler";
import { authenticate, authorize } from "../../middleware/auth";
import { ok, created } from "../../utils/apiResponse";
import { slugify } from "../../utils/slugify";

import { productService } from "../products/product.service";
import {
  createProductSchema,
  updateProductSchema,
  idParamSchema as productIdParamSchema,
} from "../products/product.validators";

import { storeService } from "../stores/store.service";
import {
  createStoreSchema,
  updateStoreSchema,
  idParamSchema as storeIdParamSchema,
} from "../stores/store.validators";

import { orderService } from "../orders/order.service";
import { orderListQuerySchema, updateOrderStatusSchema } from "../orders/order.validators";

import { bannerService } from "./banner.service";

const router = Router();

// Every route below requires an authenticated ADMIN.
router.use(authenticate, authorize("ADMIN"));

const idParamSchema = z.object({ id: z.string().min(1) });

/* ---------------------------- Products CRUD ---------------------------- */

router.get(
  "/products/:id",
  validate({ params: productIdParamSchema }),
  asyncHandler(async (req, res) => {
    ok(res, await productService.getById(req.params.id));
  })
);

router.post(
  "/products",
  validate({ body: createProductSchema }),
  asyncHandler(async (req, res) => {
    const { title, ...rest } = req.body;
    const product = await productService.create({
      ...rest,
      title,
      slug: slugify(title),
    });
    created(res, product);
  })
);

router.patch(
  "/products/:id",
  validate({ params: productIdParamSchema, body: updateProductSchema }),
  asyncHandler(async (req, res) => {
    const data = { ...req.body };
    if (data.title) data.slug = slugify(data.title);
    const product = await productService.update(req.params.id, data);
    ok(res, product);
  })
);

router.delete(
  "/products/:id",
  validate({ params: productIdParamSchema }),
  asyncHandler(async (req, res) => {
    await productService.remove(req.params.id);
    ok(res, { deleted: true });
  })
);

/* ------------------------------ Orders CMS ------------------------------ */

router.get(
  "/orders",
  validate({ query: orderListQuerySchema }),
  asyncHandler(async (req, res) => {
    const { status, page, pageSize } = req.query as unknown as {
      status?: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
      page: number;
      pageSize: number;
    };
    const { items, meta } = await orderService.listAll({ status, page, pageSize });
    ok(res, items, meta);
  })
);

router.get(
  "/orders/:id",
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
    ok(res, await orderService.getById(req.params.id));
  })
);

// PATCH /api/v1/admin/orders/:id/status
router.patch(
  "/orders/:id/status",
  validate({ params: idParamSchema, body: updateOrderStatusSchema }),
  asyncHandler(async (req, res) => {
    const order = await orderService.updateStatus(req.params.id, req.body.status);
    ok(res, order);
  })
);

/* ------------------------------ Stores CRUD ------------------------------ */

router.get(
  "/stores",
  asyncHandler(async (_req, res) => {
    ok(res, await storeService.listAll());
  })
);

router.post(
  "/stores",
  validate({ body: createStoreSchema }),
  asyncHandler(async (req, res) => {
    created(res, await storeService.create(req.body));
  })
);

router.patch(
  "/stores/:id",
  validate({ params: storeIdParamSchema, body: updateStoreSchema }),
  asyncHandler(async (req, res) => {
    ok(res, await storeService.update(req.params.id, req.body));
  })
);

router.delete(
  "/stores/:id",
  validate({ params: storeIdParamSchema }),
  asyncHandler(async (req, res) => {
    await storeService.remove(req.params.id);
    ok(res, { deleted: true });
  })
);

/* --------------------------- Promotional Banners -------------------------- */

const bannerSchema = z.object({
  title: z.string().min(2).max(150),
  subtitle: z.string().max(200).optional(),
  imageUrl: z.string().url(),
  ctaText: z.string().max(50).optional(),
  ctaUrl: z.string().url().optional(),
  position: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
});

router.get(
  "/banners",
  asyncHandler(async (_req, res) => {
    ok(res, await bannerService.listAll());
  })
);

router.post(
  "/banners",
  validate({ body: bannerSchema }),
  asyncHandler(async (req, res) => {
    created(res, await bannerService.create(req.body));
  })
);

router.patch(
  "/banners/:id",
  validate({ params: idParamSchema, body: bannerSchema.partial() }),
  asyncHandler(async (req, res) => {
    ok(res, await bannerService.update(req.params.id, req.body));
  })
);

router.delete(
  "/banners/:id",
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
    await bannerService.remove(req.params.id);
    ok(res, { deleted: true });
  })
);

export default router;
