"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    const filtered = list.filter((p) => p.category === categoryKey && !p.disabled);

    // Sort logic:
    // 1. Featured items (with featuredOrder) first, sorted by featuredOrder asc.
    // 2. The rest sorted randomly!
    const featuredItems = filtered
      .filter((p) => typeof p.featuredOrder === "number" && !isNaN(p.featuredOrder))
      .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));

    const randomItems = filtered.filter((p) => typeof p.featuredOrder !== "number" || isNaN(p.featuredOrder));

    // Simple shuffle for random items (only shuffle after mounting to avoid SSR hydration mismatch)
    const shuffledRandom = mounted
      ? [...randomItems].sort(() => Math.random() - 0.5)
      : randomItems;

    return [...featuredItems, ...shuffledRandom].slice(0, limit);
  }, [storeProducts, categoryKey, limit, mounted]);

  const displayName = categoryItem
    ? (isBn ? categoryItem.nameBn || categoryItem.name : categoryItem.name)
    : (t.categories[categoryKey as keyof typeof t.categories] || categoryKey);

  if (activeProducts.length === 0) return null;

  return (
    <section className="py-8 border-b border-hairline/25 last:border-0">
      <div className="mb-6 flex flex-col px-6 md:px-10">
        <div className="flex items-baseline justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-mute flex-none select-none">✦</span>
            <h3 className="display text-[22px] font-[440] tracking-wide">{displayName}</h3>
          </div>
          <Link
            href={`/shop?category=${categoryKey}`}
            className="flex items-center gap-[5px] whitespace-nowrap rounded-pill border border-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-section text-ink hover:bg-ink hover:text-white transition-all"
          >
            {t.home.viewAll}
            <ArrowRight size={12} />
          </Link>
        </div>
        {/* Underline */}
        <div className="h-[1.5px] w-20 bg-ink mt-2.5" />
      </div>

      <div className="relative">
        {/* Scroll Track container */}
        <div
          className="flex snap-x snap-mandatory gap-3.5 md:gap-4 overflow-x-auto pb-4 pt-1 px-6 md:px-10 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="carousel" />
          ))}
        </div>
      </div>
    </section>
  );
}
