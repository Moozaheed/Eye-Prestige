"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import ExploreGrid from "@/components/home/ExploreGrid";
import CategorySection from "@/components/home/CategorySection";
import BrandStory from "@/components/home/BrandStory";
import { useConfigStore } from "@/lib/config-store";

const DEFAULT_SECTIONS = ["sunglasses", "optical", "bluecut", "nightdrive", "daywear", "threein1"];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const homeSections = useConfigStore((s) => s.homeSections);
  const itemsPerSection = useConfigStore((s) => s.itemsPerSection);

  const activeSections = mounted ? homeSections : DEFAULT_SECTIONS;

  return (
    <>
      <HeroBanner />

      {/* Lens divider */}
      <div className="flex items-center gap-3.5 px-7 py-8">
        <div className="h-px flex-1 bg-hairline" />
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] flex-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.3}
        >
          <circle cx="12" cy="12" r="7.5" />
        </svg>
        <div className="h-px flex-1 bg-hairline" />
      </div>

      <ExploreGrid />

      {activeSections.map((key) => (
        <CategorySection key={key} categoryKey={key} limit={mounted ? Math.max(itemsPerSection, 10) : 10} />
      ))}

      <BrandStory />
    </>
  );
}
