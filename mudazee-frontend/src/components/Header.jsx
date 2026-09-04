import React, { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
  Activity,
  Sparkles,
  MapPin,
} from "lucide-react";

export default function Header({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  backendOnline,
  searchQuery,
  setSearchQuery,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "shop", label: "All Perfumes" },
    { id: "custom-box", label: "Custom Tester Box", highlight: true },
    { id: "about", label: "Our Story" },
    { id: "contact", label: "Stores & Contact" },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ---------- TOP LUXURY ANNOUNCEMENT BAR ---------- */}
      <div className="bg-[#141311] text-white text-[11px] tracking-wide border-b border-[#262420]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6 overflow-hidden text-[#C8C2B6] whitespace-nowrap">
            <span className="flex items-center gap-1 font-medium text-white">
              <Sparkles size={11} className="text-[#C7A96A]" />
              10-Day Risk-Free Shopping
            </span>
            <span className="hidden md:inline text-[#5A5347]">•</span>
            <span className="hidden md:inline">Same-day Karachi Delivery</span>
            <span className="hidden lg:inline text-[#5A5347]">•</span>
            <span className="hidden lg:inline">Extrait de Parfum (35% Oil Concentration)</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 pl-4 text-[#D8D2C5]">
            {/* Phone Hotline */}
            <a
              href="tel:03179145228"
              className="flex items-center gap-1.5 hover:text-[#C7A96A] transition-colors font-medium"
              title="Call MUDAZEE Support"
            >
              <Phone size={11} className="text-[#C7A96A]" />
              <span className="text-[11px] tracking-wider">0317-9145228</span>
            </a>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20would%20like%20to%20inquire%20about%20your%20perfumes."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[#25D366] hover:brightness-110 transition-all font-medium"
            >
              <MessageCircle size={12} />
              <span>WhatsApp</span>
            </a>

            {/* API Status Badge */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase ${
                backendOnline ? "bg-[#1E3A23] text-[#78E08F]" : "bg-[#2A2723] text-[#A69E91]"
              }`}
            >
              <Activity size={10} className={backendOnline ? "animate-pulse" : ""} />
              <span>{backendOnline ? "Live" : "Ready"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MAIN HEADER ---------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#EDE9DF] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="h-16 sm:h-20 grid grid-cols-3 items-center">
            {/* Left: Mobile menu toggle + Search */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                className="lg:hidden p-1.5 text-[#141311] hover:text-[#A9803D] transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center gap-2 text-[#141311] hover:text-[#A9803D] transition-colors p-1"
                aria-label="Search perfumes"
              >
                <Search size={18} strokeWidth={1.5} />
                <span className="hidden md:inline text-[12px] tracking-wide text-[#8A8072]">Search</span>
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex justify-center text-center">
              <button
                onClick={() => handleNavClick("home")}
                className="group flex flex-col items-center"
              >
                <span className="font-display text-[22px] sm:text-[28px] tracking-[0.22em] font-medium text-[#141311] group-hover:text-[#A9803D] transition-colors">
                  MUDAZEE
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#8A8072] -mt-1 font-medium">
                  Karachi • Artisanal Perfumery
                </span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-3 sm:gap-5">
              <a
                href="https://wa.me/923179145228"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-[#141311] hover:text-[#A9803D] border border-[#E5E0D6] px-3 py-1.5 rounded-full transition-colors"
              >
                <Phone size={12} className="text-[#A9803D]" />
                <span>0317 9145228</span>
              </a>

              <button
                onClick={onOpenCart}
                className="relative p-2 text-[#141311] hover:text-[#A9803D] transition-colors"
                aria-label="Open Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 bg-[#A32424] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Dropdown Bar */}
          {searchOpen && (
            <div className="py-3 px-1 border-t border-[#EDE9DF] flex items-center gap-3">
              <Search size={16} className="text-[#8A8072]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes by note (Oud, Citrus, Rose), impression (Aventus, Sauvage, Delina)..."
                className="w-full text-[13px] bg-transparent outline-none placeholder:text-[#9F9688] font-normal"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#8A8072] hover:text-[#141311] px-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-[#8A8072] hover:text-[#141311] p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center gap-9 h-11 items-center border-t border-[#EDE9DF]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[12px] tracking-[0.08em] uppercase transition-colors relative py-2 ${
                  currentPage === item.id
                    ? "text-[#141311] font-semibold"
                    : "text-[#6B6356] hover:text-[#141311] font-medium"
                } ${item.highlight ? "text-[#9E7833] font-semibold" : ""}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#141311]" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ---------- MOBILE DRAWER ---------- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-2xl flex flex-col justify-between">
            <div>
              <div className="h-16 flex items-center justify-between px-6 border-b border-[#EDE9DF]">
                <div>
                  <span className="font-display text-[20px] tracking-[0.16em] font-medium text-[#141311]">
                    MUDAZEE
                  </span>
                  <p className="text-[9px] text-[#8A8072] tracking-wider uppercase -mt-0.5">Karachi Fragrance House</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-[#141311]"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col py-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-6 py-3.5 text-[14px] font-medium tracking-wide border-b border-[#F5F2EB] flex items-center justify-between transition-colors ${
                      currentPage === item.id
                        ? "text-[#A9803D] bg-[#FAF8F5] font-semibold"
                        : "text-[#2A2621] hover:bg-[#F9F7F3]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="bg-[#FAF2E1] text-[#9A742F] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="p-6 bg-[#FAF8F5] border-t border-[#EDE9DF] space-y-3">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#141311]">
                <Phone size={14} className="text-[#A9803D]" />
                <a href="tel:03179145228" className="hover:underline">
                  0317 9145228
                </a>
              </div>
              <p className="text-[11px] text-[#8A8072] leading-relaxed">
                Need scent guidance or want to place an order over call? Our fragrance advisors are ready to assist you.
              </p>
              <a
                href="https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20would%20like%20to%20order."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 text-[12px] font-semibold tracking-wide rounded hover:brightness-105 transition-all shadow"
              >
                <MessageCircle size={15} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
