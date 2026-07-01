"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Truck, CreditCard, Smartphone, Banknote, Upload, PenLine, Clock, Check, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";
import type { PaymentMethod } from "@/lib/types";
import { useOrderStore } from "@/lib/order-store";

const DIVISIONS = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const { t, locale } = useI18n();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("COD");
  const [rxMode, setRxMode] = useState<string | null>(null);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const hasPrescriptionItems = items.some((i) => i.product.prescriptionRequired && !i.prescription);
  const shippingCost = division === "Dhaka" ? 60 : 120;
  const total = subtotal + shippingCost;

  const PAYMENT_OPTIONS: { key: PaymentMethod; label: string; desc: string; icon: React.ReactNode }[] = [
    { key: "COD", label: t.checkout.cod, desc: t.checkout.codDesc, icon: <Banknote size={20} /> },
    { key: "BKASH", label: t.checkout.bkash, desc: t.checkout.bkashDesc, icon: <Smartphone size={20} /> },
    { key: "NAGAD", label: t.checkout.nagad, desc: t.checkout.nagadDesc, icon: <Smartphone size={20} /> },
    { key: "SSLCOMMERZ", label: t.checkout.card, desc: t.checkout.cardDesc, icon: <CreditCard size={20} /> },
  ];

  if (items.length === 0 && !submitted) {
    return (
      <div className="px-pad py-20 text-center">
        <h1 className="display text-xl font-[480]">{t.checkout.bagEmpty}</h1>
        <Link href="/shop" className="mt-4 inline-block text-sm text-mute underline">
          {t.checkout.goToShop}
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-pad py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink">
          <Check size={28} className="text-white" />
        </div>
        <h1 className="display text-2xl font-[480]">{t.order.complete}</h1>
        <p className="mt-3 text-lg font-semibold tabular-nums text-ink">{createdOrderId}</p>
        <p className="mt-2 text-[13px] text-mute">{t.order.smsNote}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-pill bg-ink px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-button text-white">
            {t.order.continueShopping}
          </Link>
          <p className="text-[12px] text-mute">
            <Link href="/account" className="underline">{t.order.createAccount}</Link> {t.order.createAccountDesc}
          </p>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderId = `EP-${yyyy}${mm}${dd}-${rand}`;

    addOrder({
      id: orderId,
      phone,
      name,
      email: email || undefined,
      division,
      district,
      area,
      address,
      paymentMethod: payment,
      items: items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        selectedLens: item.selectedLens,
        prescription: item.prescription
      })),
      subtotal,
      shippingCost,
      total,
      status: "PENDING",
      createdAt: today.toISOString(),
    });

    setCreatedOrderId(orderId);
    clearCart();
    setSubmitted(true);
    window.scrollTo({ top: 0 });
  }

  return (
    <form onSubmit={handleSubmit} className="pb-48 md:pb-12">
      <div className="mx-auto max-w-4xl px-pad pt-6 md:px-8">
        <div className="pb-4">
          <h1 className="display text-[28px] font-[480]">{t.checkout.title}</h1>
        </div>

        <div className="md:flex md:gap-8">
          {/* Left: Form fields */}
          <div className="max-w-md flex-1 space-y-6">
            {/* Contact */}
            <section>
              <h2 className="mb-3 text-sm font-semibold">{t.checkout.contactInfo}</h2>
              <div className="space-y-3">
                <input type="tel" required placeholder={t.checkout.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink" />
                <input type="text" required placeholder={t.checkout.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink" />
                <input type="email" placeholder={t.checkout.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink" />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Truck size={16} />{t.checkout.shippingAddress}</h2>
              <div className="space-y-3">
                <div className="relative">
                  <select value={division} onChange={(e) => setDivision(e.target.value)} className="w-full appearance-none rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink">
                    {DIVISIONS.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute" />
                </div>
                <input type="text" required placeholder={t.checkout.districtPlaceholder} value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink" />
                <input type="text" required placeholder={t.checkout.areaPlaceholder} value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink" />
                <textarea required placeholder={t.checkout.addressPlaceholder} value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-hairline px-4 py-3.5 text-sm outline-none focus:border-ink" />
              </div>
            </section>

            {/* Prescription */}
            {hasPrescriptionItems && (
              <section>
                <h2 className="mb-3 text-sm font-semibold">{t.product.prescription}</h2>
                <p className="mb-3 text-[12px] text-mute">{t.checkout.prescriptionNote}</p>
                <div className="flex flex-col gap-2">
                  {[
                    { key: "upload", icon: <Upload size={16} />, label: t.product.rxUpload },
                    { key: "manual", icon: <PenLine size={16} />, label: t.product.rxManual },
                    { key: "later", icon: <Clock size={16} />, label: t.product.rxLater },
                  ].map((opt) => (
                    <button key={opt.key} type="button" onClick={() => setRxMode(opt.key)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm ${rxMode === opt.key ? "border-ink bg-ink/5" : "border-hairline"}`}>
                      <span className="text-mute">{opt.icon}</span>
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Payment */}
            <section>
              <h2 className="mb-3 text-sm font-semibold">{t.checkout.paymentMethod}</h2>
              <div className="flex flex-col gap-2">
                {PAYMENT_OPTIONS.map((opt) => (
                  <button key={opt.key} type="button" onClick={() => setPayment(opt.key)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left ${payment === opt.key ? "border-ink bg-ink/5" : "border-hairline"}`}>
                    <span className="text-mute">{opt.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{opt.label}</p>
                      <p className="text-[11px] text-mute">{opt.desc}</p>
                    </div>
                    {payment === opt.key && <Check size={16} className="ml-auto text-ink" />}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Order summary (desktop) */}
          <div className="mt-8 md:mt-0 md:flex-1">
            <div className="rounded-card border border-hairline p-4 md:sticky md:top-20">
              <button type="button" onClick={() => setOrderSummaryOpen(!orderSummaryOpen)} className="flex w-full items-center justify-between md:cursor-default">
                <h2 className="text-sm font-semibold">{t.checkout.orderSummary} ({items.length})</h2>
                <ChevronDown size={14} className={`text-mute transition-transform md:hidden ${orderSummaryOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-all md:max-h-none ${orderSummaryOpen ? "mt-3 max-h-[500px]" : "max-h-0 md:mt-3 md:max-h-none"}`}>
                <div className="space-y-3">
                  {items.map((item) => {
                    const cartItemId =
                      item.product.id +
                      (item.selectedLens
                        ? `-${item.selectedLens.category}-${item.selectedLens.typeId || ""}`
                        : "");
                    const itemPrice = item.product.price + (item.selectedLens?.price || 0);

                    return (
                      <div key={cartItemId} className="flex gap-3">
                        <div className="relative h-14 w-12 flex-none overflow-hidden rounded-lg bg-bone">
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                          <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ink text-[9px] font-bold text-white">{item.quantity}</span>
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                          <div>
                            <p className="text-xs font-medium">{item.product.name}</p>
                            {item.selectedLens && item.selectedLens.category !== "none" && (
                              <p className="text-[10px] text-mute mt-0.5">
                                {locale === "bn" ? "লেন্স: " : "Lens: "}
                                {locale === "bn" ? item.selectedLens.typeNameBn : item.selectedLens.typeName}
                              </p>
                            )}
                            {item.prescription && (
                              <p className="text-[9px] text-mute mt-0.5">
                                {locale === "bn" ? "প্রেসক্রিপশন: " : "Rx: "}
                                {item.prescription.mode === "upload" && (locale === "bn" ? "ছবি আপলোড" : "Uploaded")}
                                {item.prescription.mode === "manual" && (locale === "bn" ? "ম্যানুয়াল" : "Manual")}
                                {item.prescription.mode === "later" && (locale === "bn" ? "পরে দিবেন" : "Provide Later")}
                              </p>
                            )}
                          </div>
                          <p className="text-xs font-semibold tabular-nums">{formatPrice(itemPrice * item.quantity)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-hairline pt-4">
                <div className="flex justify-between text-sm"><span className="text-mute">{t.cart.subtotal}</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-mute">{t.checkout.shipping}</span><span className="tabular-nums">{formatPrice(shippingCost)}</span></div>
                <div className="flex justify-between border-t border-hairline pt-2 text-base font-semibold"><span>{t.checkout.total}</span><span className="tabular-nums">{formatPrice(total)}</span></div>
              </div>

              {/* Desktop confirm button */}
              <button type="submit" className="mt-4 hidden w-full rounded-pill bg-ink py-4 text-center text-[12px] font-bold uppercase tracking-button text-white md:block">
                {t.checkout.confirmOrder}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white px-pad pb-6 pt-4 md:hidden">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-semibold">{t.checkout.total}</span>
          <span className="text-sm font-semibold tabular-nums">{formatPrice(total)}</span>
        </div>
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-pill bg-ink py-4 text-[12px] font-bold uppercase tracking-button text-white">
          {t.checkout.confirmOrder}
          <ArrowRight size={14} />
        </button>
      </div>
    </form>
  );
}
