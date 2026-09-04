import { z } from "zod";

export const createStoreSchema = z.object({
  branchName: z.string().min(2).max(120),
  address: z.string().min(5).max(255),
  city: z.string().min(2).max(80),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  googleMapsUrl: z.string().url(),
  contactNumber: z.string().min(7).max(20),
  isActive: z.boolean().default(true),
});

export const updateStoreSchema = createStoreSchema.partial();

export const idParamSchema = z.object({ id: z.string().min(1) });
