"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConfigStore } from "@/lib/config-store";
import { useI18n } from "@/lib/i18n/context";

export default function PromoBanner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { locale } = useI18n();
  const isBn = locale === "bn";

  const promoEnabled = useConfigStore((s) => s.promoEnabled);
  const promoText = useConfigStore((s) => s.promoText);
  const promoTextBn = useConfigStore((s) => s.promoTextBn);
  const promoLink = useConfigStore((s) => s.promoLink);

  const activeEnabled = mounted ? promoEnabled : true;
  const text = mounted
    ? (isBn ? promoTextBn || promoText : promoText)
    : (isBn ? "৳৩,০০০ এর বেশি অর্ডারে সারা দেশে ফ্রি শিপিং" : "FREE SHIPPING NATIONWIDE ON ORDERS OVER ৳3,000");

  if (!activeEnabled || !text) return null;

  const content = (
    <div className="bg-neutral-950 text-white text-[9.5px] font-bold tracking-widest text-center uppercase py-2.5 px-4 border-b border-white/[0.06] transition-all hover:bg-neutral-900">
      {text}
    </div>
  );

  if (promoLink) {
    return <Link href={promoLink} className="block">{content}</Link>;
  }

  return content;
}
