import React, { useState } from "react";
import {
  X,
  CheckCircle,
  Truck,
  ShieldCheck,
  Phone,
  MessageCircle,
  Copy,
} from "lucide-react";

function formatPKR(val) {
  if (!val) return "Rs.0";
  return `Rs.${Number(val).toLocaleString("en-PK")}`;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  totalAmount,
  onClearCart,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Karachi",
    address: "",
    notes: "",
    paymentMethod: "cod",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isKarachi = formData.city === "Karachi";
  const shippingFee = isKarachi ? 0 : 200;
  const grandTotal = totalAmount + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    const generatedId = `MDZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    onClearCart();
  };

  const copyTracking = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl shadow-2xl z-10 my-auto border border-[#EDE8DE] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EDE8DE] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h2 className="font-display text-[18px] font-semibold text-[#141311]">
              {orderPlaced ? "Order Confirmation" : "Complete Your Order"}
            </h2>
            <p className="text-[11px] text-[#8C8271]">
              {orderPlaced ? "Thank you for choosing MUDAZEE" : "Cash on Delivery Available Nationwide"}
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-[#8C8271] hover:text-[#141311]">
            <X size={20} />
          </button>
        </div>

        {orderPlaced ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle size={36} />
            </div>

            <div>
              <h3 className="font-display text-[22px] font-semibold text-[#141311]">
                Your Order Has Been Placed!
              </h3>
              <p className="text-[13px] text-[#6E6659] mt-1">
                We have received your order. Our team will verify your address via call/SMS before dispatching.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#ECE6D8] rounded max-w-sm mx-auto text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#8C8271]">Tracking ID:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-[#141311] text-[13px]">{orderId}</span>
                  <button onClick={copyTracking} className="text-[#8C8271] hover:text-[#141311]">
                    <Copy size={13} />
                  </button>
                </div>
              </div>
              {copied && <p className="text-[10px] text-[#2E7D32] text-right">Copied to clipboard!</p>}
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#8C8271]">Total Payable:</span>
                <span className="font-bold text-[#141311]">{formatPKR(grandTotal)} (COD)</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#8C8271]">Estimated Delivery:</span>
                <span className="font-medium text-[#141311]">
                  {isKarachi ? "Same-Day (within 24 hours)" : "2–3 Working Days"}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20just%20placed%20order%20%23${orderId}%20for%20${formData.name}.%20Please%20confirm%20my%20order.`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-[12px] font-bold rounded hover:brightness-105 transition-all shadow"
              >
                <MessageCircle size={15} />
                <span>Confirm Instantly on WhatsApp (0317 9145228)</span>
              </a>

              <button
                onClick={onClose}
                className="w-full border border-[#DDD6C8] text-[#141311] py-2.5 text-[12px] font-semibold rounded hover:bg-[#FAF8F5] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faizan Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Mobile Number (for delivery confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03XX-XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                  City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-[12px] border border-[#D5CDBD] rounded-sm outline-none bg-white focus:border-[#141311]"
                >
                  <option value="Karachi">Karachi (Same-Day • Free Delivery)</option>
                  <option value="Lahore">Lahore (Rs. 200 Delivery)</option>
                  <option value="Islamabad">Islamabad (Rs. 200 Delivery)</option>
                  <option value="Rawalpindi">Rawalpindi (Rs. 200 Delivery)</option>
                  <option value="Faisalabad">Faisalabad (Rs. 200 Delivery)</option>
                  <option value="Multan">Multan (Rs. 200 Delivery)</option>
                  <option value="Peshawar">Peshawar (Rs. 200 Delivery)</option>
                  <option value="Quetta">Quetta (Rs. 200 Delivery)</option>
                  <option value="Other">Other Pakistan City (Rs. 200 Delivery)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-1">
                Complete Delivery Address (House/Flat No., Street, Area) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="House # 12-B, Street 4, Block 5, Gulshan-e-Iqbal, Karachi"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-[12px] border border-[#D5CDBD] rounded-sm outline-none focus:border-[#141311]"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D372E] mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 border border-[#141311] bg-[#FAF8F5] rounded-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                    className="accent-[#141311]"
                  />
                  <span className="text-[12px] font-semibold text-[#141311]">
                    Cash on Delivery (COD)
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 border border-[#DFD8CC] rounded-sm cursor-pointer opacity-75">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "online" })}
                    className="accent-[#141311]"
                  />
                  <span className="text-[12px] font-semibold text-[#141311]">
                    JazzCash / EasyPaisa (Direct)
                  </span>
                </label>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 bg-[#FAF8F5] border border-[#ECE6D8] rounded-sm space-y-2 text-[12px]">
              <div className="flex justify-between text-[#6E6659]">
                <span>Items Total:</span>
                <span className="font-semibold text-[#141311]">{formatPKR(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-[#6E6659]">
                <span>Shipping ({formData.city}):</span>
                <span className="font-semibold text-[#1E7E34]">
                  {shippingFee === 0 ? "FREE (Karachi)" : "Rs.200"}
                </span>
              </div>
              <div className="flex justify-between text-[15px] font-bold text-[#141311] pt-2 border-t border-[#E5DFD2]">
                <span>Total Amount to Pay:</span>
                <span>{formatPKR(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#141311] hover:bg-[#A9803D] text-white py-3.5 text-[12px] font-bold uppercase tracking-wider rounded-sm transition-all shadow-md"
            >
              Place Order — {formatPKR(grandTotal)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
