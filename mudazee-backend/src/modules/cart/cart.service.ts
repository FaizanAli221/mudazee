import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/errors";

interface IncomingCartItem {
  productId?: string;
  customBoxTemplateId?: string;
  customBoxSelections?: string[];
  quantity: number;
}

async function priceItem(item: IncomingCartItem): Promise<Prisma.Decimal> {
  if (item.productId) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || !product.isActive) throw AppError.notFound(`Product ${item.productId} not found`);
    if (product.isSoldOut) throw AppError.conflict(`${product.title} is currently sold out`);
    return product.salePrice ?? product.originalPrice;
  }

  if (item.customBoxTemplateId) {
    const template = await prisma.customBoxTemplate.findUnique({
      where: { id: item.customBoxTemplateId },
      include: { options: true },
    });
    if (!template || !template.isActive) {
      throw AppError.notFound(`Custom box ${item.customBoxTemplateId} not found`);
    }
    const selections = item.customBoxSelections ?? [];
    if (selections.length !== template.slotsCount) {
      throw AppError.badRequest(
        `${template.name} requires exactly ${template.slotsCount} selections, received ${selections.length}`
      );
    }
    const allowedIds = new Set(template.options.map((o) => o.productId));
    const invalid = selections.filter((id) => !allowedIds.has(id));
    if (invalid.length > 0) {
      throw AppError.badRequest("One or more selected products are not part of this custom box", {
        invalid,
      });
    }
    return template.price;
  }

  throw AppError.badRequest("Cart item must reference a product or a custom box template");
}

async function getOrCreateCartForUser(userId: string) {
  const existing = await prisma.cart.findFirst({ where: { userId } });
  if (existing) return existing;
  return prisma.cart.create({ data: { userId } });
}

export const cartService = {
  /**
   * Merges a guest cart (identified by guestToken, items supplied by the
   * client / persisted client-side) into the authenticated user's server
   * cart. Called right after login/registration.
   */
  async syncGuestCart(userId: string, items: IncomingCartItem[]) {
    const cart = await getOrCreateCartForUser(userId);

    const results = [];
    for (const item of items) {
      const unitPrice = await priceItem(item);

      const existing = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: item.productId ?? null,
          customBoxTemplateId: item.customBoxTemplateId ?? null,
        },
      });

      if (existing && item.productId) {
        results.push(
          await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + item.quantity },
          })
        );
      } else {
        results.push(
          await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: item.productId,
              customBoxTemplateId: item.customBoxTemplateId,
              customBoxSelections: item.customBoxSelections ?? [],
              quantity: item.quantity,
              unitPrice,
            },
          })
        );
      }
    }

    return this.getCart(cart.id);
  },

  async getCart(cartId: string) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true, customBoxTemplate: true } } },
    });
    if (!cart) throw AppError.notFound("Cart not found");

    const subtotal = cart.items.reduce(
      (sum, item) => sum.plus(item.unitPrice.times(item.quantity)),
      new Prisma.Decimal(0)
    );

    return { ...cart, subtotal };
  },

  async getOrCreateForUser(userId: string) {
    const cart = await getOrCreateCartForUser(userId);
    return this.getCart(cart.id);
  },

  async addItem(userId: string, item: IncomingCartItem) {
    const cart = await getOrCreateCartForUser(userId);
    const unitPrice = await priceItem(item);

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: item.productId,
        customBoxTemplateId: item.customBoxTemplateId,
        customBoxSelections: item.customBoxSelections ?? [],
        quantity: item.quantity,
        unitPrice,
      },
    });

    return this.getCart(cart.id);
  },

  async updateItemQuantity(userId: string, itemId: string, quantity: number) {
    const cart = await getOrCreateCartForUser(userId);
    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw AppError.notFound("Cart item not found");

    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
    return this.getCart(cart.id);
  },

  async removeItem(userId: string, itemId: string) {
    const cart = await getOrCreateCartForUser(userId);
    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw AppError.notFound("Cart item not found");

    await prisma.cartItem.delete({ where: { id: itemId } });
    return this.getCart(cart.id);
  },
};
