"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

interface ProductCardProps {
  product: Product;
  variant?: "carousel" | "grid";
}

export default function ProductCard({
  product,
  variant = "carousel",
}: ProductCardProps) {
  const isCarousel = variant === "carousel";
  const { t } = useI18n();

  return (
    <article
      className={`overflow-hidden rounded-card border border-hairline bg-paper ${
        isCarousel ? "w-[48%] flex-none snap-start md:w-[240px]" : ""
      }`}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div
          className={`relative bg-bone ${
            isCarousel ? "aspect-square" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes={isCarousel ? "43vw" : "(min-width: 768px) 25vw, 50vw"}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-2 top-2 flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white/90"
            aria-label={t.wishlist}
          >
            <Heart size={13} strokeWidth={1.7} className="text-ink" />
          </button>
        </div>
      </Link>
      <div className={`${isCarousel ? "px-3 py-2.5" : "px-[11px] py-2.5"}`}>
        {variant === "grid" && (
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-mute">
            {product.shape}
          </p>
        )}
        <p className="text-[12.5px] font-semibold">{product.name}</p>
        <p className="text-[12.5px] font-medium tabular-nums text-mute">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
