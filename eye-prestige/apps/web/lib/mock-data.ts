import type { Category, Product, CategoryKey } from "./types";

const IMG = {
  A: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
  B: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
  C: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&auto=format&fit=crop",
  D: "https://images.unsplash.com/photo-1584036553516-bf83210aa16c?q=80&w=600&auto=format&fit=crop",
  E: "https://images.unsplash.com/photo-1610136649349-0f646f318053?q=80&w=600&auto=format&fit=crop",
  F: "https://images.unsplash.com/photo-1608539733292-190446b22b83?q=80&w=600&auto=format&fit=crop",
  G: "https://images.unsplash.com/photo-1611222777277-61319d63ca94?q=80&w=600&auto=format&fit=crop",
  H: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600&auto=format&fit=crop",
  I: "https://images.unsplash.com/photo-1563891217861-7924b471afb3?q=80&w=600&auto=format&fit=crop",
  J: "https://images.unsplash.com/photo-1646084081219-1090f72a531c?q=80&w=600&auto=format&fit=crop",
  K: "https://images.unsplash.com/photo-1589176449149-71f7ea77ec25?q=80&w=600&auto=format&fit=crop",
  L: "https://images.unsplash.com/photo-1646083774155-2a40b675641d?q=80&w=600&auto=format&fit=crop",
  M: "https://images.unsplash.com/photo-1581239125393-67d48d3dd429?q=80&w=600&auto=format&fit=crop",
  N: "https://images.unsplash.com/photo-1721020693392-e447ac5f52ee?q=80&w=600&auto=format&fit=crop",
};

export const CATEGORIES: Category[] = [
  {
    key: "sunglasses",
    name: "Sunglasses",
    image:
      "https://images.unsplash.com/photo-1616424831766-d616a58f1459?q=80&w=500&auto=format&fit=crop",
  },
  {
    key: "optical",
    name: "Optical",
    image:
      "https://images.unsplash.com/photo-1610555423081-85ec0b8eabac?q=80&w=500&auto=format&fit=crop",
  },
  {
    key: "bluecut",
    name: "Bluecut",
    image:
      "https://images.unsplash.com/photo-1659885341413-87fc7f453a1b?q=80&w=500&auto=format&fit=crop",
  },
  {
    key: "nightdrive",
    name: "Night Drive",
    image:
      "https://images.unsplash.com/photo-1599705709640-9f9eb5964485?q=80&w=500&auto=format&fit=crop",
  },
  {
    key: "daywear",
    name: "Day Wear",
    image:
      "https://images.unsplash.com/photo-1564086334005-5c65e4f9f242?q=80&w=500&auto=format&fit=crop",
  },
  {
    key: "threein1",
    name: "3 In 1",
    image:
      "https://images.unsplash.com/photo-1611824204322-24963b44d68b?q=80&w=500&auto=format&fit=crop",
  },
];

export const PRODUCTS: Product[] = [
  // Sunglasses
  { id: "s1", name: "Riviera", slug: "riviera", price: 2490, shape: "Aviator", category: "sunglasses", images: [IMG.A], prescriptionRequired: false, featured: true, stock: 25 },
  { id: "s2", name: "Wayfarer Noir", slug: "wayfarer-noir", price: 1990, shape: "Square", category: "sunglasses", images: [IMG.B], prescriptionRequired: false, featured: true, stock: 18 },
  { id: "s3", name: "Amber Horizon", slug: "amber-horizon", price: 2290, shape: "Round", category: "sunglasses", images: [IMG.C], prescriptionRequired: false, featured: false, stock: 30 },
  { id: "s4", name: "Obsidian Frame", slug: "obsidian-frame", price: 1790, shape: "Rectangle", category: "sunglasses", images: [IMG.D], prescriptionRequired: false, featured: false, stock: 12 },
  { id: "s5", name: "Tortoise Classic", slug: "tortoise-classic", price: 2090, shape: "Cat-Eye", category: "sunglasses", images: [IMG.E], prescriptionRequired: false, featured: false, stock: 22 },

  // Optical
  { id: "o1", name: "Clarity Round", slug: "clarity-round", price: 1690, shape: "Round", category: "optical", images: [IMG.J], prescriptionRequired: true, featured: true, stock: 15 },
  { id: "o2", name: "Heritage Black", slug: "heritage-black", price: 1490, shape: "Rectangle", category: "optical", images: [IMG.K], prescriptionRequired: true, featured: false, stock: 20 },
  { id: "o3", name: "Mono Steel", slug: "mono-steel", price: 1890, shape: "Square", category: "optical", images: [IMG.L], prescriptionRequired: true, featured: false, stock: 10 },
  { id: "o4", name: "Silver Line", slug: "silver-line", price: 1590, shape: "Aviator", category: "optical", images: [IMG.M], prescriptionRequired: true, featured: false, stock: 8 },
  { id: "o5", name: "Atelier Edit", slug: "atelier-edit", price: 1990, shape: "Cat-Eye", category: "optical", images: [IMG.N], prescriptionRequired: true, featured: true, stock: 14 },

  // Bluecut
  { id: "b1", name: "Screen Shield", slug: "screen-shield", price: 1290, shape: "Rectangle", category: "bluecut", images: [IMG.K], prescriptionRequired: true, featured: true, stock: 35 },
  { id: "b2", name: "Night Owl Clear", slug: "night-owl-clear", price: 1190, shape: "Round", category: "bluecut", images: [IMG.M], prescriptionRequired: true, featured: false, stock: 28 },
  { id: "b3", name: "Digital Round", slug: "digital-round", price: 1390, shape: "Round", category: "bluecut", images: [IMG.J], prescriptionRequired: true, featured: false, stock: 20 },
  { id: "b4", name: "Focus Steel", slug: "focus-steel", price: 1350, shape: "Square", category: "bluecut", images: [IMG.N], prescriptionRequired: true, featured: false, stock: 18 },
  { id: "b5", name: "Pixel Frame", slug: "pixel-frame", price: 1250, shape: "Aviator", category: "bluecut", images: [IMG.L], prescriptionRequired: true, featured: false, stock: 25 },

  // Night Drive
  { id: "n1", name: "Highway Amber", slug: "highway-amber", price: 2190, shape: "Aviator", category: "nightdrive", images: [IMG.B], prescriptionRequired: false, featured: true, stock: 15 },
  { id: "n2", name: "Polar Noir", slug: "polar-noir", price: 2390, shape: "Square", category: "nightdrive", images: [IMG.D], prescriptionRequired: false, featured: false, stock: 12 },
  { id: "n3", name: "Drive Sport", slug: "drive-sport", price: 1990, shape: "Rectangle", category: "nightdrive", images: [IMG.F], prescriptionRequired: false, featured: false, stock: 20 },
  { id: "n4", name: "Night Vision Pro", slug: "night-vision-pro", price: 2590, shape: "Round", category: "nightdrive", images: [IMG.G], prescriptionRequired: false, featured: false, stock: 8 },
  { id: "n5", name: "Dusk Aviator", slug: "dusk-aviator", price: 2090, shape: "Aviator", category: "nightdrive", images: [IMG.C], prescriptionRequired: false, featured: false, stock: 18 },

  // Day Wear
  { id: "d1", name: "Sunday Round", slug: "sunday-round", price: 1790, shape: "Round", category: "daywear", images: [IMG.A], prescriptionRequired: false, featured: true, stock: 30 },
  { id: "d2", name: "Coastal Tort", slug: "coastal-tort", price: 1990, shape: "Cat-Eye", category: "daywear", images: [IMG.C], prescriptionRequired: false, featured: false, stock: 22 },
  { id: "d3", name: "Linen Frame", slug: "linen-frame", price: 1690, shape: "Rectangle", category: "daywear", images: [IMG.E], prescriptionRequired: false, featured: false, stock: 16 },
  { id: "d4", name: "Boulevard", slug: "boulevard", price: 1890, shape: "Square", category: "daywear", images: [IMG.H], prescriptionRequired: false, featured: false, stock: 14 },
  { id: "d5", name: "Weekend Classic", slug: "weekend-classic", price: 1590, shape: "Aviator", category: "daywear", images: [IMG.B], prescriptionRequired: false, featured: false, stock: 26 },

  // 3 In 1
  { id: "t1", name: "Triplex Convertible", slug: "triplex-convertible", price: 2990, shape: "Square", category: "threein1", images: [IMG.D], prescriptionRequired: false, featured: true, stock: 10 },
  { id: "t2", name: "ShiftFrame", slug: "shiftframe", price: 2790, shape: "Rectangle", category: "threein1", images: [IMG.F], prescriptionRequired: false, featured: false, stock: 12 },
  { id: "t3", name: "AdaptLens", slug: "adaptlens", price: 2690, shape: "Round", category: "threein1", images: [IMG.G], prescriptionRequired: false, featured: false, stock: 8 },
  { id: "t4", name: "ClickClip", slug: "clickclip", price: 2490, shape: "Aviator", category: "threein1", images: [IMG.I], prescriptionRequired: false, featured: false, stock: 15 },
  { id: "t5", name: "MagSwap", slug: "magswap", price: 2890, shape: "Cat-Eye", category: "threein1", images: [IMG.A], prescriptionRequired: false, featured: false, stock: 6 },
];

export function getProductsByCategory(category: CategoryKey): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategoryName(key: CategoryKey): string {
  return CATEGORIES.find((c) => c.key === key)?.name ?? key;
}
