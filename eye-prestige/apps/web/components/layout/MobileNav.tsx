"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORIES as INITIAL_CATEGORIES } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n/context";
import { useConfigStore } from "@/lib/config-store";
import type { CategoryKey } from "@/lib/types";

export default function MobileNav() {
  const { t, locale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeCategories = useConfigStore((s) => s.categories);
  const activeCategories = mounted ? storeCategories : INITIAL_CATEGORIES;

  const storeMenuItems = useConfigStore((s) => s.menuItems);
  const activeMenuItems = mounted ? storeMenuItems : [];

  const close = useCallback(() => {
    document.getElementById("mobile-nav-backdrop")?.classList.add("opacity-0", "pointer-events-none");
    document.getElementById("mobile-nav-backdrop")?.classList.remove("opacity-100", "pointer-events-auto");
    document.getElementById("mobile-nav-panel")?.classList.add("-translate-x-full");
    document.getElementById("mobile-nav-panel")?.classList.remove("translate-x-0");
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function getCatName(key: string): string {
    const storeCat = storeCategories.find((c) => c.key === key);
    if (storeCat) {
      return locale === "bn" ? storeCat.nameBn || storeCat.name : storeCat.name;
    }
    return t.categories[key as keyof typeof t.categories] ?? key;
  }

  const isBn = locale === "bn";

  return (
    <>
      {/* Backdrop -- covers full viewport */}
      <div
        id="mobile-nav-backdrop"
        onClick={close}
        className="fixed inset-0 z-[99] bg-black/40 opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Panel -- anchored to left edge, not centered */}
      <div
        id="mobile-nav-panel"
        className="fixed inset-y-0 left-0 z-[100] w-full max-w-[400px] -translate-x-full overflow-y-auto bg-paper shadow-2xl transition-transform duration-[380ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      >
        <div className="flex h-16 items-center justify-between border-b border-hairline px-4">
          <span className="text-[10px] font-semibold uppercase tracking-menu">
            {t.menu}
          </span>
          <button onClick={close} aria-label="Close">
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>

        <nav className="px-6 py-7">
          {activeCategories.map((cat) => (
            <Link
              key={cat.key}
              href={`/shop?category=${cat.key}`}
              onClick={close}
              className="display block border-b border-hairline py-3.5 text-[26px] font-[440]"
            >
              {getCatName(cat.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 px-6 pb-8">
          {activeMenuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              onClick={close}
              className="text-xs font-semibold uppercase tracking-[0.08em] text-mute hover:text-ink transition-colors"
            >
              {isBn ? item.labelBn || item.label : item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
