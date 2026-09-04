import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle,
} from "lucide-react";

export default function ContactPage({ stores }) {
  const [inquiry, setInquiry] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setInquiry({ name: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9803D]">
          We Are Here To Assist
        </span>
        <h1 className="font-display text-[30px] sm:text-[42px] font-semibold text-[#141311]">
          Contact & Karachi Stores
        </h1>
        <p className="text-[13px] text-[#6E6659] leading-relaxed">
          Whether you need a bespoke fragrance recommendation, order tracking, or wish to visit our testing boutiques, connect with our fragrance consultants.
        </p>
      </div>

      {/* Main Contact Channels Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Hotline Card */}
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-[#A9803D] border border-[#E2DBD0] shadow-sm">
            <Phone size={20} />
          </div>
          <h3 className="font-display text-[16px] font-semibold text-[#141311]">
            Direct Phone Helpline
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            Speak with an advisor directly for orders and recommendations.
          </p>
          <a
            href="tel:03179145228"
            className="inline-block text-[15px] font-bold text-[#141311] hover:text-[#A9803D] transition-colors"
          >
            0317 9145228
          </a>
          <p className="text-[10px] text-[#9A9182] uppercase tracking-wider">
            Mon – Sun • 11:00 AM – 11:30 PM
          </p>
        </div>

        {/* WhatsApp Card */}
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-[#25D366]/10 rounded-full mx-auto flex items-center justify-center text-[#25D366] border border-[#25D366]/30 shadow-sm">
            <MessageCircle size={22} />
          </div>
          <h3 className="font-display text-[16px] font-semibold text-[#141311]">
            WhatsApp Concierge
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            Fastest response for instant order placement, video scent consultation & queries.
          </p>
          <a
            href="https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20would%20like%20to%20inquire%20about%20your%20perfumes."
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[15px] font-bold text-[#1E9A4B] hover:underline"
          >
            0317 9145228
          </a>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              🟢 Online Now
            </span>
          </div>
        </div>

        {/* Email & Corporate */}
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-[#A9803D] border border-[#E2DBD0] shadow-sm">
            <Mail size={20} />
          </div>
          <h3 className="font-display text-[16px] font-semibold text-[#141311]">
            Email & Corporate
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            For bulk gifting, corporate custom boxes, or wholesale inquiries.
          </p>
          <a
            href="mailto:contact@mudazee.com"
            className="inline-block text-[14px] font-bold text-[#141311] hover:text-[#A9803D] transition-colors"
          >
            contact@mudazee.com
          </a>
          <p className="text-[10px] text-[#9A9182] uppercase tracking-wider">
            Responses within 24 hours
          </p>
        </div>
      </div>

      {/* Karachi Stores List */}
      <div className="space-y-6">
        <div className="border-b border-[#EAE4D6] pb-3 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9803D]">
              Physical Locations
            </span>
            <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#141311]">
              Karachi Store Directory
            </h2>
          </div>
          <span className="text-[12px] text-[#7A7264] hidden sm:inline">
            4 Locations Across Karachi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-[#E5E0D4] p-6 rounded-sm shadow-sm flex flex-col justify-between space-y-4 hover:border-[#A9803D] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A9803D] bg-[#F7F3EB] px-2.5 py-0.5 rounded-sm">
                    {store.area}
                  </span>
                  {store.isMain && (
                    <span className="text-[10px] bg-[#141311] text-white px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                      Flagship
                    </span>
                  )}
                </div>
                <h3 className="font-display text-[18px] font-semibold text-[#141311]">
                  {store.name}
                </h3>
                <p className="text-[13px] text-[#6E6659] leading-relaxed flex items-start gap-2 pt-1">
                  <MapPin size={15} className="text-[#A32424] flex-shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </p>
                <p className="text-[12px] text-[#8C8477] flex items-center gap-2">
                  <Clock size={14} className="text-[#A9803D]" />
                  <span>{store.timings}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE0] flex items-center justify-between">
                <a
                  href={`tel:${store.phone}`}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#141311] hover:text-[#A9803D]"
                >
                  <Phone size={13} className="text-[#A9803D]" />
                  <span>{store.phone}</span>
                </a>

                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#A9803D] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-[#FAF8F5] border border-[#EAE4D6] p-8 sm:p-12 rounded-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-display text-[22px] font-semibold text-[#141311]">
            Send an Inquiry or Scent Question
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            Looking for an impression that isn't listed or need assistance? Leave a message below.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#E8F5E9] border border-[#C8E6C9] rounded text-center space-y-2">
            <CheckCircle className="mx-auto text-[#2E7D32]" size={32} />
            <h4 className="font-bold text-[#2E7D32] text-[15px]">Message Received!</h4>
            <p className="text-[12px] text-[#388E3C]">
              Thank you. One of our fragrance consultants will contact you at your phone number shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faizan"
                  value={inquiry.name}
                  onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] bg-white border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Contact Number (WhatsApp/Phone) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0317 9145228"
                  value={inquiry.phone}
                  onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] bg-white border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                Your Message / Scent Preference *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe what kind of perfume notes you enjoy or questions you have..."
                value={inquiry.message}
                onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                className="w-full px-3 py-2 text-[12px] bg-white border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#141311] hover:bg-[#A9803D] text-white py-3 text-[12px] font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow"
            >
              <Send size={13} />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
