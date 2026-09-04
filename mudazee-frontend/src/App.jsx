import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Star,
  MapPin,
  ExternalLink,
  Instagram,
  Facebook,
  Send,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { apiService } from "./services/api";

/* ------------------------------------------------------------------ */
/*  FALLBACK / SEED DATA                                              */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "All Products", href: "#all" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Testers", href: "#" },
  { label: "Men's Perfume", href: "#mens" },
  { label: "Women's Perfume", href: "#womens" },
];

const DEFAULT_PRODUCTS = [
  {
    id: "p01",
    title: "Executive",
    tag: "Impression of Aventus — Creed",
    price: 3200,
    originalPrice: 3600,
    rating: 4.8,
    reviews: 214,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["new", "men", "bestseller"],
  },
  {
    id: "p02",
    title: "Black",
    tag: "Impression of Bleu — Chanel",
    price: 2950,
    originalPrice: 3300,
    rating: 4.7,
    reviews: 168,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["new", "men"],
  },
  {
    id: "p03",
    title: "White Oud",
    tag: "Impression of Oud Wood — Tom Ford",
    price: 3450,
    originalPrice: null,
    rating: 4.9,
    reviews: 301,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80&auto=format&fit=crop",
    badge: "soldout",
    categories: ["new"],
  },
  {
    id: "p04",
    title: "Prestige",
    tag: "Impression of Sauvage — Dior",
    price: 3100,
    originalPrice: 3500,
    rating: 4.6,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1595425964272-6b3159efe4c1?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["new", "men"],
  },
  {
    id: "p05",
    title: "Royal Citrus",
    tag: "Impression of Acqua di Giò — Armani",
    price: 2800,
    originalPrice: null,
    rating: 4.5,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80&auto=format&fit=crop",
    badge: null,
    categories: ["new", "men"],
  },
  {
    id: "p06",
    title: "Office",
    tag: "Impression of Coconut Splash — Zara",
    price: 2450,
    originalPrice: 2850,
    rating: 4.4,
    reviews: 132,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["bestseller", "men"],
  },
  {
    id: "p08",
    title: "Sultan",
    tag: "Impression of Homme Intense — Bvlgari",
    price: 3050,
    originalPrice: null,
    rating: 4.7,
    reviews: 176,
    image: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600&q=80&auto=format&fit=crop",
    badge: null,
    categories: ["bestseller", "men"],
  },
  {
    id: "p09",
    title: "Rose Zeeba",
    tag: "Impression of Delina — Parfums de Marly",
    price: 3300,
    originalPrice: 3700,
    rating: 4.9,
    reviews: 258,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["bestseller", "women"],
  },
  {
    id: "p10",
    title: "Flora Poison",
    tag: "Impression of Flora — Gucci",
    price: 2900,
    originalPrice: null,
    rating: 4.6,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1615368144592-05aa4ba51454?w=600&q=80&auto=format&fit=crop",
    badge: "soldout",
    categories: ["bestseller", "women"],
  },
  {
    id: "p11",
    title: "Jade",
    tag: "Impression of Jadore — Dior",
    price: 3150,
    originalPrice: 3500,
    rating: 4.8,
    reviews: 221,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["women"],
  },
  {
    id: "p12",
    title: "Bold Reign",
    tag: "Impression of Good Girl — Carolina Herrera",
    price: 3400,
    originalPrice: null,
    rating: 4.7,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80&auto=format&fit=crop",
    badge: null,
    categories: ["women"],
  },
  {
    id: "p13",
    title: "Loco Allure",
    tag: "Impression of Coco Mademoiselle — Chanel",
    price: 3250,
    originalPrice: 3650,
    rating: 4.9,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1621172533935-cbe0f77bb0f0?w=600&q=80&auto=format&fit=crop",
    badge: "sale",
    categories: ["women"],
  },
];

const SEASONS = [
  {
    name: "Summer",
    note: "Citrus & sea salt",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80&auto=format&fit=crop",
  },
  {
    name: "Winter",
    note: "Amber & warm musk",
    image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=500&q=80&auto=format&fit=crop",
  },
  {
    name: "Spring",
    note: "White florals",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500&q=80&auto=format&fit=crop",
  },
  {
    name: "Fall",
    note: "Spice & vetiver",
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=500&q=80&auto=format&fit=crop",
  },
];

const DEFAULT_STORES = [
  {
    name: "Gulistan-e-Johar",
    address: "Rasheedabad Chowrangi No. 2, Block 8, Karachi",
    mapUrl: "https://maps.google.com",
  },
  {
    name: "D.H.A Karachi",
    address: "23-C, Khayaban-e-Sehar, Phase 6, Karachi",
    mapUrl: "https://maps.google.com",
  },
  {
    name: "North Nazimabad",
    address: "Al Hasan Chowrangi, Block P, Karachi",
    mapUrl: "https://maps.google.com",
  },
  {
    name: "Malir Cantonment",
    address: "Sadiq Plaza, Sir Shah Suleman Rd, Karachi",
    mapUrl: "https://maps.google.com",
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                           */
/* ------------------------------------------------------------------ */

function formatPKR(value) {
  if (value === undefined || value === null) return "";
  const num = typeof value === "number" ? value : parseFloat(value);
  return `Rs.${num.toLocaleString("en-PK")}.00`;
}

function Stars({ rating = 5 }) {
  const rounded = Math.round(Number(rating) || 5);
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          strokeWidth={1.5}
          className={i < rounded ? "fill-[#A9803D] text-[#A9803D]" : "fill-none text-[#D8D3C8]"}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PRODUCT CARD                                                      */
/* ------------------------------------------------------------------ */

function ProductCard({ product, onAddToCart }) {
  const isSoldOut = product.badge === "soldout" || product.isSoldOut;
  const price = product.price ?? product.salePrice ?? product.originalPrice;
  const originalPrice = product.originalPrice && product.salePrice ? product.originalPrice : null;

  return (
    <div className="group flex-shrink-0 w-[168px] sm:w-[210px] flex flex-col justify-between">
      <div>
        <div className="relative border border-[#E7E2D8] bg-[#F6F3EE] overflow-hidden aspect-[4/5]">
          <img
            src={product.image || (product.images && product.images[0]) || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80&auto=format&fit=crop"}
            alt={product.title}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
              isSoldOut ? "opacity-50 grayscale" : ""
            }`}
          />
          {product.badge && (
            <span
              className={`absolute top-2 left-2 px-2 py-1 text-[10px] tracking-wide font-medium ${
                isSoldOut ? "bg-[#141311] text-white" : "bg-[#A32424] text-white"
              }`}
            >
              {isSoldOut ? "Sold Out" : "Sale"}
            </span>
          )}
        </div>

        <div className="pt-3 space-y-1">
          <h3 className="text-[13px] font-semibold text-[#141311] tracking-tight truncate">
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating || product.ratingAvg || 4.8} />
            <span className="text-[11px] text-[#8A8072]">
              ({product.reviews || product.reviewCount || 100})
            </span>
          </div>
          <p className="text-[11px] text-[#8A8072] leading-snug line-clamp-1">
            {product.tag || product.impressionOf || "Luxury Designer Impression"}
          </p>

          <div className="flex items-baseline gap-2 pt-0.5">
            {originalPrice && (
              <span className="text-[12px] text-[#B4AC9C] line-through">
                {formatPKR(originalPrice)}
              </span>
            )}
            <span className="text-[13px] font-semibold text-[#141311]">
              {formatPKR(price)}
            </span>
          </div>
          {originalPrice && price && (
            <p className="text-[11px] text-[#A32424] font-medium">
              Save {formatPKR(Number(originalPrice) - Number(price))}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onAddToCart && onAddToCart(product)}
        disabled={isSoldOut}
        className={`mt-3 w-full py-2 text-[11px] font-medium tracking-wide uppercase transition-colors border ${
          isSoldOut
            ? "border-[#E0DBD0] text-[#A0988A] cursor-not-allowed bg-[#F9F7F4]"
            : "border-[#141311] text-[#141311] hover:bg-[#141311] hover:text-white"
        }`}
      >
        {isSoldOut ? "Out of Stock" : "Add to Bag"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PRODUCT SHELF                                                     */
/* ------------------------------------------------------------------ */

function ProductShelf({ id, title, products, onAddToCart }) {
  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="px-5 sm:px-8 py-10 border-t border-[#EDE9DF]">
      <div className="flex items-end justify-between mb-5 max-w-7xl mx-auto">
        <h2 className="text-[15px] sm:text-[17px] font-semibold tracking-[0.08em] text-[#141311]">
          {title}
        </h2>
        <button className="flex items-center gap-1 text-[12px] font-medium text-[#8A8072] hover:text-[#141311] transition-colors">
          View all
          <ChevronRight size={13} />
        </button>
      </div>
      <div className="max-w-7xl mx-auto flex gap-4 sm:gap-6 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN APP COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [stores, setStores] = useState(DEFAULT_STORES);
  const [backendOnline, setBackendOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState({ state: "idle", message: "" });

  // Connect to Backend on mount
  useEffect(() => {
    async function initData() {
      // 1. Health check
      try {
        const health = await apiService.checkHealth();
        if (health && health.success) {
          setBackendOnline(true);
        }
      } catch (err) {
        console.warn("Backend not yet connected; using local mock mode.", err);
      }

      // 2. Fetch products from backend
      try {
        const res = await apiService.getProducts();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (e) {
        console.log("Using default catalog for products:", e.message);
      }

      // 3. Fetch stores from backend
      try {
        const storesRes = await apiService.getStores();
        if (storesRes?.data && Array.isArray(storesRes.data) && storesRes.data.length > 0) {
          const formatted = storesRes.data.map((s) => ({
            name: s.branchName,
            address: s.address,
            mapUrl: s.googleMapsUrl || "https://maps.google.com",
          }));
          setStores(formatted);
        }
      } catch (e) {
        console.log("Using default stores:", e.message);
      }
    }

    initData();
  }, []);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setNewsletterStatus({ state: "loading", message: "Subscribing..." });

    try {
      await apiService.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus({
        state: "success",
        message: "Thank you for subscribing! Check your inbox for exclusive offers.",
      });
      setNewsletterEmail("");
    } catch (err) {
      // If backend is not running, gracefully simulate success for local preview
      if (!backendOnline) {
        setNewsletterStatus({
          state: "success",
          message: "Subscribed! (Local preview mode: backend offline)",
        });
        setNewsletterEmail("");
      } else {
        setNewsletterStatus({
          state: "error",
          message: err.message || "Could not subscribe. Please try again.",
        });
      }
    }
  };

  // Filter products by category/search
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.impressionOf?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const newArrivals = filteredProducts.filter((p) => p.categories?.includes("new") || p.isNewArrival);
  const bestSellers = filteredProducts.filter((p) => p.categories?.includes("bestseller") || p.isBestSeller);
  const mens = filteredProducts.filter(
    (p) => p.categories?.includes("men") || p.genderCategory === "MEN" || p.genderCategory === "UNISEX"
  );
  const womens = filteredProducts.filter(
    (p) => p.categories?.includes("women") || p.genderCategory === "WOMEN" || p.genderCategory === "UNISEX"
  );

  return (
    <div className="min-h-screen bg-white text-[#141311] font-sans antialiased">
      {/* ---------- TOP NOTIFICATION BAR ---------- */}
      <div className="bg-[#141311] text-white text-[11px] tracking-wide">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-9 flex items-center justify-between">
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-8 whitespace-nowrap">
              <span>Within 10 days risk-free shopping</span>
              <span className="hidden sm:inline text-[#8A8072]">•</span>
              <span className="hidden sm:inline">Same-day delivery in Karachi</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pl-4">
            {/* Backend connection indicator badge */}
            <div
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                backendOnline ? "bg-[#1E3A23] text-[#78E08F]" : "bg-[#2D2A26] text-[#C0B9AC]"
              }`}
              title={backendOnline ? "Connected to mudazee-backend API" : "Backend offline (using mock fallback)"}
            >
              <Activity size={11} className={backendOnline ? "animate-pulse" : ""} />
              <span>{backendOnline ? "API Live" : "API Offline"}</span>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="hover:text-[#C7A96A] transition-colors">
                <Facebook size={13} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[#C7A96A] transition-colors">
                <Instagram size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- HEADER ---------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#EDE9DF]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="h-16 grid grid-cols-3 items-center">
            <div className="flex items-center gap-4">
              <button
                className="sm:hidden text-[#141311]"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
              <button
                className="text-[#141311] hover:text-[#C7A96A] transition-colors"
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex justify-center">
              <a href="#" className="font-display text-[22px] sm:text-[26px] tracking-[0.18em] font-medium text-[#141311]">
                MUDAZEE
              </a>
            </div>

            <div className="flex items-center justify-end gap-4 sm:gap-5">
              <button className="hidden sm:flex text-[#141311] hover:text-[#C7A96A] transition-colors" aria-label="Account">
                <User size={18} strokeWidth={1.5} />
              </button>
              <button className="relative text-[#141311] hover:text-[#C7A96A] transition-colors" aria-label="Bag">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#A32424] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar slide down */}
          {showSearch && (
            <div className="py-3 border-t border-[#EDE9DF] flex items-center gap-3">
              <Search size={16} className="text-[#8A8072]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes by impression, name, or note..."
                className="w-full text-[13px] bg-transparent outline-none placeholder:text-[#A0988A]"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-xs text-[#8A8072] hover:text-[#141311]">
                  Clear
                </button>
              )}
            </div>
          )}

          <nav className="hidden sm:flex justify-center gap-8 h-11 items-center border-t border-[#EDE9DF]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] tracking-[0.06em] font-medium text-[#5A5347] hover:text-[#141311] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ---------- MOBILE DRAWER ---------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[78%] max-w-xs bg-white shadow-xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-5 border-b border-[#EDE9DF]">
              <span className="font-display text-[18px] tracking-[0.14em]">MUDAZEE</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-5 py-3 text-[13px] font-medium text-[#141311] border-b border-[#F3F1EA]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ---------- HERO ---------- */}
      <section className="px-5 sm:px-8 pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl relative bg-[#141311] overflow-hidden">
          <div className="grid sm:grid-cols-2 items-stretch min-h-[360px] sm:min-h-[440px]">
            <div className="flex flex-col justify-center px-6 sm:px-12 py-10 sm:py-0 z-10">
              <p className="text-[11px] tracking-[0.2em] text-[#C7A96A] font-medium mb-4">
                New Arrival Sale
              </p>
              <h1 className="font-display text-white text-[34px] sm:text-[52px] leading-[1.05] mb-5">
                Up to 25% off
                <br />
                the new collection
              </h1>
              <p className="text-[#B8B2A4] text-[13px] max-w-xs mb-7">
                Long-lasting impressions of the fragrances you love, at a fraction of the price.
              </p>
              <a
                href="#new-arrivals"
                className="w-fit bg-white text-[#141311] text-[12px] font-semibold tracking-wide px-6 py-3 hover:bg-[#C7A96A] hover:text-white transition-colors"
              >
                Shop the sale
              </a>
            </div>
            <div className="relative min-h-[220px] sm:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1615368144592-05aa4ba51454?w=900&q=80&auto=format&fit=crop"
                alt="MUDAZEE new arrival perfume bottles"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#141311] via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#141311]/40 sm:via-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRODUCT SHELVES ---------- */}
      <ProductShelf
        id="new-arrivals"
        title="New Arrival Sale"
        products={newArrivals}
        onAddToCart={handleAddToCart}
      />
      <ProductShelf
        id="all"
        title="Best Selling Perfumes"
        products={bestSellers}
        onAddToCart={handleAddToCart}
      />
      <ProductShelf
        id="mens"
        title="Men's Perfume"
        products={mens}
        onAddToCart={handleAddToCart}
      />
      <ProductShelf
        id="womens"
        title="Women's Perfume"
        products={womens}
        onAddToCart={handleAddToCart}
      />

      {/* ---------- STORE LOCATIONS ---------- */}
      <section className="px-5 sm:px-8 py-12 border-t border-[#EDE9DF] bg-[#F6F3EE]">
        <h2 className="text-center text-[16px] sm:text-[18px] font-semibold tracking-[0.1em] mb-8">
          Store Locations
        </h2>
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((store) => (
            <a
              key={store.name}
              href={store.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group bg-white border border-[#E7E2D8] flex flex-col"
            >
              <div className="relative h-28 bg-[#EAE5D9] overflow-hidden">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 100">
                  <defs>
                    <pattern id={`grid-${store.name}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D8D0BC" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="300" height="100" fill={`url(#grid-${store.name})`} />
                  <path d="M0 60 L120 55 L180 70 L300 62" stroke="#C7A96A" strokeWidth="3" fill="none" opacity="0.7" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={22} strokeWidth={1.5} className="text-[#A32424]" />
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#141311]">{store.name}</p>
                  <p className="text-[11px] text-[#8A8072] mt-0.5">{store.address}</p>
                </div>
                <ExternalLink
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#8A8072] group-hover:text-[#141311] transition-colors mt-0.5 flex-shrink-0"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- SEASONAL COLLECTIONS ---------- */}
      <section className="px-5 sm:px-8 py-12 border-t border-[#EDE9DF]">
        <h2 className="text-center text-[16px] sm:text-[18px] font-semibold tracking-[0.1em] mb-8">
          Scents For Every Season
        </h2>
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {SEASONS.map((season) => (
            <button key={season.name} className="group relative aspect-[3/4] overflow-hidden">
              <img
                src={season.image}
                alt={season.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="font-display text-[18px] sm:text-[22px] tracking-wide">
                  {season.name}
                </span>
                <span className="text-[10px] tracking-[0.1em] text-white/80 mt-1">
                  {season.note}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-[#0f0f0f] text-[#B8B2A4]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-4 gap-10">
          <div>
            <span className="font-display text-white text-[19px] tracking-[0.14em]">
              MUDAZEE
            </span>
            <p className="text-[12px] leading-relaxed mt-4 max-w-[220px]">
              Karachi-crafted fragrance impressions, formulated for lasting wear and
              made accessible without compromise.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[12px] font-semibold tracking-[0.08em] mb-4">
              Our Policies
            </h3>
            <ul className="space-y-2 text-[12px]">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-[12px] font-semibold tracking-[0.08em] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-[12px]">
              <li><a href="#all" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#mens" className="hover:text-white transition-colors">Men's Perfume</a></li>
              <li><a href="#womens" className="hover:text-white transition-colors">Women's Perfume</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-[12px] font-semibold tracking-[0.08em] mb-4">
              Sign Up And Save
            </h3>
            <p className="text-[12px] mb-3">Get first access to new arrivals and offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center border border-[#333] focus-within:border-[#C7A96A]">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-transparent px-3 py-2.5 text-[12px] text-white placeholder:text-[#6B6558] outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus.state === "loading"}
                  className="px-3 text-white hover:text-[#C7A96A] transition-colors"
                  aria-label="Subscribe"
                >
                  <Send size={15} strokeWidth={1.5} />
                </button>
              </div>

              {newsletterStatus.message && (
                <div
                  className={`flex items-center gap-1.5 text-[11px] ${
                    newsletterStatus.state === "success"
                      ? "text-[#4EBA6F]"
                      : newsletterStatus.state === "error"
                      ? "text-[#FF6B6B]"
                      : "text-[#B8B2A4]"
                  }`}
                >
                  {newsletterStatus.state === "success" && <CheckCircle size={13} />}
                  {newsletterStatus.state === "error" && <AlertCircle size={13} />}
                  <span>{newsletterStatus.message}</span>
                </div>
              )}
            </form>

            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#242424] py-5 text-center text-[11px] text-[#6B6558]">
          © {new Date().getFullYear()} MUDAZEE. All rights reserved.
        </div>
      </footer>

      {/* ---------- FLOATING ACTIONS ---------- */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-30 bg-[#25D366] text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7.01A9.86 9.86 0 0 0 12.04 2m0 1.8a8.1 8.1 0 0 1 5.73 2.37 8.07 8.07 0 0 1 2.38 5.74c0 4.47-3.64 8.1-8.12 8.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.17-3.14.82.84-3.06-.19-.32a8.06 8.06 0 0 1-1.24-4.31c0-4.48 3.65-8.04 8.17-8.04M8.53 6.98c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.8 4.31 3.82.6.24 1.06.38 1.43.48.6.16 1.14.14 1.57.08.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.37-.78-1.87-.2-.48-.4-.42-.56-.43z" />
        </svg>
      </a>
      <a
        href="#new-arrivals"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-5 sm:translate-x-0 z-30 bg-[#141311] text-white text-[11px] font-semibold tracking-wide px-5 py-3 rounded-full shadow-lg hover:bg-[#C7A96A] transition-colors"
      >
        Shop Best Sellers
      </a>
    </div>
  );
}
