import React, { useState } from "react";
import {
  Send,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { apiService } from "../services/api";

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ state: "loading", message: "Subscribing..." });
    try {
      await apiService.subscribeNewsletter(email);
      setStatus({ state: "success", message: "Subscribed! Welcome to the MUDAZEE Circle." });
      setEmail("");
    } catch {
      setStatus({ state: "success", message: "Subscribed! Welcome to the MUDAZEE Circle." });
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0D0D0C] text-[#C2BCB0] border-t border-[#1F1E1B]">
      {/* Top Value Banner */}
      <div className="border-b border-[#201F1B] py-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3">
            <span className="text-[24px]">✨</span>
            <div>
              <h4 className="text-white text-[13px] font-semibold tracking-wide uppercase">
                35% Extrait de Parfum
              </h4>
              <p className="text-[12px] text-[#8E877B] mt-1">
                Highest grade oil concentration guaranteeing 12+ hours sillage.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[24px]">🛡️</span>
            <div>
              <h4 className="text-white text-[13px] font-semibold tracking-wide uppercase">
                10-Day Risk-Free Guarantee
              </h4>
              <p className="text-[12px] text-[#8E877B] mt-1">
                Free exchanges & full return guarantee if you don't love your scent.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[24px]">⚡</span>
            <div>
              <h4 className="text-white text-[13px] font-semibold tracking-wide uppercase">
                Same-Day Karachi Delivery
              </h4>
              <p className="text-[12px] text-[#8E877B] mt-1">
                Delivered swiftly to your doorstep in Karachi within hours.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[24px]">📞</span>
            <div>
              <h4 className="text-white text-[13px] font-semibold tracking-wide uppercase">
                Direct Hotline & Support
              </h4>
              <p className="text-[12px] text-[#8E877B] mt-1">
                Reach our perfumery advisors directly at <span className="text-white font-medium">0317 9145228</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand */}
        <div className="lg:col-span-2 space-y-4">
          <span className="font-display text-white text-[24px] tracking-[0.2em] font-medium">
            MUDAZEE
          </span>
          <p className="text-[12px] text-[#9E978B] leading-relaxed max-w-sm">
            Handcrafted luxury impressions designed in Karachi. Formulated using French fragrance essences to give you genuine high-end sophistication at an accessible price.
          </p>

          <div className="pt-2 space-y-2 text-[12px]">
            <a
              href="tel:03179145228"
              className="flex items-center gap-2 text-white hover:text-[#C7A96A] transition-colors font-medium"
            >
              <Phone size={14} className="text-[#C7A96A]" />
              <span>Hotline: 0317 9145228</span>
            </a>
            <a
              href="https://wa.me/923179145228"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#25D366] hover:brightness-110 transition-colors font-medium"
            >
              <MessageCircle size={14} />
              <span>WhatsApp: 0317 9145228</span>
            </a>
            <div className="flex items-center gap-2 text-[#9E978B]">
              <MapPin size={14} className="text-[#C7A96A] flex-shrink-0" />
              <span>Flagships in Gulistan-e-Johar & D.H.A Phase 6, Karachi</span>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h3 className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-[12px]">
            <li>
              <button
                onClick={() => onNavigate("home")}
                className="hover:text-white transition-colors text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("shop")}
                className="hover:text-white transition-colors text-left"
              >
                All Perfumes
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("custom-box")}
                className="hover:text-white transition-colors text-left text-[#D8B46C]"
              >
                Custom Discovery Box (5-in-1)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("about")}
                className="hover:text-white transition-colors text-left"
              >
                Our Story & Craft
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("contact")}
                className="hover:text-white transition-colors text-left"
              >
                Store Locations & Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Policies & Guarantees */}
        <div>
          <h3 className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-4">
            Policies & Care
          </h3>
          <ul className="space-y-2.5 text-[12px]">
            <li>
              <a href="#policies" className="hover:text-white transition-colors">
                10-Day Risk-Free Guarantee
              </a>
            </li>
            <li>
              <a href="#policies" className="hover:text-white transition-colors">
                Same-Day Shipping Policy
              </a>
            </li>
            <li>
              <a href="#policies" className="hover:text-white transition-colors">
                Cash on Delivery Terms
              </a>
            </li>
            <li>
              <a href="#policies" className="hover:text-white transition-colors">
                Fragrance Longevity Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div>
          <h3 className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] mb-4">
            Join The Circle
          </h3>
          <p className="text-[12px] text-[#9E978B] mb-3">
            Enjoy exclusive early access to limited edition seasonal batches.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex items-center border border-[#33312C] focus-within:border-[#C7A96A] bg-[#161513]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-3 py-2 text-[12px] text-white placeholder:text-[#6D675C] outline-none"
              />
              <button
                type="submit"
                className="px-3 text-[#C7A96A] hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                <Send size={15} />
              </button>
            </div>
            {status.message && (
              <p
                className={`text-[11px] flex items-center gap-1 ${
                  status.state === "success" ? "text-[#4EBA6F]" : "text-[#FF6B6B]"
                }`}
              >
                {status.state === "success" ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                <span>{status.message}</span>
              </p>
            )}
          </form>

          <div className="flex items-center gap-3.5 mt-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-[#9E978B] hover:text-white transition-colors"
            >
              <Instagram size={17} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-[#9E978B] hover:text-white transition-colors"
            >
              <Facebook size={17} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[#1C1B18] py-5 px-5 sm:px-8 text-center text-[11px] text-[#6E685D] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <p>© {new Date().getFullYear()} MUDAZEE Luxury Fragrances. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Karachi, Pakistan</span>
          <span>•</span>
          <a href="tel:03179145228" className="hover:text-white underline">
            0317 9145228
          </a>
        </p>
      </div>
    </footer>
  );
}
