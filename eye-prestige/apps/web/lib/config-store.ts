import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CategoryItem {
  key: string;
  name: string;
  nameBn: string;
  image: string;
}

export interface HeroSlide {
  image: string;
  eyebrow: string;
  eyebrowBn: string;
  headline: string;
  headlineBn: string;
  subtitle: string;
  subtitleBn: string;
  cta: string;
}

export interface BrandStoryConfig {
  eyebrow: string;
  eyebrowBn: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  ctaText: string;
  ctaTextBn: string;
  ctaLink: string;
}

export interface FooterLink {
  label: string;
  labelBn: string;
  url: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  titleBn: string;
  links: FooterLink[];
}

export interface SocialHandles {
  instagram: string;
  facebook: string;
  tiktok: string;
  x: string;
}

interface ConfigState {
  categories: CategoryItem[];
  shapes: string[];
  heroSlides: HeroSlide[];
  homeSections: string[];
  itemsPerSection: number;
  
  // Promo Banner Settings
  promoEnabled: boolean;
  promoText: string;
  promoTextBn: string;
  promoLink: string;

  // Brand Story Settings
  brandStory: BrandStoryConfig;

  // Contact Info Settings
  whatsapp: string;
  email: string;
  address: string;
  socials: SocialHandles;

  // Footer Column Settings
  footerColumns: FooterColumn[];

  // Menu Settings
  menuItems: FooterLink[];
  
  addCategory: (cat: CategoryItem) => void;
  updateCategory: (key: string, updated: Partial<CategoryItem>) => void;
  deleteCategory: (key: string) => void;
  
  addShape: (shape: string) => void;
  deleteShape: (shape: string) => void;
  
  updateHeroSlide: (index: number, slide: Partial<HeroSlide>) => void;
  setHomeSections: (keys: string[]) => void;
  setItemsPerSection: (count: number) => void;
  
  // CMS Setters for Promo and Brand Story
  setPromoSettings: (settings: Partial<{ enabled: boolean; text: string; textBn: string; link: string }>) => void;
  setBrandStorySettings: (settings: Partial<BrandStoryConfig>) => void;

  // CMS Setters for Contact and Footer Columns
  setContactSettings: (settings: Partial<{ whatsapp: string; email: string; address: string; socials: Partial<SocialHandles> }>) => void;
  setFooterColumns: (columns: FooterColumn[]) => void;
  setMenuItems: (items: FooterLink[]) => void;

  restoreDefaults: () => void;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { key: "sunglasses", name: "Sunglasses", nameBn: "সানগ্লাস", image: "https://images.unsplash.com/photo-1616424831766-d616a58f1459?q=80&w=500&auto=format&fit=crop" },
  { key: "optical", name: "Optical", nameBn: "অপটিক্যাল", image: "https://images.unsplash.com/photo-1610555423081-85ec0b8eabac?q=80&w=500&auto=format&fit=crop" },
  { key: "bluecut", name: "Bluecut", nameBn: "ব্লুকাট", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=500&auto=format&fit=crop" },
  { key: "nightdrive", name: "Night Drive", nameBn: "নাইট ড্রাইভ", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop" },
  { key: "daywear", name: "Day Wear", nameBn: "ডে ওয়্যার", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500&auto=format&fit=crop" },
  { key: "threein1", name: "3 In 1", nameBn: "৩ ইন ১", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=500&auto=format&fit=crop" },
];

const INITIAL_SHAPES = ["Round", "Square", "Aviator", "Cat-Eye", "Rectangle"];

const INITIAL_SLIDES: HeroSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    eyebrow: "NEW COLLECTION 2026",
    eyebrowBn: "নতুন কালেকশন ২০২৬",
    headline: "SEE THE WORLD\nDIFFERENTLY",
    headlineBn: "পৃথিবীকে দেখুন\nঅন্যভাবে",
    subtitle: "Modern Eyewear for Everyday Icons",
    subtitleBn: "আধুনিক চশমা, প্রতিদিনের সঙ্গী",
    cta: "/shop",
  },
  {
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    eyebrow: "NIGHT DRIVE",
    eyebrowBn: "নাইট ড্রাইভ",
    headline: "SAFE DRIVE,\nCLEAR VISION",
    headlineBn: "নিরাপদ ড্রাইভ,\nস্বচ্ছ দৃষ্টি",
    subtitle: "Crafted for night driving confidence",
    subtitleBn: "রাতের গাড়ি চালানোর জন্য তৈরি",
    cta: "/shop?category=nightdrive",
  },
  {
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
    eyebrow: "SCREEN PROTECTION",
    eyebrowBn: "স্ক্রিন প্রোটেকশন",
    headline: "BLUECUT\nCOLLECTION",
    headlineBn: "BLUECUT\nকালেকশন",
    subtitle: "Protect your eyes from screen glare",
    subtitleBn: "আপনার চোখকে স্ক্রিনের আলো থেকে রক্ষা করুন",
    cta: "/shop?category=bluecut",
  },
];

const INITIAL_SECTIONS = ["sunglasses", "optical", "bluecut", "nightdrive", "daywear", "threein1"];

const DEFAULT_BRAND_STORY: BrandStoryConfig = {
  eyebrow: "BRAND STORY",
  eyebrowBn: "ব্র্যান্ড স্টোরি",
  title: "CRAFTED FOR CLARITY,\nDESIGNED FOR YOU.",
  titleBn: "স্বচ্ছতার জন্য তৈরি,\nআপনার জন্য ডিজাইন।",
  description: "It's not just eyewear -- it's a reflection of your personality. Every frame is crafted with a blend of precision and style.",
  descriptionBn: "এটা শুধু চশমা না -- এটা আপনার personality র reflection। প্রতিটি frame তৈরি হয়েছে precision আর style এর মিশ্রণে।",
  ctaText: "Learn More",
  ctaTextBn: "আরো জানুন",
  ctaLink: "/shop",
};

const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "col-about",
    title: "About Us",
    titleBn: "আমাদের সম্পর্কে",
    links: [
      { label: "Our Story", labelBn: "আমাদের গল্প", url: "#" },
      { label: "Shipping Policy", labelBn: "শিপিং পলিসি", url: "#" },
      { label: "Return & Exchange", labelBn: "রিটার্ন ও এক্সচেঞ্জ", url: "#" },
      { label: "Privacy Policy", labelBn: "গোপনীয়তা পলিসি", url: "#" },
    ],
  },
  {
    id: "col-quick",
    title: "Quick Links",
    titleBn: "কুইক লিংকস",
    links: [
      { label: "Shop All", labelBn: "সব প্রোডাক্ট", url: "/shop" },
      { label: "Sunglasses", labelBn: "সানগ্লাস", url: "/shop?category=sunglasses" },
      { label: "Optical Frames", labelBn: "অপটিক্যাল ফ্রেম", url: "/shop?category=optical" },
      { label: "Track Your Order", labelBn: "অর্ডার ট্র্যাক করুন", url: "#" },
    ],
  },
];

const DEFAULT_SOCIALS: SocialHandles = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  tiktok: "https://tiktok.com",
  x: "https://x.com",
};

const DEFAULT_MENU_ITEMS: FooterLink[] = [
  { label: "Track Your Order", labelBn: "অর্ডার ট্র্যাক করুন", url: "#" },
  { label: "Help & FAQ", labelBn: "সহায়তা ও এফএকিউ", url: "#" },
  { label: "Contact Us", labelBn: "যোগাযোগ", url: "#" },
];

export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      categories: INITIAL_CATEGORIES,
      shapes: INITIAL_SHAPES,
      heroSlides: INITIAL_SLIDES,
      homeSections: INITIAL_SECTIONS,
      itemsPerSection: 10,

      // Promo Default Settings
      promoEnabled: true,
      promoText: "FREE SHIPPING NATIONWIDE ON ORDERS OVER ৳3,000",
      promoTextBn: "৳৩,০০০ এর বেশি অর্ডারে সারা দেশে ফ্রি শিপিং",
      promoLink: "/shop",

      // Brand Story Default Settings
      brandStory: DEFAULT_BRAND_STORY,

      // Contact default values
      whatsapp: "01XXXXXXXXX",
      email: "care@eyeprestige.com",
      address: "Chandgoan R/A, Chittagong, Bangladesh",
      socials: DEFAULT_SOCIALS,

      // Footer columns default settings
      footerColumns: DEFAULT_FOOTER_COLUMNS,

      // Menu settings
      menuItems: DEFAULT_MENU_ITEMS,

      addCategory: (cat) => {
        set({ categories: [...get().categories, cat] });
      },

      updateCategory: (key, updated) => {
        set({
          categories: get().categories.map((c) =>
            c.key === key ? { ...c, ...updated } : c
          ),
        });
      },

      deleteCategory: (key) => {
        set({
          categories: get().categories.filter((c) => c.key !== key),
          homeSections: get().homeSections.filter((s) => s !== key),
        });
      },

      addShape: (shape) => {
        if (!get().shapes.includes(shape)) {
          set({ shapes: [...get().shapes, shape] });
        }
      },

      deleteShape: (shape) => {
        set({ shapes: get().shapes.filter((s) => s !== shape) });
      },

      updateHeroSlide: (index, updated) => {
        set({
          heroSlides: get().heroSlides.map((s, idx) =>
            idx === index ? { ...s, ...updated } : s
          ),
        });
      },

      setHomeSections: (keys) => set({ homeSections: keys }),

      setItemsPerSection: (count) => set({ itemsPerSection: count }),

      setPromoSettings: (settings) => {
        set({
          promoEnabled: settings.enabled !== undefined ? settings.enabled : get().promoEnabled,
          promoText: settings.text !== undefined ? settings.text : get().promoText,
          promoTextBn: settings.textBn !== undefined ? settings.textBn : get().promoTextBn,
          promoLink: settings.link !== undefined ? settings.link : get().promoLink,
        });
      },

      setBrandStorySettings: (settings) => {
        set({
          brandStory: {
            ...get().brandStory,
            ...settings,
          },
        });
      },

      setContactSettings: (settings) => {
        set({
          whatsapp: settings.whatsapp !== undefined ? settings.whatsapp : get().whatsapp,
          email: settings.email !== undefined ? settings.email : get().email,
          address: settings.address !== undefined ? settings.address : get().address,
          socials: {
            ...get().socials,
            ...(settings.socials || {}),
          },
        });
      },

      setFooterColumns: (columns) => set({ footerColumns: columns }),

      setMenuItems: (items) => set({ menuItems: items }),

      restoreDefaults: () => {
        set({
          categories: INITIAL_CATEGORIES,
          shapes: INITIAL_SHAPES,
          heroSlides: INITIAL_SLIDES,
          homeSections: INITIAL_SECTIONS,
          itemsPerSection: 10,
          promoEnabled: true,
          promoText: "FREE SHIPPING NATIONWIDE ON ORDERS OVER ৳3,000",
          promoTextBn: "৳৩,০০০ এর বেশি অর্ডারে সারা দেশে ফ্রি শিপিং",
          promoLink: "/shop",
          brandStory: DEFAULT_BRAND_STORY,
          whatsapp: "01XXXXXXXXX",
          email: "care@eyeprestige.com",
          address: "Chandgoan R/A, Chittagong, Bangladesh",
          socials: DEFAULT_SOCIALS,
          footerColumns: DEFAULT_FOOTER_COLUMNS,
          menuItems: DEFAULT_MENU_ITEMS,
        });
      },
    }),
    { name: "eye-prestige-config-v3" }
  )
);
