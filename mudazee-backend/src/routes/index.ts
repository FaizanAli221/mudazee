import { Router } from "express";
import { publicApiLimiter } from "../middleware/rateLimiter";

import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/products/product.routes";
import storeRoutes from "../modules/stores/store.routes";
import cartRoutes from "../modules/cart/cart.routes";
import orderRoutes from "../modules/orders/order.routes";
import newsletterRoutes from "../modules/newsletter/newsletter.routes";
import adminRoutes from "../modules/admin/admin.routes";

const router = Router();

router.use(publicApiLimiter);

router.get("/health", (_req, res) => res.json({ success: true, status: "ok" }));

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/stores", storeRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/admin", adminRoutes);

export default router;
