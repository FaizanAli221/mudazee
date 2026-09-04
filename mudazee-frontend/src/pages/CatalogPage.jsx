import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function CatalogPage({
  products,
  onAddToCart,
  onQuickView,
  searchQuery,
  setSearchQuery,
}) {
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Gender filter
        if (selectedGender !== "all") {
          if (selectedGender === "men" && p.category !== "men" && p.category !== "unisex") return false;
          if (selectedGender === "women" && p.category !== "women" && p.category !== "unisex") return false;
          if (selectedGender === "unisex" && p.category !== "unisex") return false;
        }

        // Category filter
        if (selectedFilter === "bestseller" && !p.isBestSeller) return false;
        if (selectedFilter === "new" && !p.isNewArrival) return false;
        if (selectedFilter === "sale" && p.badge !== "sale") return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title?.toLowerCase().includes(q);
          const matchTag = p.tag?.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchTop = p.notes?.top?.toLowerCase().includes(q);
          const matchHeart = p.notes?.heart?.toLowerCase().includes(q);
          const matchBase = p.notes?.base?.toLowerCase().includes(q);
          if (!matchTitle && !matchTag && !matchDesc && !matchTop && !matchHeart && !matchBase) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedGender, selectedFilter, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedGender("all");
    setSelectedFilter("all");
    setSortBy("featured");
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#A9803D] uppercase">
          Artisanal Collection
        </span>
        <h1 className="font-display text-[28px] sm:text-[38px] font-semibold text-[#141311]">
          All Extrait Impressions
        </h1>
        <p className="text-[13px] text-[#7A7264] leading-relaxed">
          Masterfully blended with 35% French fragrance oils. Discover impressions inspired by Creed, Tom Ford, Chanel, Dior, Bvlgari, and MFK.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#FAF8F5] border border-[#EAE4D6] p-4 rounded-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-[#141311] uppercase tracking-wider mr-2 hidden sm:inline">
              Gender:
            </span>
            {[
              { id: "all", label: "All Perfumes" },
              { id: "men", label: "Men's Collection" },
              { id: "women", label: "Women's Collection" },
              { id: "unisex", label: "Unisex Fragrances" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedGender(tab.id)}
                className={`px-3.5 py-1.5 text-[11px] font-medium tracking-wide rounded-sm transition-all whitespace-nowrap ${
                  selectedGender === tab.id
                    ? "bg-[#141311] text-white font-semibold"
                    : "bg-white border border-[#DDD6C8] text-[#5A5347] hover:border-[#141311]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={13} className="text-[#8C8477]" />
            <span className="text-[11px] font-bold text-[#141311] uppercase tracking-wider">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#DDD6C8] px-3 py-1.5 text-[11px] font-medium rounded-sm outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Matches</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#EAE4D6] text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C8477]">Quick filter:</span>
            {[
              { id: "all", label: "All" },
              { id: "bestseller", label: "⭐ Bestsellers" },
              { id: "new", label: "✨ New Batches" },
              { id: "sale", label: "🏷️ On Sale" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-2.5 py-1 rounded-sm text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                  selectedFilter === f.id
                    ? "bg-[#D8B46C] text-[#141311]"
                    : "bg-white border border-[#E0D8C8] text-[#6E6659] hover:border-[#141311]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#8C8477]">
              Showing <span className="font-bold text-[#141311]">{filteredProducts.length}</span> fragrances
            </span>
            {(selectedGender !== "all" || selectedFilter !== "all" || searchQuery) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#A32424] hover:underline"
              >
                <RotateCcw size={10} />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#FAF8F5] border border-[#EAE4D6] rounded-sm">
          <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-[#B0A89A] border border-[#E0D8C8]">
            <Search size={20} />
          </div>
          <h3 className="font-display text-[18px] font-semibold text-[#141311]">
            No fragrances matched your filters
          </h3>
          <p className="text-[12px] text-[#7A7264] max-w-sm mx-auto">
            Try resetting your search query or selecting "All Perfumes" to browse our complete collection.
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#141311] text-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#A9803D] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
}
