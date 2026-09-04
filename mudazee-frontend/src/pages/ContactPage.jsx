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
  UserCheck,
  Building2,
  Navigation,
} from "lucide-react";

export default function ContactPage({ stores }) {
  const [inquiry, setInquiry] = useState({ name: "", phone: "", branch: "Gulistan-e-Johar", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setInquiry({ name: "", phone: "", branch: "Gulistan-e-Johar", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9803D]">
          Karachi Boutique Network
        </span>
        <h1 className="font-display text-[30px] sm:text-[42px] font-semibold text-[#141311]">
          Stores & Direct Branch Contacts
        </h1>
        <p className="text-[13px] text-[#6E6659] leading-relaxed">
          Each MUDAZEE branch is managed by certified fragrance consultants equipped with testers of our full collection. Connect directly with your nearest boutique.
        </p>
      </div>

      {/* Main Central Support Channels Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Central Customer Hotline */}
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-[#A9803D] border border-[#E2DBD0] shadow-sm">
            <Phone size={20} />
          </div>
          <h3 className="font-display text-[16px] font-semibold text-[#141311]">
            Central Order Helpline
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            Main helpline for online orders, nationwide shipping & general inquiries.
          </p>
          <a
            href="tel:03179145228"
            className="inline-block text-[16px] font-bold text-[#141311] hover:text-[#A9803D] transition-colors"
          >
            0317 9145228
          </a>
          <p className="text-[10px] text-[#9A9182] uppercase tracking-wider">
            UAN / Helpline • 11:00 AM – 11:30 PM
          </p>
        </div>

        {/* WhatsApp Concierge */}
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-[#25D366]/10 rounded-full mx-auto flex items-center justify-center text-[#25D366] border border-[#25D366]/30 shadow-sm">
            <MessageCircle size={22} />
          </div>
          <h3 className="font-display text-[16px] font-semibold text-[#141311]">
            WhatsApp Concierge
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            Instant scent consultations, live product videos & quick ordering.
          </p>
          <a
            href="https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20would%20like%20to%20inquire%20about%20your%20perfumes."
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[16px] font-bold text-[#1E9A4B] hover:underline"
          >
            0317 9145228
          </a>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              🟢 Online Now
            </span>
          </div>
        </div>

        {/* Corporate & Wholesale */}
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-[#A9803D] border border-[#E2DBD0] shadow-sm">
            <Mail size={20} />
          </div>
          <h3 className="font-display text-[16px] font-semibold text-[#141311]">
            Email & Corporate Gifting
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            For wedding custom boxes, corporate gifting, or wholesale inquiries.
          </p>
          <a
            href="mailto:contact@mudazee.com"
            className="inline-block text-[14px] font-bold text-[#141311] hover:text-[#A9803D] transition-colors"
          >
            contact@mudazee.com
          </a>
          <p className="text-[10px] text-[#9A9182] uppercase tracking-wider">
            Inquiries answered within 24 hours
          </p>
        </div>
      </div>

      {/* 4 Distinct Karachi Branches with Real Contacts */}
      <div className="space-y-6">
        <div className="border-b border-[#EAE4D6] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9803D]">
              Physical Boutique Network
            </span>
            <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#141311]">
              Karachi Store Directory (4 Branches)
            </h2>
          </div>
          <p className="text-[12px] text-[#7A7264]">
            Each branch has dedicated landlines, mobile numbers & in-store supervisors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-[#E5E0D4] p-6 rounded-sm shadow-sm flex flex-col justify-between space-y-5 hover:border-[#A9803D] transition-colors"
            >
              <div className="space-y-3">
                {/* Branch Badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9803D] bg-[#F7F3EB] px-2.5 py-0.5 rounded-sm border border-[#ECE5D8]">
                      {store.branchCode || "KHI"} • {store.area}
                    </span>
                    {store.isMain && (
                      <span className="text-[10px] bg-[#141311] text-[#D8B46C] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                        Main Flagship
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#2E7D32] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                    Open Today
                  </span>
                </div>

                <h3 className="font-display text-[19px] font-semibold text-[#141311]">
                  {store.name}
                </h3>

                {/* Manager Name */}
                {store.manager && (
                  <div className="flex items-center gap-2 text-[12px] text-[#554F44] bg-[#FAF8F5] p-2 rounded-sm border border-[#EFEBE3]">
                    <UserCheck size={14} className="text-[#A9803D] flex-shrink-0" />
                    <span>
                      Incharge: <strong className="text-[#141311] font-semibold">{store.manager}</strong>
                    </span>
                  </div>
                )}

                {/* Address & Landmark */}
                <div className="space-y-1 text-[13px] text-[#6E6659] leading-relaxed">
                  <p className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#A32424] flex-shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </p>
                  {store.landmark && (
                    <p className="text-[11px] text-[#8C8477] pl-6 italic">
                      📍 Landmark: {store.landmark}
                    </p>
                  )}
                </div>

                {/* Timings */}
                <p className="text-[12px] text-[#8C8477] flex items-center gap-2">
                  <Clock size={14} className="text-[#A9803D] flex-shrink-0" />
                  <span>{store.timings}</span>
                </p>

                {/* Contact Numbers Box */}
                <div className="p-3 bg-[#FCFBF8] border border-[#ECE6DA] rounded-sm grid grid-cols-2 gap-2 text-[12px]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C8477] block">
                      Branch Mobile:
                    </span>
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, "")}`}
                      className="font-bold text-[#141311] hover:text-[#A9803D] transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C8477] block">
                      Store Landline:
                    </span>
                    <a
                      href={`tel:${store.landline}`}
                      className="font-medium text-[#4D473C] hover:text-[#141311] transition-colors"
                    >
                      {store.landline}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#F2ECE0] flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`https://wa.me/${store.whatsapp}?text=Hello%20MUDAZEE%20${encodeURIComponent(
                    store.area
                  )}%20Branch%2C%20I%20would%20like%20to%20inquire%20about%20perfumes.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E9A4B] bg-[#E8F5E9] hover:bg-[#25D366] hover:text-white px-3 py-1.5 rounded-sm transition-all"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp Branch</span>
                </a>

                <a
                  href={`tel:${store.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#141311] hover:text-[#A9803D] border border-[#DDD7CC] hover:border-[#141311] px-3 py-1.5 rounded-sm transition-all"
                >
                  <Phone size={12} className="text-[#A9803D]" />
                  <span>Call Branch</span>
                </a>

                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-bold text-[#A9803D] hover:underline px-2 py-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={12} />
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
            Send an Inquiry to Your Preferred Branch
          </h3>
          <p className="text-[12px] text-[#7A7264]">
            Have a question about bottle availability or scent reservations? Fill in your details below.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#E8F5E9] border border-[#C8E6C9] rounded text-center space-y-2">
            <CheckCircle className="mx-auto text-[#2E7D32]" size={32} />
            <h4 className="font-bold text-[#2E7D32] text-[15px]">Inquiry Received!</h4>
            <p className="text-[12px] text-[#388E3C]">
              Your message has been sent to our {inquiry.branch || "Karachi"} branch team. An advisor will contact you on WhatsApp shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faizan Ali"
                  value={inquiry.name}
                  onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] bg-white border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03XX-XXXXXXX"
                  value={inquiry.phone}
                  onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] bg-white border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                Select Nearest Branch *
              </label>
              <select
                value={inquiry.branch}
                onChange={(e) => setInquiry({ ...inquiry, branch: e.target.value })}
                className="w-full px-3 py-2 text-[12px] bg-white border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
              >
                <option value="Gulistan-e-Johar">Gulistan-e-Johar Branch (0317 9145228)</option>
                <option value="D.H.A Phase 6">D.H.A Phase 6 Boutique (0302 8245191)</option>
                <option value="North Nazimabad">North Nazimabad Center (0333 2194820)</option>
                <option value="Malir Cantonment">Malir Cantonment Studio (0345 3108422)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                Your Scent Request / Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Mention which perfume impression you are inquiring about or any custom request..."
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
              <span>Submit Branch Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
