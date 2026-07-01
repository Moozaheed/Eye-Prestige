"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, Globe } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n/context";

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const { t, toggleLocale } = useI18n();

  function openMenu() {
    document.getElementById("mobile-nav-backdrop")?.classList.remove("opacity-0", "pointer-events-none");
    document.getElementById("mobile-nav-backdrop")?.classList.add("opacity-100", "pointer-events-auto");
    document.getElementById("mobile-nav-panel")?.classList.add("translate-x-0");
    document.getElementById("mobile-nav-panel")?.classList.remove("-translate-x-full");
    document.body.style.overflow = "hidden";
  }

  function openSearch() {
    document.getElementById("search-overlay-backdrop")?.classList.remove("opacity-0", "pointer-events-none");
    document.getElementById("search-overlay-backdrop")?.classList.add("opacity-100", "pointer-events-auto");
    document.getElementById("search-overlay-panel")?.classList.add("translate-y-0");
    document.getElementById("search-overlay-panel")?.classList.remove("-translate-y-full");
    document.body.style.overflow = "hidden";
  }

  return (
    <header className="frosted sticky top-0 z-50 flex h-16 items-center justify-between border-b border-hairline px-4">
      <div className="flex w-[100px] items-center gap-1.5">
        <button
          onClick={openMenu}
          className="flex items-center justify-center p-1.5"
          aria-label={t.menu}
        >
          <Menu size={20} strokeWidth={1.6} />
        </button>
        <span className="text-[10px] font-semibold uppercase tracking-menu">
          {t.menu}
        </span>
      </div>

      <Link href="/" className="flex items-center">
        <Image
          src="/images/Logo Black.png"
          alt="EYE PRESTIGE"
          width={130}
          height={26}
          className="h-[22px] w-auto object-contain"
          priority
        />
      </Link>

      <div className="flex w-[100px] items-center justify-end gap-3">
        <button
          onClick={toggleLocale}
          className="flex items-center justify-center gap-1 rounded-pill border border-hairline px-2 py-1 text-[10px] font-bold uppercase"
          aria-label="Switch language"
        >
          <Globe size={12} />
          {t.language}
        </button>
        <button
          onClick={openSearch}
          className="flex items-center justify-center p-1.5"
          aria-label={t.search}
        >
          <Search size={20} strokeWidth={1.6} />
        </button>
        <Link
          href="/cart"
          className="relative flex items-center justify-center p-1.5"
          aria-label={t.bag}
        >
          <ShoppingBag size={20} strokeWidth={1.6} />
          {totalItems > 0 && (
            <span className="absolute right-0 top-0 flex h-[13px] w-[13px] items-center justify-center rounded-full bg-ink text-[8px] font-bold leading-none text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
