import React from "react";
import { Sparkles, Award, ShieldCheck, Heart, Phone, ArrowRight } from "lucide-react";

export default function AboutPage({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9803D]">
          Karachi Heritage • Parisian Essences
        </span>
        <h1 className="font-display text-[32px] sm:text-[46px] font-semibold text-[#141311] leading-tight">
          The Story of MUDAZEE
        </h1>
        <p className="text-[14px] text-[#6E6659] leading-relaxed">
          MUDAZEE was founded on a singular conviction: luxury olfactory sophistication should never be gatekept by exorbitant markups. We engineer true Extrait-grade impressions that mirror the world's most iconic fragrances.
        </p>
      </div>

      {/* Grid Story 1 */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg border border-[#EDE8DE]">
          <img
            src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80&auto=format&fit=crop"
            alt="Perfume formulation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#A9803D]">
            The Art of Formulation
          </span>
          <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#141311]">
            Why 35% Extrait de Parfum Matters
          </h2>
          <p className="text-[13px] text-[#6E6659] leading-relaxed">
            Most commercial perfumes found in department stores are classified as Eau de Parfum (EDP) containing only 12%–18% fragrance oil, or Eau de Toilette (EDT) with merely 5%–10%.
          </p>
          <p className="text-[13px] text-[#6E6659] leading-relaxed">
            At MUDAZEE, every flacon is formulated as a genuine <strong className="text-[#141311]">Extrait de Parfum at 35% concentration</strong>. Imported directly from Grasse and European perfumery suppliers, our oils are heavier, denser, and evaporate gradually over 12 to 16 hours.
          </p>
          <div className="pt-2 flex items-center gap-4 text-[12px] font-semibold text-[#141311]">
            <span className="flex items-center gap-1">
              <Sparkles size={14} className="text-[#A9803D]" />
              Zero Synthetic Harshness
            </span>
            <span className="flex items-center gap-1">
              <Award size={14} className="text-[#A9803D]" />
              Authentic Scent Evolution
            </span>
          </div>
        </div>
      </div>

      {/* Grid Story 2 */}
      <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
        <div className="space-y-4 order-2 md:order-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#A9803D]">
            Engineered for Pakistan
          </span>
          <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#141311]">
            Built to Endure Karachi Heat & Humidity
          </h2>
          <p className="text-[13px] text-[#6E6659] leading-relaxed">
            Western perfume formulations are tested in temperate European climates. When introduced to Karachi's coastal humidity or Punjab's summer heat, standard fragrances dissipate in minutes.
          </p>
          <p className="text-[13px] text-[#6E6659] leading-relaxed">
            Our master blenders recalibrate each impression with resilient base fixatives — white ambergris, Indonesian patchouli, and clean cedar musks — ensuring your aura lingers from morning boardroom meetings to late-night social gatherings.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("shop")}
              className="inline-flex items-center gap-2 bg-[#141311] hover:bg-[#A9803D] text-white px-6 py-3 text-[12px] font-bold uppercase tracking-wider rounded-sm transition-colors shadow"
            >
              <span>Explore Our Fragrances</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg border border-[#EDE8DE] order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80&auto=format&fit=crop"
            alt="Luxury perfume packaging"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 10-Day Promise Banner */}
      <div className="bg-[#FAF8F5] border border-[#E8E1D3] p-8 sm:p-12 rounded-sm text-center max-w-4xl mx-auto space-y-4">
        <ShieldCheck className="mx-auto text-[#A9803D]" size={36} />
        <h3 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#141311]">
          The 10-Day Risk-Free Guarantee
        </h3>
        <p className="text-[13px] text-[#6E6659] max-w-xl mx-auto leading-relaxed">
          Fragrance is deeply personal. We want you to wear your MUDAZEE scent in the real world. If you or your loved ones don't love how it wears on your skin, you can exchange it with zero fees within 10 days.
        </p>
        <div className="pt-2 text-[12px] text-[#141311] font-semibold">
          Customer Care Helpline:{" "}
          <a href="tel:03179145228" className="text-[#A9803D] underline">
            0317 9145228
          </a>
        </div>
      </div>
    </div>
  );
}
