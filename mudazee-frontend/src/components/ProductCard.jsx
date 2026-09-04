import React from "react";
import { Star, Eye, ShoppingBag } from "lucide-react";

function formatPKR(val) {
  if (!val) return "";
  return `Rs.${Number(val).toLocaleString("en-PK")}`;
}

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const isSoldOut = product.badge === "soldout" || product.isSoldOut;
  const price = product.price ?? product.salePrice ?? product.originalPrice;
  const originalPrice = product.originalPrice && product.originalPrice > price ? product.originalPrice : null;

  return (
    <div className="group flex flex-col justify-between bg-white border border-[#EDE8DE] hover:border-[#D5CDBD] transition-all duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] bg-[#F7F5F0] overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.title}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isSoldOut ? "opacity-50 grayscale" : ""
          }`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge === "sale" && (
            <span className="bg-[#A32424] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              Sale
            </span>
          )}
          {product.badge === "bestseller" && (
            <span className="bg-[#141311] text-[#E8C882] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              Bestseller
            </span>
          )}
          {product.badge === "luxury" && (
            <span className="bg-[#C7A96A] text-[#141311] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              Exclusive
            </span>
          )}
          {product.badge === "popular" && (
            <span className="bg-[#2E2822] text-white text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              Trending
            </span>
          )}
        </div>

        {/* Extrait Concentration Ribbon */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none opacity-90">
          <span className="text-[9px] font-semibold tracking-wider text-[#141311] bg-white/90 backdrop-blur px-2 py-0.5 rounded-sm shadow-sm">
            {product.concentration || "Extrait de Parfum"}
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white text-[#141311] hover:bg-[#141311] hover:text-white transition-colors p-2.5 rounded-full shadow-lg"
            title="View Olfactory Notes"
            aria-label="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#9C7A38]">
              {product.category || "Unisex"}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#8A8072]">
              <Star size={11} className="fill-[#C7A96A] text-[#C7A96A]" />
              <span className="font-semibold text-[#141311]">{product.rating}</span>
              <span>({product.reviews})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-display text-[15px] sm:text-[16px] font-medium text-[#141311] tracking-tight hover:text-[#9C7A38] cursor-pointer transition-colors line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-[11px] text-[#7A7264] mt-0.5 line-clamp-1 italic font-serif">
            {product.tag}
          </p>

          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-[14px] sm:text-[15px] font-bold text-[#141311]">
              {formatPKR(price)}
            </span>
            {originalPrice && (
              <span className="text-[11px] text-[#A69E90] line-through">
                {formatPKR(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-3 pt-3 border-t border-[#F3EFE7] grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="text-[10px] uppercase font-semibold tracking-wider py-2 px-2 text-[#5E574B] hover:text-[#141311] border border-[#E5E0D4] hover:border-[#141311] transition-colors rounded-sm text-center"
          >
            Notes
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isSoldOut}
            className={`text-[10px] uppercase font-bold tracking-wider py-2 px-2 rounded-sm text-center flex items-center justify-center gap-1.5 transition-all ${
              isSoldOut
                ? "bg-[#EAE6DD] text-[#A0988A] cursor-not-allowed"
                : "bg-[#141311] text-white hover:bg-[#C7A96A] hover:text-[#141311] shadow-sm"
            }`}
          >
            <ShoppingBag size={12} />
            <span>{isSoldOut ? "Out" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
