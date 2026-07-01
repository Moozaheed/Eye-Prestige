"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES as INITIAL_CATEGORIES } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n/context";
import { useConfigStore } from "@/lib/config-store";

export default function ExploreGrid() {
  const { t, locale } = useI18n();
  const isBn = locale === "bn";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeCategories = useConfigStore((s) => s.categories);
  const activeCategories = mounted ? storeCategories : INITIAL_CATEGORIES;

  return (
    <section className="py-8">
      <div className="px-pad">
        <p className="eyebrow">{t.home.collection}</p>
        <h2 className="display mt-2 mb-[18px] text-[30px] font-[440]">
          {t.home.explore}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-2.5 px-pad md:grid-cols-6 md:gap-3">
        {activeCategories.map((cat) => {
          const categoryName = isBn ? cat.nameBn || cat.name : cat.name;
          return (
            <Link
              key={cat.key}
              href={`/shop?category=${cat.key}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-[13px]"
            >
              <Image
                src={cat.image}
                alt={categoryName}
                fill
                className="product-img-filter object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="tile-scrim absolute inset-0" />
              <span className="absolute inset-x-[7px] bottom-2 text-[9.5px] font-bold uppercase leading-tight tracking-[0.05em] text-white">
                {categoryName}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
