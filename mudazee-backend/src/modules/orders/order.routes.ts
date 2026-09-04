import { Router } from "express";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../middleware/asyncHandler";
import { optionalAuthenticate, authenticate } from "../../middleware/auth";
import { orderLimiter } from "../../middleware/rateLimiter";
import { ok, created } from "../../utils/apiResponse";
import { orderService } from "./order.service";
import {
  createOrderSchema,
  trackingIdParamSchema,
  orderListQuerySchema,
} from "./order.validators";

const router = Router();

// POST /api/v1/orders — supports both guest and authenticated checkout
router.post(
  "/",
  orderLimiter,
  optionalAuthenticate,
  validate({ body: createOrderSchema }),
  asyncHandler(async (req, res) => {
    const order = await orderService.createOrder({
      ...req.body,
      userId: req.user?.sub,
    });
    created(res, order);
  })
);

// GET /api/v1/orders/track/:trackingId — public order tracking, no auth
router.get(
  "/track/:trackingId",
  validate({ params: trackingIdParamSchema }),
  asyncHandler(async (req, res) => {
    const order = await orderService.trackByTrackingId(req.params.trackingId);
    ok(res, order);
  })
);

// GET /api/v1/orders — the authenticated customer's own order history
router.get(
  "/",
  authenticate,
  validate({ query: orderListQuerySchema }),
  asyncHandler(async (req, res) => {
    const { page, pageSize } = req.query as unknown as { page: number; pageSize: number };
    const { items, meta } = await orderService.listForUser(req.user!.sub, page, pageSize);
    ok(res, items, meta);
  })
);

export default router;
