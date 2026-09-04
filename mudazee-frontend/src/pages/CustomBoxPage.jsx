import React, { useState } from "react";
import {
  CheckCircle,
  Plus,
  X,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

function formatPKR(val) {
  if (!val) return "";
  return `Rs.${Number(val).toLocaleString("en-PK")}`;
}

export default function CustomBoxPage({ products, onAddToCart }) {
  const [selectedScents, setSelectedScents] = useState([]);
  const MAX_SLOTS = 5;
  const BOX_PRICE = 2499;
  const BOX_ORIGINAL_PRICE = 3200;

  const handleToggleScent = (product) => {
    if (selectedScents.some((p) => p.id === product.id)) {
      setSelectedScents(selectedScents.filter((p) => p.id !== product.id));
    } else {
      if (selectedScents.length < MAX_SLOTS) {
        setSelectedScents([...selectedScents, product]);
      }
    }
  };

  const handleRemoveSlot = (index) => {
    const updated = [...selectedScents];
    updated.splice(index, 1);
    setSelectedScents(updated);
  };

  const handleAddBoxToCart = () => {
    if (selectedScents.length !== MAX_SLOTS) return;

    const names = selectedScents.map((s) => s.title).join(", ");
    onAddToCart(
      {
        id: `custom-box-${Date.now()}`,
        title: "5-in-1 Custom Discovery Box",
        selectedSize: `Selection: ${names}`,
        price: BOX_PRICE,
        originalPrice: BOX_ORIGINAL_PRICE,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80&auto=format&fit=crop",
      },
      1
    );
  };

  const buildWhatsAppCustomBox = () => {
    const names = selectedScents.map((s, idx) => `${idx + 1}. ${s.title} (${s.tag})`).join("%0A");
    return `Hello MUDAZEE, I want to order the 5-in-1 Custom Discovery Box for Rs. 2,499:%0A%0A${names}%0A%0APlease confirm my order.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EDE0] text-[#9E772F] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
          <Sparkles size={11} />
          Bespoke Experience
        </span>
        <h1 className="font-display text-[28px] sm:text-[40px] font-semibold text-[#141311] leading-tight">
          Build Your 5-in-1 Custom Box
        </h1>
        <p className="text-[13px] text-[#7A7264] leading-relaxed">
          Create your personalized fragrance wardrobe. Pick any 5 Extrait de Parfum 10ml luxury travel sprays from our catalog. Delivered in our signature rigid magnetic presentation box.
        </p>
      </div>

      {/* Interactive 5-Slot Box Presentation */}
      <div className="bg-[#141311] text-white p-6 sm:p-8 rounded-sm shadow-xl border border-[#2E2922]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#2B2721]">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-[22px] font-semibold text-[#D8B46C]">
                {formatPKR(BOX_PRICE)}
              </span>
              <span className="text-[14px] text-[#8C8477] line-through">
                {formatPKR(BOX_ORIGINAL_PRICE)}
              </span>
              <span className="bg-[#A32424] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                Save {formatPKR(BOX_ORIGINAL_PRICE - BOX_PRICE)}
              </span>
            </div>
            <p className="text-[12px] text-[#B8B1A4] mt-1">
              {selectedScents.length === MAX_SLOTS
                ? "✨ Your box is fully curated and ready to order!"
                : `Please select ${MAX_SLOTS - selectedScents.length} more scent${
                    MAX_SLOTS - selectedScents.length > 1 ? "s" : ""
                  } below.`}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleAddBoxToCart}
              disabled={selectedScents.length !== MAX_SLOTS}
              className={`flex-1 sm:flex-none px-6 py-3 text-[12px] font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow ${
                selectedScents.length === MAX_SLOTS
                  ? "bg-[#D8B46C] hover:bg-white text-[#141311] cursor-pointer"
                  : "bg-[#2E2B25] text-[#7C7468] cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={14} />
              <span>Add Custom Box to Bag</span>
            </button>

            {selectedScents.length === MAX_SLOTS && (
              <a
                href={`https://wa.me/923179145228?text=${buildWhatsAppCustomBox()}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-5 py-3 text-[12px] font-semibold rounded-sm transition-colors"
              >
                <MessageCircle size={14} />
                <span>Order via WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* 5 Slots Visualizer */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mt-6">
          {Array.from({ length: MAX_SLOTS }).map((_, idx) => {
            const scent = selectedScents[idx];
            return (
              <div
                key={idx}
                className={`relative aspect-[3/4] p-3 rounded-sm border flex flex-col justify-between items-center text-center transition-all ${
                  scent
                    ? "bg-[#1E1C18] border-[#D8B46C]"
                    : "bg-[#161412] border-[#2C2720] border-dashed"
                }`}
              >
                {scent ? (
                  <>
                    <button
                      onClick={() => handleRemoveSlot(idx)}
                      className="absolute top-1.5 right-1.5 bg-[#2B2721] hover:bg-[#A32424] text-white p-1 rounded-full transition-colors"
                      title="Remove"
                      aria-label="Remove scent"
                    >
                      <X size={11} />
                    </button>
                    <img
                      src={scent.image}
                      alt={scent.title}
                      className="w-14 h-16 object-cover rounded-sm mt-1 shadow"
                    />
                    <div className="w-full">
                      <p className="text-[12px] font-bold text-white truncate">{scent.title}</p>
                      <p className="text-[10px] text-[#A69E8F] truncate">{scent.tag}</p>
                    </div>
                    <span className="text-[9px] font-semibold text-[#D8B46C] tracking-wider uppercase">
                      Slot {idx + 1} Selected
                    </span>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-2 text-[#7C7468]">
                    <div className="w-8 h-8 rounded-full border border-dashed border-[#443D32] flex items-center justify-center">
                      <Plus size={14} />
                    </div>
                    <span className="text-[11px] font-medium">Slot {idx + 1}</span>
                    <span className="text-[9px] text-[#5A5347]">Empty</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scent Picker Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#EDE8DE]">
          <h2 className="font-display text-[20px] font-semibold text-[#141311]">
            Select From Available Extrait Scents
          </h2>
          <span className="text-[12px] text-[#8C8477]">
            {selectedScents.length}/{MAX_SLOTS} Selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => {
            const isSelected = selectedScents.some((s) => s.id === product.id);
            const isFull = selectedScents.length >= MAX_SLOTS && !isSelected;

            return (
              <div
                key={product.id}
                onClick={() => !isFull && handleToggleScent(product)}
                className={`border p-3.5 rounded-sm transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "border-[#141311] bg-[#FAF7F0] ring-1 ring-[#141311] shadow"
                    : isFull
                    ? "border-[#E8E4D8] opacity-50 cursor-not-allowed bg-[#FAF9F7]"
                    : "border-[#E8E4D8] hover:border-[#141311] bg-white"
                }`}
              >
                <div className="space-y-2">
                  <div className="relative aspect-square bg-[#F4F1EA] rounded-sm overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#141311] text-[#D8B46C] p-1 rounded-full shadow">
                        <CheckCircle size={14} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-display text-[14px] font-semibold text-[#141311] truncate">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-[#7A7264] truncate italic">{product.tag}</p>
                    <p className="text-[10px] text-[#A9803D] uppercase font-bold tracking-wider mt-1">
                      {product.category} • {product.concentration}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isFull}
                  className={`mt-3 w-full py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-colors ${
                    isSelected
                      ? "bg-[#141311] text-white"
                      : "border border-[#141311] text-[#141311] hover:bg-[#141311] hover:text-white"
                  }`}
                >
                  {isSelected ? "Remove from Box" : "Add to Box"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
