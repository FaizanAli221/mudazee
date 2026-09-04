import { Prisma, OrderStatus, PaymentMethod } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/errors";
import { generateOrderNumber, generateTrackingId } from "../../utils/ids";
import { shippingService } from "./shipping.service";

interface OrderItemInput {
  productId?: string;
  customBoxTemplateId?: string;
  customBoxSelections?: string[];
  quantity: number;
}

interface CreateOrderInput {
  items: OrderItemInput[];
  paymentMethod: PaymentMethod;
  shippingAddress: {
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    postalCode?: string;
    phone: string;
  };
  voucherCode?: string;
  guestEmail?: string;
  guestPhone?: string;
  userId?: string;
}

/**
 * Resolves each requested line item to a priced, titled snapshot, and
 * validates business rules (active, not sold out, custom-box slot count).
 * Does NOT touch stock yet — that happens transactionally in createOrder.
 */
async function resolveLineItems(items: OrderItemInput[]) {
  const resolved: Array<{
    productId?: string;
    titleSnapshot: string;
    unitPrice: Prisma.Decimal;
    quantity: number;
    customBoxSelections: string[];
    stockDeduction?: { productId: string; quantity: number };
  }> = [];

  for (const item of items) {
    if (item.productId) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || !product.isActive) {
        throw AppError.notFound(`Product ${item.productId} is unavailable`);
      }
      if (product.isSoldOut || product.stockQuantity < item.quantity) {
        throw AppError.conflict(`${product.title} does not have enough stock`, {
          productId: product.id,
          requested: item.quantity,
          available: product.stockQuantity,
        });
      }
      resolved.push({
        productId: product.id,
        titleSnapshot: product.title,
        unitPrice: product.salePrice ?? product.originalPrice,
        quantity: item.quantity,
        customBoxSelections: [],
        stockDeduction: { productId: product.id, quantity: item.quantity },
      });
      continue;
    }

    if (item.customBoxTemplateId) {
      const template = await prisma.customBoxTemplate.findUnique({
        where: { id: item.customBoxTemplateId },
        include: { options: { include: { product: true } } },
      });
      if (!template || !template.isActive) {
        throw AppError.notFound(`Custom box ${item.customBoxTemplateId} is unavailable`);
      }
      const selections = item.customBoxSelections ?? [];
      if (selections.length !== template.slotsCount) {
        throw AppError.badRequest(
          `${template.name} requires exactly ${template.slotsCount} selections`
        );
      }
      const optionByProductId = new Map(template.options.map((o) => [o.productId, o.product]));
      for (const productId of selections) {
        const product = optionByProductId.get(productId);
        if (!product) {
          throw AppError.badRequest(`Product ${productId} is not part of ${template.name}`);
        }
        if (product.isSoldOut || product.stockQuantity < item.quantity) {
          throw AppError.conflict(`${product.title} does not have enough stock for this box`, {
            productId: product.id,
          });
        }
      }

      resolved.push({
        titleSnapshot: template.name,
        unitPrice: template.price,
        quantity: item.quantity,
        customBoxSelections: selections,
      });

      // Each unit of a custom box consumes one unit of every selected tester.
      for (const productId of selections) {
        resolved.push({
          titleSnapshot: `(component of ${template.name})`,
          unitPrice: new Prisma.Decimal(0),
          quantity: item.quantity,
          customBoxSelections: [],
          stockDeduction: { productId, quantity: item.quantity },
          productId: undefined,
        });
      }
      continue;
    }

    throw AppError.badRequest("Order item must reference a product or a custom box template");
  }

  return resolved;
}

async function applyVoucher(code: string | undefined, subtotal: Prisma.Decimal) {
  if (!code) return { discount: new Prisma.Decimal(0), voucher: null as null | { id: string } };

  const voucher = await prisma.voucher.findUnique({ where: { code } });
  if (!voucher || !voucher.isActive) throw AppError.badRequest("Voucher code is invalid");
  if (voucher.expiresAt && voucher.expiresAt < new Date()) {
    throw AppError.badRequest("Voucher code has expired");
  }
  if (voucher.maxUses !== null && voucher.usedCount >= voucher.maxUses) {
    throw AppError.badRequest("Voucher has reached its usage limit");
  }
  if (subtotal.lt(voucher.minOrderAmount)) {
    throw AppError.badRequest(
      `This voucher requires a minimum order of Rs.${voucher.minOrderAmount.toString()}`
    );
  }

  const discount =
    voucher.type === "PERCENT"
      ? subtotal.times(voucher.value).dividedBy(100)
      : voucher.value;

  return { discount: Prisma.Decimal.min(discount, subtotal), voucher };
}

export const orderService = {
  async createOrder(input: CreateOrderInput) {
    if (!input.userId && (!input.guestEmail || !input.guestPhone)) {
      throw AppError.badRequest("Guest checkout requires guestEmail and guestPhone");
    }

    const lineItems = await resolveLineItems(input.items);

    // Only line items that carry a real price count toward the subtotal —
    // custom-box component rows are stock-only and priced at 0.
    const subtotal = lineItems.reduce(
      (sum, li) => sum.plus(li.unitPrice.times(li.quantity)),
      new Prisma.Decimal(0)
    );

    const { discount, voucher } = await applyVoucher(input.voucherCode, subtotal);
    const shipping = await shippingService.calculate(input.shippingAddress.city, subtotal);
    const total = subtotal.minus(discount).plus(shipping.fee);

    if (total.lt(0)) throw AppError.badRequest("Order total cannot be negative");

    // Transaction: deduct stock atomically (with a guarded update so we
    // never oversell under concurrent checkouts), then persist the order.
    const order = await prisma.$transaction(async (tx) => {
      for (const li of lineItems) {
        if (!li.stockDeduction) continue;
        const result = await tx.product.updateMany({
          where: { id: li.stockDeduction.productId, stockQuantity: { gte: li.stockDeduction.quantity } },
          data: { stockQuantity: { decrement: li.stockDeduction.quantity } },
        });
        if (result.count === 0) {
          throw AppError.conflict("Stock changed while placing your order — please review your cart");
        }
      }

      // Flip isSoldOut for any product that just hit zero stock.
      const productIds = lineItems
        .map((li) => li.stockDeduction?.productId)
        .filter((id): id is string => Boolean(id));
      if (productIds.length > 0) {
        await tx.product.updateMany({
          where: { id: { in: productIds }, stockQuantity: { lte: 0 } },
          data: { isSoldOut: true },
        });
      }

      if (voucher) {
        await tx.voucher.update({ where: { id: voucher.id }, data: { usedCount: { increment: 1 } } });
      }

      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          trackingId: generateTrackingId(),
          userId: input.userId,
          guestEmail: input.userId ? undefined : input.guestEmail,
          guestPhone: input.userId ? undefined : input.guestPhone,
          status: OrderStatus.PENDING,
          paymentMethod: input.paymentMethod,
          paymentStatus: "UNPAID",
          subtotal,
          shippingFee: shipping.fee,
          discountAmount: discount,
          total,
          city: input.shippingAddress.city,
          shippingAddress: input.shippingAddress as unknown as Prisma.InputJsonValue,
          voucherCode: voucher ? input.voucherCode : undefined,
          items: {
            create: lineItems
              .filter((li) => li.unitPrice.gt(0) || !li.stockDeduction) // keep priced rows + box header row
              .map((li) => ({
                productId: li.productId,
                titleSnapshot: li.titleSnapshot,
                unitPrice: li.unitPrice,
                quantity: li.quantity,
                customBoxSelections: li.customBoxSelections,
              })),
          },
        },
        include: { items: true },
      });

      return created;
    });

    return order;
  },

  async trackByTrackingId(trackingId: string) {
    const order = await prisma.order.findUnique({
      where: { trackingId },
      include: { items: true },
    });
    if (!order) throw AppError.notFound("No order found for this tracking id");
    return order;
  },

  async getById(id: string) {
    const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!order) throw AppError.notFound("Order not found");
    return order;
  },

  async listForUser(userId: string, page: number, pageSize: number) {
    const [items, total] = await prisma.$transaction([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { items: true },
      }),
      prisma.order.count({ where: { userId } }),
    ]);
    return { items, meta: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) } };
  },

  async listAll(filters: { status?: OrderStatus; page: number; pageSize: number }) {
    const where = filters.status ? { status: filters.status } : {};
    const [items, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (filters.page - 1) * filters.pageSize,
        take: filters.pageSize,
        include: { items: true },
      }),
      prisma.order.count({ where }),
    ]);
    return {
      items,
      meta: {
        page: filters.page,
        pageSize: filters.pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / filters.pageSize)),
      },
    };
  },

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.getById(id);

    // Restock automatically if an order is cancelled before shipping.
    if (status === "CANCELLED" && order.status !== "CANCELLED") {
      await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          // Direct product line — restock the product itself.
          if (item.productId) {
            await tx.product.update({
              where: { id: item.productId },
              data: { stockQuantity: { increment: item.quantity }, isSoldOut: false },
            });
          }
          // Custom-box line — restock every component tester it consumed.
          // Each unit of box quantity consumed `item.quantity` of every selection.
          for (const componentProductId of item.customBoxSelections) {
            await tx.product.update({
              where: { id: componentProductId },
              data: { stockQuantity: { increment: item.quantity }, isSoldOut: false },
            });
          }
        }
        await tx.order.update({ where: { id }, data: { status } });
      });
      return this.getById(id);
    }

    return prisma.order.update({ where: { id }, data: { status } });
  },
};
