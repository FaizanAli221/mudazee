import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ok } from "../../utils/apiResponse";
import { storeService } from "./store.service";

const router = Router();

// GET /api/v1/stores — active branches only
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const stores = await storeService.listActive();
    ok(res, stores);
  })
);

export default router;
