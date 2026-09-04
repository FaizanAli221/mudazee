import React, { useState } from "react";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Tag,
  CheckCircle,
} from "lucide-react";

function formatPKR(val) {
  if (!val) return "Rs.0";
  return `Rs.${Number(val).toLocaleString("en-PK")}`;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "MUDAZEE10") {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try MUDAZEE10 for 10% off.");
    }
  };

  const buildWhatsAppCartMessage = () => {
    const itemsList = cart
      .map((i) => `• ${i.title} (${i.selectedSize || "50ml"}) x ${i.quantity} = ${formatPKR(i.price * i.quantity)}`)
      .join("%0A");
    return `Hello MUDAZEE, I would like to place an order:%0A%0A${itemsList}%0A%0ASubtotal: ${formatPKR(
      subtotal
    )}%0APlease confirm my order.`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDE8DE]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EDE8DE] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#141311]" />
              <h2 className="font-display text-[18px] font-semibold text-[#141311] tracking-wide">
                Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#8C8271] hover:text-[#141311] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B0A799]">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-display text-[16px] font-medium text-[#141311]">
                  Your bag is currently empty
                </h3>
                <p className="text-[12px] text-[#8C8271] max-w-xs mx-auto">
                  Explore our collection of French oil Extrait impressions and elevate your scent presence.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-[#141311] text-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#C7A96A] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize || "default"}`}
                  className="flex gap-4 p-3 border border-[#F0EBE1] bg-[#FCFBF8] rounded-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover bg-gray-100 flex-shrink-0 rounded-sm"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-display text-[14px] font-semibold text-[#141311]">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-[#B0A799] hover:text-[#A32424] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#8C8271] italic">
                        {item.selectedSize || "50ml Flacon"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#DDD6C8] bg-white rounded-sm">
                        <button
                          onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#554E43] hover:bg-[#F5F1E8]"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#554E43] hover:bg-[#F5F1E8]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-[13px] font-bold text-[#141311]">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FAF8F5] border-t border-[#EDE8DE] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-2.5 top-3 text-[#9E9586]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Voucher code (try MUDAZEE10)"
                    disabled={promoApplied}
                    className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-[#DCD6CA] rounded-sm outline-none uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied}
                  className="bg-[#141311] hover:bg-[#A9803D] text-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </form>

              {promoApplied && (
                <div className="flex items-center gap-1 text-[11px] text-[#2E7D32]">
                  <CheckCircle size={12} />
                  <span>10% discount applied to your order!</span>
                </div>
              )}
              {promoError && <p className="text-[11px] text-[#C62828]">{promoError}</p>}

              {/* Subtotals */}
              <div className="space-y-1.5 text-[12px] pt-2 border-t border-[#EAE4D8]">
                <div className="flex justify-between text-[#7A7264]">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#141311]">{formatPKR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount (10%):</span>
                    <span>-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7A7264]">
                  <span>Shipping:</span>
                  <span className="font-semibold text-[#1E7E34]">Calculated at checkout (Free in Karachi)</span>
                </div>
                <div className="flex justify-between text-[15px] font-bold text-[#141311] pt-2 border-t border-[#EAE4D8]">
                  <span>Estimated Total:</span>
                  <span>{formatPKR(finalTotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onCheckout(finalTotal);
                  }}
                  className="w-full bg-[#141311] hover:bg-[#A9803D] text-white py-3 text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-sm transition-all shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <a
                  href={`https://wa.me/923179145228?text=${buildWhatsAppCartMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-[#25D366] text-[#1E9A4B] hover:bg-[#25D366] hover:text-white transition-all py-2.5 text-[12px] font-semibold rounded-sm"
                >
                  <MessageCircle size={14} />
                  <span>Checkout on WhatsApp (0317 9145228)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
