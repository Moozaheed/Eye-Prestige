"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useConfigStore } from "@/lib/config-store";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const { t, locale } = useI18n();
  const isBn = locale === "bn";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeSlides = useConfigStore((s) => s.heroSlides);

  const defaultSlides = [
    {
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
      eyebrow: t.hero.eyebrow1,
      headline: t.hero.headline1,
      subtitle: t.hero.subtitle1,
      cta: "/shop",
    },
    {
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
      eyebrow: t.hero.eyebrow2,
      headline: t.hero.headline2,
      subtitle: t.hero.subtitle2,
      cta: "/shop?category=nightdrive",
    },
    {
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
      eyebrow: t.hero.eyebrow3,
      headline: t.hero.headline3,
      subtitle: t.hero.subtitle3,
      cta: "/shop?category=bluecut",
    },
  ];

  const slides = mounted
    ? storeSlides.map((s) => ({
        image: s.image,
        eyebrow: isBn ? s.eyebrowBn || s.eyebrow : s.eyebrow,
        headline: isBn ? s.headlineBn || s.headline : s.headline,
        subtitle: isBn ? s.subtitleBn || s.subtitle : s.subtitle,
        cta: s.cta,
      }))
    : defaultSlides;

  if (slides.length === 0) return null;

  // Make sure current index doesn't overflow if slides were mutated
  const safeCurrent = current >= slides.length ? 0 : current;
  const slide = slides[safeCurrent];

  return (
    <section className="px-3.5 pt-3.5">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] md:aspect-[16/7]">
        {slide && (
          <>
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority
              className="product-img-filter object-cover"
            />
            <div className="hero-scrim absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 px-[22px] pb-7 pt-6 text-white">
              <p className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-white/70">
                {slide.eyebrow}
              </p>
              <h1 className="display mt-2.5 mb-3 whitespace-pre-line text-[35px] font-[480] leading-[0.96] text-white md:text-5xl">
                {slide.headline}
              </h1>
              <p className="mb-5 max-w-[240px] text-[13.5px] tracking-[0.01em] text-white/[0.86]">
                {slide.subtitle}
              </p>
              <Link
                href={slide.cta}
                className="inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-button text-ink"
              >
                {t.hero.cta}
                <ArrowRight size={13} />
              </Link>
            </div>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === safeCurrent ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
