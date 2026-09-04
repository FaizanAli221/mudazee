import { Router } from "express";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../middleware/asyncHandler";
import { publicApiLimiter } from "../../middleware/rateLimiter";
import { created } from "../../utils/apiResponse";
import { newsletterService } from "./newsletter.service";
import { subscribeSchema } from "./newsletter.validators";

const router = Router();

// POST /api/v1/newsletter/subscribe
router.post(
  "/subscribe",
  publicApiLimiter,
  validate({ body: subscribeSchema }),
  asyncHandler(async (req, res) => {
    const subscriber = await newsletterService.subscribe(req.body.email);
    created(res, { email: subscriber.email, subscribedAt: subscriber.subscribedAt });
  })
);

export default router;
