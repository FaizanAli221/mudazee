import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const DEFAULT_FEE = new Prisma.Decimal(300);
const DEFAULT_FREE_THRESHOLD = new Prisma.Decimal(8000);

/**
 * City-based shipping calculation. Karachi gets same-day-eligible flat
 * rates; everything else falls back to a nationwide default unless a
 * ShippingRule row overrides it (set by admins).
 */
export const shippingService = {
  async calculate(city: string, subtotal: Prisma.Decimal) {
    const rule = await prisma.shippingRule.findFirst({
      where: { city: { equals: city, mode: "insensitive" } },
    });

    const fee = rule?.fee ?? DEFAULT_FEE;
    const freeThreshold = rule?.freeThreshold ?? DEFAULT_FREE_THRESHOLD;
    const sameDayEligible = rule?.sameDayEligible ?? false;

    const qualifiesForFreeShipping = freeThreshold ? subtotal.gte(freeThreshold) : false;

    return {
      fee: qualifiesForFreeShipping ? new Prisma.Decimal(0) : fee,
      sameDayEligible,
      freeShippingThreshold: freeThreshold,
    };
  },
};
