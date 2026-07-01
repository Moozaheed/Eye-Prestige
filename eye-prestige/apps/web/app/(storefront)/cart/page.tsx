"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const totalItems = useCartStore((s) => s.totalItems());
  const { t, locale } = useI18n();

  if (items.length === 0) {
    return (
      <div className="px-pad py-20 text-center">
        <ShoppingBag size={40} className="mx-auto mb-4 text-mute opacity-40" />
        <h1 className="display text-xl font-[480]">{t.cart.empty}</h1>
        <p className="mt-2 text-[13px] text-mute">{t.cart.emptyDesc}</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-button text-white"
        >
          {t.cart.startShopping}
          <ArrowRight size={13} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-48 md:pb-12">
      {/* Centered content */}
      <div className="mx-auto max-w-2xl px-pad pt-6 md:px-8">
        <div className="pb-4">
          <h1 className="display text-[28px] font-[480]">{t.cart.title}</h1>
          <p className="mt-1 text-[12.5px] text-mute">
            {totalItems} {t.cart.items}
          </p>
        </div>

        {/* Cart items */}
        <div className="divide-y divide-hairline">
          {items.map((item) => {
            const cartItemId =
              item.product.id +
              (item.selectedLens
                ? `-${item.selectedLens.category}-${item.selectedLens.typeId || ""}`
                : "");
            const itemPrice = item.product.price + (item.selectedLens?.price || 0);

            return (
              <div key={cartItemId} className="flex gap-4 py-5">
                <Link
                  href={`/shop/${item.product.slug}`}
                  className="relative h-24 w-20 flex-none overflow-hidden rounded-lg bg-bone"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{item.product.name}</p>
                      <p className="mt-0.5 text-[11px] text-mute">
                        {item.product.shape}
                      </p>
                      {item.selectedLens && item.selectedLens.category !== "none" && (
                        <p className="mt-1 text-[11.5px] font-medium text-ink">
                          {locale === "bn" ? "লেন্স: " : "Lens: "}
                          {locale === "bn" ? item.selectedLens.typeNameBn : item.selectedLens.typeName} 
                          <span className="text-mute font-normal"> (+{formatPrice(item.selectedLens.price)})</span>
                        </p>
                      )}
                      {item.prescription && (
                        <p className="mt-1 text-[10.5px] text-mute">
                          <span className="font-semibold">
                            {locale === "bn" ? "প্রেসক্রিপশন: " : "Prescription: "}
                          </span>
                          {item.prescription.mode === "upload" && (locale === "bn" ? "ছবি আপলোড" : "Uploaded Image")}
                          {item.prescription.mode === "manual" && (locale === "bn" ? "ম্যানুয়ালি এন্টার করা" : "Entered Manually")}
                          {item.prescription.mode === "later" && (locale === "bn" ? "পরে কল/হোয়াটসঅ্যাপে" : "Provide Later (WhatsApp/Call)")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(cartItemId)}
                      className="p-1 text-mute"
                      aria-label={t.cart.remove}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-pill border border-hairline">
                      <button
                        onClick={() =>
                          updateQuantity(cartItemId, item.quantity - 1)
                        }
                        className="px-2.5 py-1.5"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(cartItemId, item.quantity + 1)
                        }
                        className="px-2.5 py-1.5"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold tabular-nums">
                      {formatPrice(itemPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop inline summary */}
        <div className="mt-6 hidden rounded-card border border-hairline p-5 md:block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-mute">{t.cart.subtotal}</span>
            <span className="text-lg font-semibold tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mb-4 text-[11px] text-mute">{t.cart.shippingNote}</p>
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-ink py-4 text-[12px] font-bold uppercase tracking-button text-white"
          >
            {t.cart.checkout}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white px-pad pb-6 pt-4 md:hidden">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-mute">{t.cart.subtotal}</span>
          <span className="text-sm font-semibold tabular-nums">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="mb-3 text-[11px] text-mute">{t.cart.shippingNote}</p>
        <Link
          href="/checkout"
          className="flex w-full items-center justify-center gap-2 rounded-pill bg-ink py-4 text-[12px] font-bold uppercase tracking-button text-white"
        >
          {t.cart.checkout}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
