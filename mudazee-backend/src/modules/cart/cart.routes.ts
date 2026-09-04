import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../middleware/asyncHandler";
import { authenticate } from "../../middleware/auth";
import { ok } from "../../utils/apiResponse";
import { cartService } from "./cart.service";
import { addCartItemSchema, syncCartSchema, updateCartItemSchema } from "./cart.validators";

const router = Router();

// All cart mutation routes require an authenticated user; the guest cart
// itself is expected to be held client-side (e.g. localStorage) and is
// merged into the server-side cart via POST /cart/sync at login time.

router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const cart = await cartService.getOrCreateForUser(req.user!.sub);
    ok(res, cart);
  })
);

// POST /api/v1/cart/sync — merge guest cart on login
router.post(
  "/sync",
  authenticate,
  validate({ body: syncCartSchema }),
  asyncHandler(async (req, res) => {
    const cart = await cartService.syncGuestCart(req.user!.sub, req.body.items);
    ok(res, cart);
  })
);

router.post(
  "/items",
  authenticate,
  validate({ body: addCartItemSchema }),
  asyncHandler(async (req, res) => {
    const cart = await cartService.addItem(req.user!.sub, req.body);
    ok(res, cart);
  })
);

router.patch(
  "/items/:itemId",
  authenticate,
  validate({ body: updateCartItemSchema, params: z.object({ itemId: z.string().min(1) }) }),
  asyncHandler(async (req, res) => {
    const cart = await cartService.updateItemQuantity(req.user!.sub, req.params.itemId, req.body.quantity);
    ok(res, cart);
  })
);

router.delete(
  "/items/:itemId",
  authenticate,
  validate({ params: z.object({ itemId: z.string().min(1) }) }),
  asyncHandler(async (req, res) => {
    const cart = await cartService.removeItem(req.user!.sub, req.params.itemId);
    ok(res, cart);
  })
);

export default router;
