import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";

function formatPKR(val) {
  if (!val) return "";
  return `Rs.${Number(val).toLocaleString("en-PK")}`;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const sizes = product.sizes || [
    { name: "50ml Flacon", price: product.price, originalPrice: product.originalPrice },
  ];
  const currentSize = sizes[selectedSizeIndex] || sizes[0];
  const activePrice = currentSize.price;
  const activeOriginalPrice = currentSize.originalPrice;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize: currentSize.name,
      price: activePrice,
      originalPrice: activeOriginalPrice,
    }, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-3xl overflow-hidden shadow-2xl z-10 my-auto border border-[#EDE8DE] flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-[#141311] hover:text-white transition-colors p-1.5 rounded-full shadow"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left: Perfume Image */}
        <div className="md:w-1/2 bg-[#F5F2EB] relative flex items-center justify-center min-h-[300px] md:min-h-[460px]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover max-h-[460px]"
          />
          <div className="absolute top-3 left-3 bg-[#141311] text-[#E5C989] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm shadow">
            {product.concentration || "Extrait de Parfum"}
          </div>
        </div>

        {/* Right: Scent Details & Purchasing */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-[#8C8271] uppercase tracking-wider mb-1">
              <span className="font-semibold text-[#A9803D]">{product.category}</span>
              <span>•</span>
              <span>{product.longevity || "12+ Hours Longevity"}</span>
            </div>

            <h2 className="font-display text-[24px] sm:text-[28px] font-medium text-[#141311] leading-tight">
              {product.title}
            </h2>

            <p className="text-[13px] text-[#786F62] italic font-serif mt-1">
              {product.tag}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 pb-3 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-[#C7A96A] text-[#C7A96A]"
                        : "fill-none text-[#DDD6C8]"
                    }
                  />
                ))}
              </div>
              <span className="text-[12px] font-bold text-[#141311]">{product.rating}</span>
              <span className="text-[11px] text-[#8C8271]">({product.reviews} customer reviews)</span>
            </div>

            {/* Description */}
            <p className="text-[12px] text-[#554E43] leading-relaxed mt-3">
              {product.description}
            </p>

            {/* Scent Pyramid Notes */}
            {product.notes && (
              <div className="mt-4 p-3 bg-[#FAF8F4] border border-[#ECE7DC] rounded-sm space-y-1.5 text-[11px]">
                <p className="font-bold text-[#141311] tracking-wider uppercase text-[10px]">
                  Olfactory Pyramid
                </p>
                <p>
                  <span className="font-semibold text-[#8C8271]">Top Notes:</span>{" "}
                  <span className="text-[#36322B]">{product.notes.top}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#8C8271]">Heart Notes:</span>{" "}
                  <span className="text-[#36322B]">{product.notes.heart}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#8C8271]">Base Notes:</span>{" "}
                  <span className="text-[#36322B]">{product.notes.base}</span>
                </p>
              </div>
            )}

            {/* Size Selector */}
            <div className="mt-4">
              <label className="block text-[11px] font-bold text-[#141311] uppercase tracking-wider mb-2">
                Select Bottle Presentation:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((s, idx) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`py-2 px-1 text-center border rounded-sm transition-all text-[11px] ${
                      selectedSizeIndex === idx
                        ? "border-[#141311] bg-[#141311] text-white font-semibold"
                        : "border-[#DFD9CE] hover:border-[#141311] text-[#423C32] bg-white"
                    }`}
                  >
                    <div>{s.name}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{formatPKR(s.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display text-[22px] font-bold text-[#141311]">
                {formatPKR(activePrice)}
              </span>
              {activeOriginalPrice && (
                <span className="text-[13px] text-[#A29A8C] line-through">
                  {formatPKR(activeOriginalPrice)}
                </span>
              )}
              {activeOriginalPrice && activePrice && (
                <span className="text-[11px] text-[#A32424] font-semibold">
                  Save {formatPKR(activeOriginalPrice - activePrice)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="mt-6 pt-4 border-t border-[#F0EBE1] space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D5CFBF]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#141311] hover:bg-[#F3EFE7]"
                >
                  -
                </button>
                <span className="px-4 text-[13px] font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#141311] hover:bg-[#F3EFE7]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-[#141311] hover:bg-[#A9803D] text-white py-2.5 text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded-sm shadow"
              >
                <ShoppingBag size={14} />
                <span>{addedAnimation ? "Added to Bag!" : "Add to Bag"}</span>
              </button>
            </div>

            {/* Order via WhatsApp */}
            <a
              href={`https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20want%20to%20order%20${encodeURIComponent(
                product.title
              )}%20(${encodeURIComponent(currentSize.name)})%20for%20${formatPKR(activePrice)}.`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-[#25D366] text-[#1E9A4B] hover:bg-[#25D366] hover:text-white transition-all py-2 text-[12px] font-semibold rounded-sm"
            >
              <MessageCircle size={14} />
              <span>Order via WhatsApp (0317 9145228)</span>
            </a>

            {/* Trust Badges */}
            <div className="flex items-center justify-between text-[10px] text-[#7A7264] pt-2">
              <span className="flex items-center gap-1">
                <Truck size={12} className="text-[#A9803D]" />
                Same-Day Karachi
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#A9803D]" />
                10-Day Risk-Free
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#A9803D]" />
                12+ Hrs Long Lasting
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
