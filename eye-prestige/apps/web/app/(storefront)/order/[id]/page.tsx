"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Check, Package, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { t } = useI18n();

  return (
    <div className="px-pad py-16 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ink">
        <Check size={28} className="text-white" />
      </div>

      <h1 className="display text-[26px] font-[480]">{t.order.complete}</h1>

      <div className="mx-auto mt-6 max-w-sm rounded-card border border-hairline p-5">
        <p className="eyebrow mb-1">{t.order.orderNumber}</p>
        <p className="text-xl font-bold tabular-nums">{orderId || "EP-20260622-0001"}</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-mute">
          <Package size={14} />
          <span>{t.order.status}: <b className="font-semibold text-ink">{t.order.pending}</b></span>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-xs text-[13px] leading-relaxed text-mute">
        {t.order.smsNote}
      </p>

      <div className="mt-8 space-y-3">
        <Link href="/shop" className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-button text-white">
          {t.order.continueShopping}<ArrowRight size={13} />
        </Link>
        <p className="text-[12px] text-mute">
          <Link href="/account" className="underline">{t.order.createAccount}</Link>{" "}{t.order.createAccountDesc}
        </p>
      </div>
    </div>
  );
}
