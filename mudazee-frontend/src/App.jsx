import React, { useState, useEffect } from "react";
import { PRODUCTS_DATA, STORES_DATA } from "./data/products";
import { apiService } from "./services/api";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CustomBoxPage from "./pages/CustomBoxPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [stores, setStores] = useState(STORES_DATA);
  const [backendOnline, setBackendOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mudazee_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem("mudazee_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Backend sync check
  useEffect(() => {
    async function checkBackend() {
      try {
        const health = await apiService.checkHealth();
        if (health?.success) {
          setBackendOnline(true);
        }
      } catch {
        setBackendOnline(false);
      }

      // Try fetching stores from backend
      try {
        const storeRes = await apiService.getStores();
        if (storeRes?.data && Array.isArray(storeRes.data) && storeRes.data.length > 0) {
          const mapped = storeRes.data.map((s) => ({
            id: s.id,
            name: s.branchName,
            area: s.city || "Karachi",
            address: s.address,
            phone: s.contactNumber || "03179145228",
            timings: "1:00 PM – 11:30 PM",
            mapUrl: s.googleMapsUrl || "https://maps.google.com",
            isMain: false,
          }));
          setStores(mapped);
        }
      } catch (e) {
        // Fallback to rich stores data
      }
    }

    checkBackend();
  }, []);

  // Cart Handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) => i.id === product.id && i.selectedSize === product.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            selectedSize: product.selectedSize || "50ml Flacon",
          },
        ];
      }
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, selectedSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenCheckout = (total) => {
    setCheckoutTotal(total);
    setCheckoutOpen(true);
  };

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#141311] flex flex-col justify-between selection:bg-[#D8B46C] selection:text-black">
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        backendOnline={backendOnline}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentPage !== "shop") {
            setCurrentPage("shop");
          }
        }}
      />

      {/* Main Pages Router */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            products={products}
            stores={stores}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "shop" && (
          <CatalogPage
            products={products}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentPage === "custom-box" && (
          <CustomBoxPage
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === "about" && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === "contact" && (
          <ContactPage stores={stores} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Quick View Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleOpenCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotal}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Action with Contact Hotline 0317 9145228 */}
      <a
        href="https://wa.me/923179145228?text=Hello%20MUDAZEE%2C%20I%20would%20like%20to%20inquire%20about%20your%20perfumes."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Chat on WhatsApp (0317 9145228)"
        title="WhatsApp Support: 0317 9145228"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7.01A9.86 9.86 0 0 0 12.04 2m0 1.8a8.1 8.1 0 0 1 5.73 2.37 8.07 8.07 0 0 1 2.38 5.74c0 4.47-3.64 8.1-8.12 8.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.17-3.14.82.84-3.06-.19-.32a8.06 8.06 0 0 1-1.24-4.31c0-4.48 3.65-8.04 8.17-8.04M8.53 6.98c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.8 4.31 3.82.6.24 1.06.38 1.43.48.6.16 1.14.14 1.57.08.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.37-.78-1.87-.2-.48-.4-.42-.56-.43z" />
        </svg>
      </a>

      {/* Mobile Floating Quick Navigation Pill */}
      {currentPage !== "shop" && (
        <button
          onClick={() => handleNavigate("shop")}
          className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 bg-[#141311] text-white text-[11px] font-bold uppercase tracking-wider px-5 py-3 rounded-full shadow-2xl border border-[#3A352D]"
        >
          Explore All Perfumes
        </button>
      )}
    </div>
  );
}
