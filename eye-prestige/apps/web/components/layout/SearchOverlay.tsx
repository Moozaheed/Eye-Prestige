"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

const SUGGESTIONS = [
  "Aviator",
  "Bluecut",
  "Round",
  "Night Drive",
  "Cat-Eye",
];

export default function SearchOverlay() {
  const [query, setQuery] = useState("");
  const { t } = useI18n();

  const close = useCallback(() => {
    document.getElementById("search-overlay-backdrop")?.classList.add("opacity-0", "pointer-events-none");
    document.getElementById("search-overlay-backdrop")?.classList.remove("opacity-100", "pointer-events-auto");
    document.getElementById("search-overlay-panel")?.classList.add("-translate-y-full");
    document.getElementById("search-overlay-panel")?.classList.remove("translate-y-0");
    document.body.style.overflow = "";
    setQuery("");
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        id="search-overlay-backdrop"
        onClick={close}
        className="fixed inset-0 z-[99] bg-black/40 opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Panel -- anchored to top edge, full width, not centered with mx-auto */}
      <div
        id="search-overlay-panel"
        className="fixed inset-x-0 top-0 z-[100] max-h-[80vh] -translate-y-full overflow-y-auto bg-paper shadow-2xl transition-transform duration-[320ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="flex h-16 items-center justify-between border-b border-hairline px-4">
            <span className="text-[10px] font-semibold uppercase tracking-menu">
              {t.search}
            </span>
            <button onClick={close} aria-label="Close">
              <X size={20} strokeWidth={1.6} />
            </button>
          </div>

          <div className="px-4 pt-[18px] pb-6">
            <div className="flex items-center gap-2.5 border-b-2 border-ink pb-2.5">
              <Search size={18} strokeWidth={1.6} className="text-mute" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full border-none bg-transparent font-serif text-[21px] text-ink outline-none placeholder:text-[#C7C3BB]"
              />
            </div>

            <div className="mt-[22px]">
              <p className="eyebrow mb-3">{t.popularSearch}</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <Link
                    key={s}
                    href={`/shop?search=${encodeURIComponent(s)}`}
                    onClick={close}
                    className="rounded-pill border border-hairline px-3.5 py-2 text-[11.5px] font-medium tracking-[0.04em] text-ink"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
