import { Router } from "express";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ok } from "../../utils/apiResponse";
import { productService } from "./product.service";
import { productListQuerySchema, slugParamSchema } from "./product.validators";

const router = Router();

// GET /api/v1/products?category=men&season=summer&isBestSeller=true&sort=price_asc
router.get(
  "/",
  validate({ query: productListQuerySchema }),
  asyncHandler(async (req, res) => {
    const filters = req.query as unknown as Parameters<typeof productService.list>[0];
    const { items, meta } = await productService.list(filters);
    ok(res, items, meta);
  })
);

// GET /api/v1/products/custom-boxes  (curated tester-box templates)
router.get(
  "/custom-boxes",
  asyncHandler(async (_req, res) => {
    const templates = await productService.listCustomBoxTemplates();
    ok(res, templates);
  })
);

// GET /api/v1/products/:slug
router.get(
  "/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(async (req, res) => {
    const product = await productService.getBySlug(req.params.slug);
    ok(res, product);
  })
);

export default router;
