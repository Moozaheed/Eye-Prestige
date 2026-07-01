"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, ArrowUpDown, Plus, Heart, Search } from "lucide-react";
import { CATEGORIES as INITIAL_CATEGORIES, PRODUCTS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n/context";
import Chip from "@/components/ui/Chip";
import FilterSheet from "@/components/product/FilterSheet";
import SortSheet from "@/components/product/SortSheet";
import { useProductStore } from "@/lib/product-store";
import { useConfigStore } from "@/lib/config-store";

const PRICE_TESTS: Record<string, (p: number) => boolean> = {
  u1500: (p) => p < 1500,
  "1500-3000": (p) => p >= 1500 && p <= 3000,
  o3000: (p) => p > 3000,
};

export default function ShopPage() {
  const [category, setCategory] = useState<string>("all");
  const [shapes, setShapes] = useState<Set<string>>(new Set());
  const [price, setPrice] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(8);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeProducts = useProductStore((s) => s.products);
  const storeCategories = useConfigStore((s) => s.categories);
  const addItem = useCartStore((s) => s.addItem);
  const { t, locale } = useI18n();
  const isBn = locale === "bn";

  const activeCategories = mounted ? storeCategories : INITIAL_CATEGORIES;

  const filtered = useMemo(() => {
    const listSource = mounted ? storeProducts : PRODUCTS;
    let list = [...listSource].filter((p) => {
      // Exclude disabled products
      if (p.disabled) return false;
      if (category !== "all" && p.category !== category) return false;
      if (shapes.size > 0 && !shapes.has(p.shape)) return false;
      if (price && PRICE_TESTS[price] && !PRICE_TESTS[price](p.price)) return false;
      return true;
    });
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, shapes, price, sort, storeProducts, mounted]);

  const displayed = filtered.slice(0, visible);
  const remaining = filtered.length - visible;
  const filterCount = shapes.size + (price ? 1 : 0);

  return (
    <>
      <div className="px-pad pt-4 text-[11px] text-mute">
        <Link href="/">{t.shop.breadcrumbHome}</Link> / <b className="font-semibold text-ink">{t.shop.title}</b>
      </div>

      <div className="px-pad pb-4 pt-2">
        <h1 className="display text-[31px] font-[480]">{t.shop.title}</h1>
        <p className="mt-1 text-[12.5px] text-mute">
          {t.shop.showing} <b className="font-semibold text-ink">{filtered.length}</b> {t.shop.styles}
        </p>
      </div>

      <div className="frosted sticky top-[63px] z-40 border-b border-hairline">
        <div className="flex gap-2 overflow-x-auto px-pad py-3">
          <Chip label={t.shop.all} active={category === "all"} onClick={() => { setCategory("all"); setVisible(8); }} />
          {activeCategories.map((cat) => {
            const labelName = isBn ? cat.nameBn || cat.name : cat.name;
            return (
              <Chip
                key={cat.key}
                label={labelName}
                active={category === cat.key}
                onClick={() => { setCategory(cat.key); setVisible(8); }}
              />
            );
          })}
        </div>
        <div className="flex border-t border-hairline">
          <button onClick={() => setFilterOpen(true)} className="flex flex-1 items-center justify-center gap-[7px] border-r border-hairline py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
            <SlidersHorizontal size={14} />
            {t.shop.filter}
            {filterCount > 0 && (
              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-ink text-[9px] font-bold text-white">{filterCount}</span>
            )}
          </button>
          <button onClick={() => setSortOpen(true)} className="flex flex-1 items-center justify-center gap-[7px] py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
            <ArrowUpDown size={14} />
            {t.shop.sort}
          </button>
        </div>
      </div>

      {displayed.length > 0 ? (
        <div className="px-pad pt-[18px] pb-1.5 md:px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {displayed.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-card border border-hairline bg-paper">
                <Link href={`/shop/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] bg-bone">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="absolute right-2 top-2 flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white/90" aria-label={t.wishlist}>
                      <Heart size={13} strokeWidth={1.7} />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); }} className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink" aria-label={t.quickAdd}>
                      <Plus size={13} className="text-white" strokeWidth={2} />
                    </button>
                  </div>
                </Link>
                <div className="px-[11px] py-2.5">
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-mute">{product.shape}</p>
                  <p className="text-[12.5px] font-semibold">{product.name}</p>
                  <p className="text-[12.5px] font-medium tabular-nums text-mute">{formatPrice(product.price)}</p>
                </div>
              </article>
            ))}
          </div>

          {remaining > 0 && (
            <div className="py-6 text-center">
              <button onClick={() => setVisible((v) => v + 8)} className="inline-flex items-center gap-2 rounded-pill border border-ink px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-section">
                {t.shop.loadMore} ({remaining} {t.shop.remaining})
              </button>
            </div>
          )}
          {remaining <= 0 && filtered.length > 8 && (
            <p className="py-6 text-center text-[11px] text-mute">{t.shop.allSeen}</p>
          )}
        </div>
      ) : (
        <div className="px-pad py-16 text-center">
          <Search size={32} className="mx-auto mb-4 opacity-35" strokeWidth={1.3} />
          <h4 className="mb-2 font-serif text-lg font-[480]">{t.shop.noMatch}</h4>
          <p className="mb-5 text-[12.5px] text-mute">{t.shop.noMatchDesc}</p>
          <button
            onClick={() => { setCategory("all"); setShapes(new Set()); setPrice(null); setVisible(8); }}
            className="inline-flex items-center gap-2 rounded-pill border border-ink px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-section"
          >
            {t.shop.clearFilters}
          </button>
        </div>
      )}

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} selectedShapes={shapes} selectedPrice={price}
        onToggleShape={(s) => { const next = new Set(shapes); if (next.has(s)) next.delete(s); else next.add(s); setShapes(next); setVisible(8); }}
        onTogglePrice={(p) => { setPrice(price === p ? null : p); setVisible(8); }}
        onClear={() => { setShapes(new Set()); setPrice(null); setVisible(8); }}
      />
      <SortSheet open={sortOpen} onClose={() => setSortOpen(false)} current={sort} onSelect={(s) => setSort(s)} />
    </>
  );
}
