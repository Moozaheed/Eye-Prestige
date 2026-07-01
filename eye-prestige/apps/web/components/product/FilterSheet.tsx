"use client";

import { useEffect, useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet";
import { useI18n } from "@/lib/i18n/context";
import { useConfigStore } from "@/lib/config-store";

const INITIAL_SHAPES = ["Round", "Square", "Aviator", "Cat-Eye", "Rectangle"];

const PRICE_BANDS = [
  { key: "u1500", label: "Under ৳1,500" },
  { key: "1500-3000", label: "৳1,500 -- ৳3,000" },
  { key: "o3000", label: "৳3,000+" },
];

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  selectedShapes: Set<string>;
  selectedPrice: string | null;
  onToggleShape: (shape: string) => void;
  onTogglePrice: (price: string) => void;
  onClear: () => void;
}

export default function FilterSheet({
  open,
  onClose,
  selectedShapes,
  selectedPrice,
  onToggleShape,
  onTogglePrice,
  onClear,
}: FilterSheetProps) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeShapes = useConfigStore((s) => s.shapes);
  const shapesList = mounted ? storeShapes : INITIAL_SHAPES;
  const activeCount = selectedShapes.size + (selectedPrice ? 1 : 0);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={t.shop.filter}
      footer={
        <>
          <button
            onClick={onClear}
            className="whitespace-nowrap text-xs font-semibold text-mute underline"
          >
            {t.shop.clearAll}
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-pill bg-ink py-3.5 text-xs font-bold uppercase tracking-[0.06em] text-white"
          >
            {activeCount > 0
              ? `${t.shop.apply} (${activeCount} ${t.shop.active})`
              : t.shop.applyFilters}
          </button>
        </>
      }
    >
      <div className="border-t border-hairline py-4">
        <h6 className="eyebrow mb-3">{t.shop.shape}</h6>
        <div className="flex flex-wrap gap-2">
          {shapesList.map((shape) => (
            <button
              key={shape}
              onClick={() => onToggleShape(shape)}
              className={`rounded-pill border px-4 py-2.5 text-xs font-medium transition-all ${
                selectedShapes.has(shape)
                  ? "border-ink bg-ink text-white"
                  : "border-hairline bg-white text-ink hover:bg-neutral-50"
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline py-4">
        <h6 className="eyebrow mb-3">{t.shop.priceRange}</h6>
        <div className="flex flex-wrap gap-2">
          {PRICE_BANDS.map((band) => (
            <button
              key={band.key}
              onClick={() => onTogglePrice(band.key)}
              className={`rounded-pill border px-4 py-2.5 text-xs font-medium transition-all ${
                selectedPrice === band.key
                  ? "border-ink bg-ink text-white"
                  : "border-hairline bg-white text-ink hover:bg-neutral-50"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
