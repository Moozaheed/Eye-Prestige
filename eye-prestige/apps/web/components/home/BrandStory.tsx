"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useConfigStore } from "@/lib/config-store";

export default function BrandStory() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { t, locale } = useI18n();
  const isBn = locale === "bn";

  const storeBrandStory = useConfigStore((s) => s.brandStory);

  const eyebrow = mounted
    ? (isBn ? storeBrandStory.eyebrowBn || storeBrandStory.eyebrow : storeBrandStory.eyebrow)
    : t.home.brandStoryEyebrow;

  const title = mounted
    ? (isBn ? storeBrandStory.titleBn || storeBrandStory.title : storeBrandStory.title)
    : t.home.brandStoryTitle;

  const description = mounted
    ? (isBn ? storeBrandStory.descriptionBn || storeBrandStory.description : storeBrandStory.description)
    : t.home.brandStoryDesc;

  const ctaText = mounted
    ? (isBn ? storeBrandStory.ctaTextBn || storeBrandStory.ctaText : storeBrandStory.ctaText)
    : t.home.brandStoryCta;

  const ctaLink = mounted ? storeBrandStory.ctaLink : "/shop";

  return (
    <section className="mx-6 my-8 flex flex-col items-center justify-between gap-6 rounded-card bg-bone px-6 py-10 md:mx-10 md:flex-row md:items-center md:px-14">
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="display whitespace-pre-line text-[24px] font-[480] leading-tight md:text-[30px]">
          {title}
        </h2>
        <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-mute">
          {description}
        </p>
      </div>
      <Link
        href={ctaLink}
        className="inline-flex flex-none items-center gap-2 rounded-pill border border-ink px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-button text-ink"
      >
        {ctaText}
        <ArrowRight size={13} />
      </Link>
    </section>
  );
}
