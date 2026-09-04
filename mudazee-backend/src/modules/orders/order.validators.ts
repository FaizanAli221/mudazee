import { z } from "zod";

const orderItemInputSchema = z.object({
  productId: z.string().min(1).optional(),
  customBoxTemplateId: z.string().min(1).optional(),
  customBoxSelections: z.array(z.string().min(1)).optional(),
  quantity: z.number().int().min(1).max(20),
}).refine((item) => Boolean(item.productId) !== Boolean(item.customBoxTemplateId), {
  message: "Provide exactly one of productId or customBoxTemplateId",
});

const shippingAddressSchema = z.object({
  fullName: z.string().min(2).max(120),
  line1: z.string().min(3).max(200),
  line2: z.string().max(200).optional(),
  city: z.string().min(2).max(80),
  postalCode: z.string().max(20).optional(),
  phone: z.string().min(7).max(20),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemInputSchema).min(1),
  paymentMethod: z.enum(["COD", "STRIPE", "JAZZCASH", "EASYPAISA", "PAYFAST"]),
  shippingAddress: shippingAddressSchema,
  voucherCode: z.string().min(1).optional(),
  // Required only for guest checkout; ignored if the request is authenticated.
  guestEmail: z.string().email().optional(),
  guestPhone: z.string().min(7).max(20).optional(),
});

export const trackingIdParamSchema = z.object({
  trackingId: z.string().min(6),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export const orderListQuerySchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
