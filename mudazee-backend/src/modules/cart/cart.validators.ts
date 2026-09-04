import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string().min(1).optional(),
  customBoxTemplateId: z.string().min(1).optional(),
  customBoxSelections: z.array(z.string().min(1)).optional(),
  quantity: z.number().int().min(1).max(20).default(1),
}).refine((item) => Boolean(item.productId) !== Boolean(item.customBoxTemplateId), {
  message: "Provide exactly one of productId or customBoxTemplateId",
});

export const syncCartSchema = z.object({
  guestToken: z.string().min(1),
  items: z.array(cartItemSchema).default([]),
});

export const addCartItemSchema = cartItemSchema;

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(20),
});
