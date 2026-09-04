import React from "react";
import {
  ChevronRight,
  Sparkles,
  MapPin,
  ExternalLink,
  Phone,
  Shield,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function HomePage({
  products,
  stores,
  onAddToCart,
  onQuickView,
  onNavigate,
}) {
  const newArrivals = products.filter((p) => p.isNewArrival);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const mens = products.filter((p) => p.category === "men" || p.category === "unisex");
  const womens = products.filter((p) => p.category === "women" || p.category === "unisex");

  const SEASONS = [
    {
      name: "Summer",
      note: "Citrus, Marine & Sea Salt",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "Winter",
      note: "Smoky Oud, Leather & Amber",
      image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "Spring",
      note: "White Gardenia & Turkish Rose",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "Fall",
      note: "Warm Spices, Vanilla & Vetiver",
      image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80&auto=format&fit=crop",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* ---------- HERO SECTION ---------- */}
      <section className="px-4 sm:px-8 pt-4 sm:pt-6">
        <div className="mx-auto max-w-7xl relative bg-[#121110] overflow-hidden rounded-sm shadow-xl">
          <div className="grid md:grid-cols-2 items-center min-h-[420px] sm:min-h-[500px]">
            <div className="flex flex-col justify-center px-6 sm:px-14 py-12 sm:py-10 z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#24211A] text-[#D8B46C] text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full w-fit">
                <Sparkles size={11} />
                Artisanal Extrait de Parfum
              </div>

              <h1 className="font-display text-white text-[32px] sm:text-[50px] leading-[1.08] tracking-tight">
                Luxury Impressions,
                <br />
                <span className="text-[#D8B46C] italic font-serif">Uncompromised.</span>
              </h1>

              <p className="text-[#B5AFA4] text-[13px] sm:text-[14px] leading-relaxed max-w-md">
                Karachi-crafted high-concentration impressions of the world’s most coveted scents. Formulated with authentic French perfume essences for unmatched 12+ hour sillage.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => onNavigate("shop")}
                  className="bg-[#D8B46C] hover:bg-white text-[#141311] text-[12px] font-bold uppercase tracking-wider px-7 py-3.5 rounded-sm transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Catalog
                </button>

                <button
                  onClick={() => onNavigate("custom-box")}
                  className="border border-[#4A453C] hover:border-[#D8B46C] text-white hover:text-[#D8B46C] text-[12px] font-semibold uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors"
                >
                  Build 5-in-1 Box
                </button>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-4 border-t border-[#26231E] grid grid-cols-3 gap-4 text-white">
                <div>
                  <div className="font-display text-[18px] sm:text-[20px] font-bold text-[#D8B46C]">35%</div>
                  <div className="text-[10px] text-[#8C8477] uppercase tracking-wider">Oil Concentration</div>
                </div>
                <div>
                  <div className="font-display text-[18px] sm:text-[20px] font-bold text-[#D8B46C]">12+ Hrs</div>
                  <div className="text-[10px] text-[#8C8477] uppercase tracking-wider">Guaranteed Sillage</div>
                </div>
                <div>
                  <div className="font-display text-[18px] sm:text-[20px] font-bold text-[#D8B46C]">10 Days</div>
                  <div className="text-[10px] text-[#8C8477] uppercase tracking-wider">Risk-Free Return</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-full min-h-[300px] md:min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1615368144592-05aa4ba51454?w=1000&q=80&auto=format&fit=crop"
                alt="MUDAZEE Luxury Perfumes"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121110] via-[#121110]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BRAND VALUE PROPOSITIONS ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 bg-[#FAF8F5] border border-[#ECE6D8] rounded-sm space-y-2">
            <Award className="text-[#A9803D]" size={22} />
            <h4 className="font-display text-[14px] font-semibold text-[#141311]">Extrait Concentration</h4>
            <p className="text-[11px] text-[#7A7264] leading-relaxed">
              Formulated with 35% pure fragrance oil imports from Grasse, France.
            </p>
          </div>
          <div className="p-5 bg-[#FAF8F5] border border-[#ECE6D8] rounded-sm space-y-2">
            <Clock className="text-[#A9803D]" size={22} />
            <h4 className="font-display text-[14px] font-semibold text-[#141311]">12+ Hours Longevity</h4>
            <p className="text-[11px] text-[#7A7264] leading-relaxed">
              Engineered specifically for South Asian climate and all-day projection.
            </p>
          </div>
          <div className="p-5 bg-[#FAF8F5] border border-[#ECE6D8] rounded-sm space-y-2">
            <Shield className="text-[#A9803D]" size={22} />
            <h4 className="font-display text-[14px] font-semibold text-[#141311]">10-Day Exchange</h4>
            <p className="text-[11px] text-[#7A7264] leading-relaxed">
              Don't like your scent? Exchange it hassle-free or receive a full refund.
            </p>
          </div>
          <div className="p-5 bg-[#FAF8F5] border border-[#ECE6D8] rounded-sm space-y-2">
            <Phone className="text-[#A9803D]" size={22} />
            <h4 className="font-display text-[14px] font-semibold text-[#141311]">Direct Hotline</h4>
            <p className="text-[11px] text-[#7A7264] leading-relaxed">
              Call or WhatsApp our scent advisors anytime at <span className="font-bold text-[#141311]">0317 9145228</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- NEW ARRIVALS SHELF ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#EAE4D6]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#A9803D] uppercase">
              Fresh Batches
            </span>
            <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#141311]">
              New Arrival Impressions
            </h2>
          </div>
          <button
            onClick={() => onNavigate("shop")}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#141311] hover:text-[#A9803D] transition-colors"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* ---------- PROMOTIONAL CUSTOM TESTER BOX BANNER ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative bg-[#1A1816] text-white rounded-sm overflow-hidden p-8 sm:p-12 border border-[#2E2B25] shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D8B46C] bg-[#2E281F] px-3 py-1 rounded-full">
                Custom Discovery Set
              </span>
              <h2 className="font-display text-[26px] sm:text-[34px] leading-tight font-medium">
                Build Your 5-in-1
                <br />
                <span className="text-[#D8B46C] italic font-serif">Curated Tester Box</span>
              </h2>
              <p className="text-[13px] text-[#BFB9AE] leading-relaxed">
                Can’t choose one signature scent? Pick any 5 premium 10ml travel impressions from our entire collection for only <span className="text-white font-bold text-[14px]">Rs. 2,499</span>. Includes luxury gift box packaging.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("custom-box")}
                  className="bg-[#D8B46C] hover:bg-white text-[#141311] text-[12px] font-bold uppercase tracking-wider px-7 py-3.5 rounded-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Build My Box Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded overflow-hidden shadow-2xl border border-[#3A352D]">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80&auto=format&fit=crop"
                alt="MUDAZEE Custom Discovery Box"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-[#141311]/90 backdrop-blur px-3 py-1 text-[11px] text-[#D8B46C] font-semibold border border-[#443E33]">
                5 x 10ml Sprays — Rs. 2,499
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BEST SELLERS SHELF ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#EAE4D6]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#A9803D] uppercase">
              Hall of Fame
            </span>
            <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#141311]">
              Best Selling Perfumes
            </h2>
          </div>
          <button
            onClick={() => onNavigate("shop")}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#141311] hover:text-[#A9803D] transition-colors"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* ---------- SCENTS FOR EVERY SEASON ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#A9803D] uppercase">
            Curated Formulations
          </span>
          <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#141311]">
            Scents For Every Season
          </h2>
          <p className="text-[12px] text-[#7A7264] mt-1">
            Carefully balanced note profiles designed to thrive in seasonal weather dynamics.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {SEASONS.map((season) => (
            <div
              key={season.name}
              onClick={() => onNavigate("shop")}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer shadow"
            >
              <img
                src={season.image}
                alt={season.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <span className="font-display text-[20px] sm:text-[24px] font-medium tracking-wide">
                  {season.name}
                </span>
                <span className="text-[11px] text-[#E0D8C8] tracking-wide mt-1">
                  {season.note}
                </span>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#D8B46C] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- KARACHI PHYSICAL STORES SHOWCASE ---------- */}
      <section className="bg-[#FAF8F4] py-14 border-t border-b border-[#EAE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#A9803D] uppercase">
              Visit In Person
            </span>
            <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#141311]">
              Experience In Our Karachi Stores
            </h2>
            <p className="text-[12px] text-[#7A7264] mt-1">
              Test every note in person before buying. Complimentary scent consultations available daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stores.map((store) => (
              <div
                key={store.id}
                className="bg-white p-5 border border-[#E6E0D2] rounded-sm flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#A32424] mb-2">
                    <MapPin size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A9803D]">
                      {store.area}
                    </span>
                  </div>
                  <h3 className="font-display text-[15px] font-semibold text-[#141311]">
                    {store.name}
                  </h3>
                  <p className="text-[12px] text-[#6E6659] mt-1.5 leading-relaxed">
                    {store.address}
                  </p>
                  <p className="text-[11px] text-[#8C8477] mt-2 font-medium">
                    🕒 {store.timings}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE0] flex items-center justify-between">
                  <a
                    href="tel:03179145228"
                    className="text-[11px] font-bold text-[#141311] hover:text-[#A9803D] flex items-center gap-1"
                  >
                    <Phone size={12} className="text-[#A9803D]" />
                    <span>0317 9145228</span>
                  </a>
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[#A9803D] hover:text-[#141311] flex items-center gap-1 font-semibold"
                  >
                    <span>Directions</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-2 border border-[#141311] hover:bg-[#141311] hover:text-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider transition-colors rounded-sm"
            >
              <span>View All Store Information</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
