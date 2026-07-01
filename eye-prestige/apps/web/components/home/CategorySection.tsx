"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n/context";
import { useProductStore } from "@/lib/product-store";
import { useConfigStore } from "@/lib/config-store";
import type { CategoryKey } from "@/lib/types";

interface CategorySectionProps {
  categoryKey: CategoryKey;
  limit?: number;
}

export default function CategorySection({ categoryKey, limit = 10 }: CategorySectionProps) {
  const { t, locale } = useI18n();
  const isBn = locale === "bn";
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeProducts = useProductStore((s) => s.products);
  const storeCategories = useConfigStore((s) => s.categories);

  const categoryItem = useMemo(() => {
    return storeCategories.find((c) => c.key === categoryKey);
  }, [storeCategories, categoryKey]);

  const activeProducts = useMemo(() => {
    const list = mounted ? storeProducts : PRODUCTS;
    // Filter out disabled products and filter by category
    return list.filter((p) => p.category === categoryKey && !p.disabled).slice(0, limit);
  }, [storeProducts, categoryKey, limit, mounted]);

  const displayName = categoryItem
    ? (isBn ? categoryItem.nameBn || categoryItem.name : categoryItem.name)
    : (t.categories[categoryKey as keyof typeof t.categories] || categoryKey);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 240 + 16; // Card width + gap
      const scrollAmount = direction === "left" 
        ? scrollLeft - cardWidth * 2 
        : scrollLeft + cardWidth * 2;
      
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (activeProducts.length === 0) return null;

  return (
    <section className="py-8 border-b border-hairline/25 last:border-0">
      <div className="mb-4 flex items-baseline justify-between px-6 md:px-10">
        <h3 className="display text-[22px] font-[440]">{displayName}</h3>
        <Link
          href={`/shop?category=${categoryKey}`}
          className="flex items-center gap-[5px] whitespace-nowrap rounded-pill border border-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-section text-ink"
        >
          {t.home.viewAll}
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/95 border border-hairline shadow-md flex items-center justify-center text-ink hover:bg-white active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        {/* Scroll Track container */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-3.5 md:gap-4 overflow-x-auto pb-4 pt-1 px-6 md:px-10 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="carousel" />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/95 border border-hairline shadow-md flex items-center justify-center text-ink hover:bg-white active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
