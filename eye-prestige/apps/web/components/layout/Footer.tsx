"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useConfigStore } from "@/lib/config-store";

export default function Footer() {
  const { t, locale } = useI18n();
  const isBn = locale === "bn";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic CMS Footer & Contact Details
  const storeColumns = useConfigStore((s) => s.footerColumns);
  const activeColumns = mounted ? storeColumns : [];

  const whatsapp = useConfigStore((s) => s.whatsapp);
  const email = useConfigStore((s) => s.email);
  const address = useConfigStore((s) => s.address);
  const socials = useConfigStore((s) => s.socials);

  return (
    <>
      <footer className="mt-8 bg-footer-bg text-footer-text border-t border-white/[0.08]">
        <div className="px-pad py-12 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
            
            {/* Dynamic Link Columns */}
            {activeColumns.map((col, idx) => (
              <div key={col.id || idx}>
                <h5 className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-footer-mute">
                  {isBn ? col.titleBn || col.title : col.title}
                </h5>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((lnk, lIdx) => (
                    <li key={lIdx}>
                      <Link href={lnk.url} className="text-[13px] hover:text-white transition-colors">
                        {isBn ? lnk.labelBn || lnk.label : lnk.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Customer Care (Dynamic coordinates) */}
            <div>
              <h5 className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-footer-mute">
                {isBn ? "কাস্টমার কেয়ার" : "Customer Care"}
              </h5>
              <div className="flex flex-col gap-2.5">
                <p className="text-[13px] leading-relaxed text-footer-mute">
                  {isBn ? "আমরা সাহায্য করতে প্রস্তুত" : "We're here to help"}
                </p>
                {whatsapp && (
                  <p className="text-[13px] leading-relaxed">
                    <span className="text-footer-mute">{isBn ? "হোয়াটসঅ্যাপ: " : "WhatsApp: "}</span>
                    <a href={`https://wa.me/88${whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {whatsapp}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="text-[13px] leading-relaxed">
                    <span className="text-footer-mute">{isBn ? "ইমেইল: " : "Email: "}</span>
                    <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                      {email}
                    </a>
                  </p>
                )}
                {address && (
                  <p className="text-[13px] leading-relaxed text-footer-mute">
                    {address}
                  </p>
                )}
              </div>
            </div>

            {/* Newsletter Column */}
            <div>
              <h5 className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-footer-mute">
                {t.footer.newsletter}
              </h5>
              <p className="mb-3 text-[12px] leading-[1.5] text-footer-mute">
                {t.footer.newsletterDesc}
              </p>
              <form className="flex border-b-[1.5px] border-white/[0.45] pb-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 border-none bg-transparent text-[13px] text-white outline-none placeholder:text-[#6F6C66]"
                />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
              <p className="mt-2 text-[11px] text-[#6F6C66]">{t.footer.noSpam}</p>
            </div>
          </div>

          {/* Social Media, Brand Logo, Copyright Stack */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col items-center gap-6">
            
            {/* Social Media links */}
            <div className="flex gap-4 justify-center">
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] hover:bg-white/10 text-footer-text hover:text-white transition-all" aria-label="Instagram">
                  <Instagram size={15} />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] hover:bg-white/10 text-footer-text hover:text-white transition-all" aria-label="Facebook">
                  <Facebook size={15} />
                </a>
              )}
              {socials.tiktok && (
                <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] hover:bg-white/10 text-footer-text hover:text-white transition-all" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.47-.44-.36-.83-.79-1.14-1.27-.08 3.53-.02 7.07-.04 10.6-.04 1.37-.54 2.77-1.45 3.82-1.05 1.25-2.68 1.99-4.31 2.01-1.84.05-3.79-.68-4.99-2.1-1.34-1.55-1.74-3.83-1.04-5.75.7-1.99 2.68-3.48 4.79-3.55 1.02-.02 2.05.21 2.94.73v-4.2c-1.87-.51-3.88-.36-5.6.45-1.92.93-3.42 2.64-4.07 4.67-.85 2.63-.35 5.62 1.34 7.79 1.5 1.95 3.99 3.09 6.45 2.95 2.61-.09 5.09-1.57 6.25-3.9 1-1.98.92-4.36.94-6.53.01-3.66.01-7.31.01-10.97z" />
                  </svg>
                </a>
              )}
              {socials.x && (
                <a href={socials.x} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] hover:bg-white/10 text-footer-text hover:text-white transition-all" aria-label="X">
                  <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Brand Logo Area */}
            <div className="flex justify-center">
              <Image
                src="/images/Logo White.png"
                alt="EYE PRESTIGE"
                width={132}
                height={26}
                className="h-[26px] w-auto object-contain"
                priority
              />
            </div>

            {/* Copyright & Policy links */}
            <div className="w-full flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-6 md:flex-row text-center">
              <p className="text-[11px] text-[#6F6C66] text-center md:text-left">
                © 2026 EYE PRESTIGE. All Rights Reserved.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="#" className="text-[11px] text-[#6F6C66] hover:text-white transition-colors">{t.footer.privacy}</Link>
                <Link href="#" className="text-[11px] text-[#6F6C66] hover:text-white transition-colors">{t.footer.terms}</Link>
                <Link href="#" className="text-[11px] text-[#6F6C66] hover:text-white transition-colors">{t.footer.accessibility}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
