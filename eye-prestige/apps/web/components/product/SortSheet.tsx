"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import { useI18n } from "@/lib/i18n/context";

interface SortSheetProps {
  open: boolean;
  onClose: () => void;
  current: string;
  onSelect: (key: string) => void;
}

export default function SortSheet({
  open,
  onClose,
  current,
  onSelect,
}: SortSheetProps) {
  const { t } = useI18n();

  const SORTS = [
    { key: "featured", label: t.shop.sortFeatured },
    { key: "price-asc", label: t.shop.sortPriceLow },
    { key: "price-desc", label: t.shop.sortPriceHigh },
    { key: "name", label: t.shop.sortName },
  ];

  return (
    <BottomSheet open={open} onClose={onClose} title={t.shop.sort}>
      <div className="flex flex-col">
        {SORTS.map((sort) => (
          <button
            key={sort.key}
            onClick={() => {
              onSelect(sort.key);
              onClose();
            }}
            className="flex w-full items-center justify-between border-b border-hairline py-4 text-left text-sm text-ink last:border-b-0"
          >
            <span>{sort.label}</span>
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] ${
                current === sort.key ? "border-ink" : "border-hairline"
              }`}
            >
              {current === sort.key && (
                <span className="block h-2 w-2 rounded-full bg-ink" />
              )}
            </span>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
