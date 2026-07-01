"use client";

import ProductCard from "./ProductCard";
import { Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="grid grid-cols-2 gap-3 px-pad md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="relative overflow-hidden rounded-card border border-hairline bg-paper"
        >
          <ProductCard product={product} variant="grid" />
          <button
            onClick={() => addItem(product)}
            className="absolute bottom-[58px] right-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink"
            aria-label="Quick add"
          >
            <Plus size={13} className="text-white" strokeWidth={2} />
          </button>
        </article>
      ))}
    </div>
  );
}
