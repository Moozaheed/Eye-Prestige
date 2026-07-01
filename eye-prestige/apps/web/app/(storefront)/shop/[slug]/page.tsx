"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Upload, PenLine, Clock } from "lucide-react";
import { getProductBySlug, getProductsByCategory, PRODUCTS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n/context";
import ProductCard from "@/components/product/ProductCard";
import type { SelectedLens, PrescriptionDetails, Product } from "@/lib/types";
import { useProductStore } from "@/lib/product-store";
import { useConfigStore } from "@/lib/config-store";
import { useEffect, useMemo } from "react";

interface LensOption {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  desc?: string;
  descBn?: string;
}

const NON_POWER_OPTIONS: LensOption[] = [
  { id: "np-white", name: "White / Normal Lens", nameBn: "হোয়াইট / নরমাল লেন্স", price: 300, desc: "Standard clear glass lens", descBn: "সাধারণ পরিষ্কার কাঁচের লেন্স" },
  { id: "np-bluecut", name: "Blue Cut Lens", nameBn: "ব্লু কাট লেন্স", price: 400, desc: "Protects eyes from digital screens", descBn: "ডিজিটাল স্ক্রিনের ক্ষতিকর নীল আলো প্রতিরোধক" },
  { id: "np-photo", name: "Photochromic / Transition Lens", nameBn: "ফটোক্রোমিক / ট্রানজিশন লেন্স", price: 400, desc: "Darkens automatically in sunlight", descBn: "রোদে গেলে অটো কালো হয়" },
  { id: "np-sun", name: "Sunglass Lens", nameBn: "সানগ্লাস লেন্স", price: 400, desc: "Solid colored tint with UV protection", descBn: "UV প্রোটেকশন সহ রঙিন লেন্স" },
  { id: "np-green", name: "Green Cut Lens", nameBn: "গ্রিন কাট লেন্স", price: 500, desc: "Enhanced contrast and anti-glare", descBn: "উন্নত কন্ট্রাস্ট এবং অ্যান্টি-গ্লেয়ার লেন্স" },
  { id: "np-bluephoto", name: "Blue Cut + Photochromic Lens", nameBn: "ব্লু কাট + ফটোক্রোমিক লেন্স", price: 650, desc: "Ultimate double protection lens", descBn: "স্ক্রিন প্রটেকশন ও রোদ চশমার দ্বিগুণ সুবিধা" },
  { id: "np-other", name: "Other Lens / Custom Choice", nameBn: "অন্যান্য লেন্স / কাস্টম চয়েস", price: 0, desc: "Talk to support for progressive/bifocal lenses", descBn: "বিশেষ লেন্সের জন্য আমাদের সাথে যোগাযোগ করুন" },
];

const POWER_OPTIONS: LensOption[] = [
  { id: "p-white", name: "White / Normal Lens", nameBn: "হোয়াইট / নরমাল লেন্স", price: 350, desc: "Standard prescription clear lens", descBn: "সাধারণ পাওয়ার সহ পরিষ্কার লেন্স" },
  { id: "p-bluecut", name: "Blue Cut Lens", nameBn: "ব্লু কাট লেন্স", price: 500, desc: "Prescription lens with screen protection", descBn: "পাওয়ার ও ডিজিটাল স্ক্রিন প্রটেকশন" },
  { id: "p-photo", name: "Photochromic / Transition Lens", nameBn: "ফটোক্রোমিক / ট্রানজিশন লেন্স", price: 500, desc: "Prescription lens that darkens in sun", descBn: "পাওয়ার সহ রোদে অটো কালো লেন্স" },
  { id: "p-sun", name: "Sunglass Lens", nameBn: "সানগ্লাস লেন্স", price: 500, desc: "Prescription lens with sunglasses tint", descBn: "পাওয়ার সহ রঙিন সানগ্লাস লেন্স" },
  { id: "p-green", name: "Green Cut Lens", nameBn: "গ্রিন কাট লেন্স", price: 600, desc: "Anti-glare prescription lens", descBn: "অ্যান্টি-গ্লেয়ার পাওয়ার লেন্স" },
  { id: "p-bluephoto", name: "Blue Cut + Photochromic Lens", nameBn: "ব্লু কাট + ফটোক্রোমিক লেন্স", price: 750, desc: "Prescription lens with double protection", descBn: "পাওয়ার সহ স্ক্রিন ও রোদ চশমার সুবিধা" },
  { id: "p-other", name: "Other Lens / Custom Choice", nameBn: "অন্যান্য লেন্স / কাস্টম চয়েস", price: 0, desc: "Talk to support for specialized options", descBn: "বিশেষ লেন্সের জন্য আমাদের সাথে যোগাযোগ করুন" },
];

function getProductImages(product: Product): string[] {
  if (product.images && product.images.length > 1) {
    return product.images;
  }
  const baseImage = product.images[0];
  
  if (product.category === "sunglasses" || product.category === "threein1") {
    return [
      baseImage, // Angle 1: Front
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop", // Angle 2: Side
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop", // Angle 3: 45 Degree
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600&auto=format&fit=crop", // Lifestyle 1
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop", // Lifestyle 2
    ];
  } else {
    return [
      baseImage, // Angle 1: Front
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=600&auto=format&fit=crop", // Angle 2: Side
      "https://images.unsplash.com/photo-1584036553516-bf83210aa16c?q=80&w=600&auto=format&fit=crop", // Angle 3: 45 Degree
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop", // Lifestyle 1
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", // Lifestyle 2
    ];
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const relatedScrollRef = useRef<HTMLDivElement>(null);

  const handleRelatedScroll = (direction: "left" | "right") => {
    if (relatedScrollRef.current) {
      const { scrollLeft } = relatedScrollRef.current;
      const cardWidth = 240 + 16;
      const scrollAmount = direction === "left"
        ? scrollLeft - cardWidth * 2
        : scrollLeft + cardWidth * 2;

      relatedScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const storeProducts = useProductStore((s) => s.products);
  const storeCategories = useConfigStore((s) => s.categories);
  const product = useMemo(() => {
    const list = mounted ? storeProducts : PRODUCTS;
    const found = list.find((p) => p.slug === slug);
    if (found?.disabled) return undefined;
    return found;
  }, [slug, storeProducts, mounted]);

  const addItem = useCartStore((s) => s.addItem);
  const { t, locale } = useI18n();

  const isBn = locale === "bn";
  const categoryItem = useMemo(() => {
    return storeCategories.find((c) => c.key === product?.category);
  }, [storeCategories, product]);

  const categoryName = useMemo(() => {
    if (!product) return "";
    return categoryItem
      ? (isBn ? categoryItem.nameBn || categoryItem.name : categoryItem.name)
      : (t.categories[product.category as keyof typeof t.categories] || product.category);
  }, [categoryItem, product, isBn, t.categories]);

  const [qty, setQty] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [descOpen, setDescOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Lens states
  const [lensCategory, setLensCategory] = useState<"none" | "non-power" | "power" | null>(null);
  const [selectedLensType, setSelectedLensType] = useState<LensOption | null>(null);
  const [prescriptionMode, setPrescriptionMode] = useState<"upload" | "manual" | "later" | null>(null);
  
  // Manual rx values
  const [manualRx, setManualRx] = useState({
    right: { sph: "", cyl: "", axis: "" },
    left: { sph: "", cyl: "", axis: "" },
    pd: ""
  });
  
  // Uploaded file
  const [uploadedFileName, setUploadedFileName] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="px-pad py-20 text-center">
        <h1 className="display text-2xl">Product not found</h1>
        <Link href="/shop" className="mt-4 inline-block text-sm text-mute underline">{t.checkout.goToShop}</Link>
      </div>
    );
  }

  const images = getProductImages(product);

  const scrollToImage = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.clientHeight * index,
        behavior: "smooth",
      });
      setCurrentImage(index);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.clientHeight === 0) return;
    const index = Math.round(container.scrollTop / container.clientHeight);
    setCurrentImage(index);
  };

  const handleCategorySelect = (category: "none" | "non-power" | "power") => {
    setLensCategory(category);
    setSelectedLensType(null);
    setPrescriptionMode(null);
    setUploadedFileName("");
  };

  const related = useMemo(() => {
    if (!product) return [];
    const list = mounted ? storeProducts : PRODUCTS;
    return list.filter((p) => p.category === product.category && p.id !== product.id);
  }, [product, storeProducts, mounted]);

  const framePrice = product.price;
  const lensPrice = selectedLensType ? selectedLensType.price : 0;
  const totalPrice = framePrice + lensPrice;

  // Validation
  const isLensCategorySelected = lensCategory !== null;
  const isLensTypeSelected = lensCategory === "none" || (lensCategory !== null && selectedLensType !== null);
  const isPrescriptionProvided = lensCategory !== "power" || (lensCategory === "power" && prescriptionMode !== null);

  const isReady = isLensCategorySelected && isLensTypeSelected && isPrescriptionProvided;
  const showValidationError = lensCategory === "power" && !prescriptionMode;

  const handleAddToBag = () => {
    if (!isReady) return;

    const lensDetails: SelectedLens = {
      category: lensCategory!,
      typeId: selectedLensType?.id,
      typeName: selectedLensType?.name,
      typeNameBn: selectedLensType?.nameBn,
      price: selectedLensType?.price || 0,
    };

    const prescriptionDetails: PrescriptionDetails | undefined =
      lensCategory === "power" && prescriptionMode
        ? {
            mode: prescriptionMode,
            imageFileName: uploadedFileName || undefined,
            values: prescriptionMode === "manual" ? manualRx : undefined,
          }
        : undefined;

    addItem(product, qty, lensDetails, prescriptionDetails);
    
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <>
      <div className="px-pad pt-4 text-[11px] text-mute">
        <Link href="/">{t.shop.breadcrumbHome}</Link> / <Link href="/shop">{t.shop.title}</Link> / <b className="font-semibold text-ink">{product.name}</b>
      </div>

      <div className="md:flex md:gap-8 md:px-pad md:pt-6">
        {/* Left: Gallery */}
        <div className="md:w-1/2">
          <div className="flex gap-2.5 h-[380px] sm:h-[480px] md:h-[560px] w-full">
            {/* Left: Thumbnails Rail (Visible on Mobile & Desktop) */}
            <div className="flex flex-col items-center justify-center gap-2 py-3 px-1 w-[54px] sm:w-[68px] flex-none bg-bone/45 border border-hairline/60 rounded-xl h-full">
              <button 
                type="button"
                onClick={() => scrollToImage(Math.max(0, currentImage - 1))}
                className="text-mute hover:text-ink disabled:opacity-20 p-1 flex items-center justify-center transition-opacity flex-none"
                disabled={currentImage === 0}
                aria-label="Previous image"
              >
                <ChevronUp size={14} strokeWidth={2} />
              </button>
              
              <div className="flex-none flex flex-col gap-2 overflow-y-auto max-h-[78%] w-full items-center no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToImage(i)}
                    className={`relative w-10 h-10 sm:w-13 sm:h-13 rounded-lg border overflow-hidden transition-all flex-none ${
                      i === currentImage ? "border-ink ring-1 ring-ink" : "border-hairline/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Angle ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>

              <button 
                type="button"
                onClick={() => scrollToImage(Math.min(images.length - 1, currentImage + 1))}
                className="text-mute hover:text-ink disabled:opacity-20 p-1 flex items-center justify-center transition-opacity flex-none"
                disabled={currentImage === images.length - 1}
                aria-label="Next image"
              >
                <ChevronDown size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Right: Main Image box */}
            <div className="relative flex-1 bg-bone rounded-xl overflow-hidden border border-hairline/40">
              {/* Gallery images vertical scroll container */}
              <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {images.map((img, i) => (
                  <div key={i} className="relative w-full h-full snap-start flex-none">
                    <Image src={img} alt={`${product.name} - View ${i + 1}`} fill priority={i === 0} className="object-cover" />
                    <span className="absolute bottom-3 left-3 bg-white/80 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider text-mute">
                      {i === 0 && (locale === "bn" ? "সামনের ভিউ (Front)" : "Front View")}
                      {i === 1 && (locale === "bn" ? "সাইড ভিউ (Side)" : "Side View")}
                      {i === 2 && (locale === "bn" ? "৪৫° ভিউ (45° Angle)" : "45° Angle")}
                      {i >= 3 && (locale === "bn" ? "লাইফস্টাইল (Lifestyle)" : "Lifestyle")}
                    </span>
                  </div>
                ))}
              </div>

              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 z-10 shadow-sm border border-hairline/20" aria-label={t.wishlist}>
                <Heart size={14} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Details & Selection */}
        <div className="px-pad pt-4 md:w-1/2 md:px-0 md:pt-0">
          <p className="eyebrow">{categoryName}</p>
          <h1 className="display mt-1.5 text-[28px] font-[480] md:text-[34px]">{product.name}</h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-xl font-semibold tabular-nums">{formatPrice(totalPrice)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-mute line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <div className="mt-2">
            <span className="inline-block rounded-pill border border-hairline px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-mute">{product.shape}</span>
          </div>

          {/* LENS SELECTION FLOW */}
          {/* Step 1 */}
          <div className="mt-6 border-t border-hairline pt-6">
            <p className="text-sm font-semibold mb-3">
              {locale === "bn" ? "ধাপ ১: লেন্স নির্বাচন করুন" : "Step 1: Select Lens"}
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleCategorySelect("none")}
                className={`flex flex-col items-start gap-1 p-3.5 rounded-xl border text-left transition-all ${
                  lensCategory === "none" ? "border-ink bg-ink/[0.03] ring-1 ring-ink" : "border-hairline hover:border-mute bg-white"
                }`}
              >
                <span className="text-sm font-semibold">{locale === "bn" ? "লেন্স ছাড়া (Frame Only)" : "No Lens"}</span>
                <span className="text-[11px] text-mute leading-tight">{locale === "bn" ? "শুধুমাত্র ফ্রেম নিবেন" : "Use existing lenses"}</span>
                <span className="text-[11px] font-bold text-ink mt-1.5">+৳0</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect("non-power")}
                className={`flex flex-col items-start gap-1 p-3.5 rounded-xl border text-left transition-all ${
                  lensCategory === "non-power" ? "border-ink bg-ink/[0.03] ring-1 ring-ink" : "border-hairline hover:border-mute bg-white"
                }`}
              >
                <span className="text-sm font-semibold">{locale === "bn" ? "পাওয়ার ছাড়া লেন্স" : "Non-Power Lens"}</span>
                <span className="text-[11px] text-mute leading-tight">{locale === "bn" ? "ফ্যাশন বা নীল আলো প্রটেকশন" : "Zero power & protection"}</span>
                <span className="text-[11px] font-bold text-ink mt-1.5">{locale === "bn" ? "+৳৩০০ থেকে শুরু" : "Starts at +৳300"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect("power")}
                className={`flex flex-col items-start gap-1 p-3.5 rounded-xl border text-left transition-all ${
                  lensCategory === "power" ? "border-ink bg-ink/[0.03] ring-1 ring-ink" : "border-hairline hover:border-mute bg-white"
                }`}
              >
                <span className="text-sm font-semibold">{locale === "bn" ? "পাওয়ার লেন্স" : "Power Lens"}</span>
                <span className="text-[11px] text-mute leading-tight">{locale === "bn" ? "পাওয়ার ও প্রেসক্রিপশন" : "Prescription power lens"}</span>
                <span className="text-[11px] font-bold text-ink mt-1.5">{locale === "bn" ? "+৳৩৫০ থেকে শুরু" : "Starts at +৳350"}</span>
              </button>
            </div>
          </div>

          {/* Step 2 */}
          {lensCategory && lensCategory !== "none" && (
            <div className="mt-6 border-t border-hairline pt-6">
              <p className="text-sm font-semibold mb-3">
                {locale === "bn" ? "ধাপ ২: লেন্সের ধরণ নির্বাচন করুন" : "Step 2: Select Lens Type"}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(lensCategory === "non-power" ? NON_POWER_OPTIONS : POWER_OPTIONS).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedLensType(opt)}
                    className={`flex flex-col justify-between items-start p-3 rounded-xl border text-left transition-all h-full min-h-[92px] ${
                      selectedLensType?.id === opt.id ? "border-ink bg-ink/[0.03] ring-1 ring-ink" : "border-hairline hover:border-mute bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-[12px] font-semibold leading-tight">{locale === "bn" ? opt.nameBn : opt.name}</p>
                      <p className="text-[9.5px] text-mute mt-1 leading-snug line-clamp-2">{locale === "bn" ? opt.descBn : opt.desc}</p>
                    </div>
                    <span className="text-[11px] font-bold tabular-nums text-ink mt-2">
                      {opt.price === 0 ? (locale === "bn" ? "যোগাযোগ" : "Contact") : `+${formatPrice(opt.price)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prescription section (Power Lens only) */}
          {lensCategory === "power" && (
            <div className="mt-6 border-t border-hairline pt-6">
              <p className="text-sm font-semibold mb-3">{t.product.prescription}</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setPrescriptionMode("upload"); setUploadedFileName(""); }}
                  className={`flex flex-col items-center justify-between text-center gap-2 rounded-xl border p-2.5 min-h-[90px] ${
                    prescriptionMode === "upload" ? "border-ink bg-ink/5" : "border-hairline bg-white"
                  }`}
                >
                  <Upload size={15} className="text-mute mt-1" />
                  <div className="mt-1 w-full">
                    <p className="font-semibold text-[11px] leading-tight truncate">{t.product.rxUpload}</p>
                    <p className="text-[9px] text-mute leading-snug mt-0.5 line-clamp-2">{t.product.rxUploadDesc}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPrescriptionMode("manual")}
                  className={`flex flex-col items-center justify-between text-center gap-2 rounded-xl border p-2.5 min-h-[90px] ${
                    prescriptionMode === "manual" ? "border-ink bg-ink/5" : "border-hairline bg-white"
                  }`}
                >
                  <PenLine size={15} className="text-mute mt-1" />
                  <div className="mt-1 w-full">
                    <p className="font-semibold text-[11px] leading-tight truncate">{t.product.rxManual}</p>
                    <p className="text-[9px] text-mute leading-snug mt-0.5 line-clamp-2">{t.product.rxManualDesc}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPrescriptionMode("later")}
                  className={`flex flex-col items-center justify-between text-center gap-2 rounded-xl border p-2.5 min-h-[90px] ${
                    prescriptionMode === "later" ? "border-ink bg-ink/5" : "border-hairline bg-white"
                  }`}
                >
                  <Clock size={15} className="text-mute mt-1" />
                  <div className="mt-1 w-full">
                    <p className="font-semibold text-[11px] leading-tight truncate">{t.product.rxLater}</p>
                    <p className="text-[9px] text-mute leading-snug mt-0.5 line-clamp-2">{t.product.rxLaterDesc}</p>
                  </div>
                </button>
              </div>

              {prescriptionMode === "manual" && (
                <div className="mt-4 space-y-3 border-t border-hairline pt-4 bg-bone/50 p-3 rounded-xl">
                  {[
                    { label: t.product.rightEye, key: "right" as const },
                    { label: t.product.leftEye, key: "left" as const }
                  ].map((eye) => (
                    <div key={eye.key}>
                      <p className="mb-2 text-xs font-semibold text-mute">{eye.label}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {["SPH", "CYL", "Axis"].map((field) => (
                          <input
                            key={field}
                            placeholder={field}
                            value={manualRx[eye.key][field.toLowerCase() as "sph" | "cyl" | "axis"]}
                            onChange={(e) => {
                              const val = e.target.value;
                              setManualRx((prev) => ({
                                ...prev,
                                [eye.key]: {
                                  ...prev[eye.key],
                                  [field.toLowerCase()]: val,
                                },
                              }));
                            }}
                            className="rounded-lg border border-hairline bg-white px-3 py-2 text-xs outline-none focus:border-ink"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <div>
                    <p className="mb-2 text-xs font-semibold text-mute">PD (Pupillary Distance)</p>
                    <input
                      placeholder="e.g. 62"
                      value={manualRx.pd}
                      onChange={(e) => setManualRx((prev) => ({ ...prev, pd: e.target.value }))}
                      className="w-full rounded-lg border border-hairline bg-white px-3 py-2 text-xs outline-none focus:border-ink"
                    />
                  </div>
                </div>
              )}

              {prescriptionMode === "upload" && (
                <div className="mt-4 border-t border-hairline pt-4">
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-hairline py-8 text-center bg-white hover:bg-bone transition-all">
                    <Upload size={24} className="text-mute" />
                    {uploadedFileName ? (
                      <p className="text-sm font-semibold text-ink">✓ {uploadedFileName}</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium">{t.product.rxUploadPlaceholder}</p>
                        <p className="text-[11px] text-mute">{t.product.rxUploadFormats}</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFileName(e.target.files[0].name);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Pricing summary */}
          {lensCategory !== null && (
            <div className="mt-6 border-t border-hairline pt-6">
              <div className="p-4 rounded-xl bg-bone border border-hairline">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mute mb-2">
                  {locale === "bn" ? "মূল্য বিবরণী (Price Summary)" : "Price Summary"}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mute">
                    {locale === "bn" ? "ফ্রেম মূল্য (Frame)" : "Frame Price"}
                  </span>
                  <span className="font-semibold tabular-nums">{formatPrice(framePrice)}</span>
                </div>
                {lensPrice > 0 && (
                  <div className="flex items-center justify-between text-sm mt-1.5">
                    <span className="text-mute">
                      {locale === "bn" ? "লেন্স মূল্য (Lens)" : "Lens Price"} ({locale === "bn" ? selectedLensType?.nameBn : selectedLensType?.name})
                    </span>
                    <span className="font-semibold tabular-nums">+{formatPrice(lensPrice)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-hairline mt-3 pt-3 text-base font-bold text-ink">
                  <span>{locale === "bn" ? "সর্বমোট মূল্য (Total)" : "Total Price"}</span>
                  <span className="tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold">{t.product.quantity}</span>
            <div className="flex items-center rounded-pill border border-hairline bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3.5 py-2.5" aria-label="Decrease"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3.5 py-2.5" aria-label="Increase"><Plus size={14} /></button>
            </div>
          </div>

          {/* Validation Error Message */}
          {showValidationError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-center text-xs font-semibold text-red-600">
              {locale === "bn"
                ? "দয়া করে চালিয়ে যেতে আপনার প্রেসক্রিপশনের বিবরণ প্রদান করুন।"
                : "Please provide your prescription details to continue."}
            </div>
          )}

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            disabled={!isReady}
            className={`mt-6 w-full rounded-pill py-4 text-center text-[12px] font-bold uppercase tracking-button transition-all ${
              isReady
                ? "bg-ink text-white hover:opacity-90 active:scale-[0.99]"
                : "bg-ink/40 text-white/80 cursor-not-allowed"
            }`}
          >
            {addedFeedback 
              ? (locale === "bn" ? "ব্যাগে যোগ করা হয়েছে!" : "Added to Bag!")
              : (isReady
                  ? t.product.addToBag 
                  : (lensCategory === null 
                      ? (locale === "bn" ? "লেন্স নির্বাচন করুন" : "Select Lens Option")
                      : (!selectedLensType
                          ? (locale === "bn" ? "লেন্সের ধরণ নির্বাচন করুন" : "Select Lens Type")
                          : (locale === "bn" ? "প্রেসক্রিপশন দিন" : "Provide Prescription")
                        )
                    )
                )
            }
          </button>

          <div className="mt-8 border-t border-hairline">
            <button onClick={() => setDescOpen(!descOpen)} className="flex w-full items-center justify-between py-4">
              <span className="text-sm font-semibold">{t.product.description}</span>
              <ChevronDown size={16} className={`text-mute transition-transform ${descOpen ? "rotate-180" : ""}`} />
            </button>
            {descOpen && (
              <p className="pb-4 text-[13px] leading-relaxed text-mute">{t.product.descriptionText}</p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-10 border-t border-hairline/25 mt-10">
          <div className="mb-4 flex items-baseline justify-between px-pad md:px-10">
            <h3 className="display text-[22px] font-[440]">{t.product.moreForYou}</h3>
            <Link 
              href={`/shop?category=${product.category}`} 
              className="flex items-center gap-[5px] whitespace-nowrap rounded-pill border border-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-section text-ink"
            >
              {t.home.viewAll}
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="relative group/carousel">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={() => handleRelatedScroll("left")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/95 border border-hairline shadow-md flex items-center justify-center text-ink hover:bg-white active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>

            {/* Scroll Track container */}
            <div
              ref={relatedScrollRef}
              className="flex snap-x snap-mandatory gap-3.5 md:gap-4 overflow-x-auto pb-4 pt-1 px-6 md:px-10 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} variant="carousel" />
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={() => handleRelatedScroll("right")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/95 border border-hairline shadow-md flex items-center justify-center text-ink hover:bg-white active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </section>
      )}
    </>
  );
}
