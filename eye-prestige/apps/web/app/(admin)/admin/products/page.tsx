"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, X, RefreshCw, Eye } from "lucide-react";
import { useProductStore } from "@/lib/product-store";
import { useConfigStore } from "@/lib/config-store";
import { formatPrice } from "@/lib/utils";
import type { Product, Shape, CategoryKey } from "@/lib/types";

const DEFAULT_CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "sunglasses", label: "Sunglasses" },
  { key: "optical", label: "Optical" },
  { key: "bluecut", label: "Blue Cut" },
  { key: "nightdrive", label: "Night Drive" },
  { key: "daywear", label: "Day Wear" },
  { key: "threein1", label: "3 in 1" },
];

const DEFAULT_SHAPES: Shape[] = ["Round", "Square", "Aviator", "Cat-Eye", "Rectangle"];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop";

export default function AdminProductsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { products, addProduct, updateProduct, deleteProduct, restoreDefaults } = useProductStore();
  const storeCategories = useConfigStore((s) => s.categories);
  const storeShapes = useConfigStore((s) => s.shapes);

  const activeCategories = mounted ? storeCategories.map(c => ({ key: c.key as CategoryKey, label: c.name })) : DEFAULT_CATEGORIES;
  const activeShapes = mounted ? storeShapes : DEFAULT_SHAPES;

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1990);
  const [compareAtPrice, setCompareAtPrice] = useState<number | "">("");
  const [category, setCategory] = useState<CategoryKey>("sunglasses");
  const [shape, setShape] = useState<Shape>("Round");
  const [stock, setStock] = useState(10);
  const [images, setImages] = useState<string[]>(["", "", "", "", ""]);
  const [description, setDescription] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState<number | "">("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64 = event.target.result as string;
          setImages((prev) => {
            const next = [...prev];
            next[index] = base64;
            return next;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  };
  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setPrice(1990);
    setCompareAtPrice("");
    setCategory(activeCategories[0]?.key || "sunglasses");
    setShape(activeShapes[0] || "Round");
    setStock(10);
    setImages(["", "", "", "", ""]);
    setDescription("");
    setPrescriptionRequired(false);
    setFeatured(false);
    setDisabled(false);
    setFeaturedOrder("");
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price);
    setCompareAtPrice(p.compareAtPrice || "");
    setCategory(p.category);
    setShape(p.shape);
    setStock(p.stock);

    const originalImages = p.images || [];
    const padded = [...originalImages];
    while (padded.length < 5) padded.push("");
    setImages(padded);

    setDescription(p.description || "");
    setPrescriptionRequired(p.prescriptionRequired);
    setFeatured(p.featured);
    setDisabled(p.disabled || false);
    setFeaturedOrder(p.featuredOrder || "");
    setModalOpen(true);
  };  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const filteredImages = images.filter((img) => img.trim() !== "");
    const finalImages = filteredImages.length > 0 ? filteredImages : [DEFAULT_IMAGE];

    const data = {
      name,
      slug,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      category,
      shape,
      stock: Number(stock),
      images: finalImages,
      description,
      prescriptionRequired,
      featured,
      disabled,
      featuredOrder: featuredOrder !== "" ? Number(featuredOrder) : undefined,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct({
        id: `prod-${Date.now()}`,
        ...data,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  if (!mounted) {
    return (
      <div className="flex h-96 items-center justify-center text-neutral-400">
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Product Catalog</h1>
          <p className="text-xs text-neutral-400 mt-1">Add, update, adjust inventory, and manage storefront product listings.</p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={restoreDefaults}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-semibold text-neutral-400 hover:text-white transition-all uppercase tracking-wider"
          >
            <RefreshCw size={14} />
            Reset Defaults
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-all uppercase tracking-wider"
          >
            <Plus size={15} />
            Add Product
          </button>
        </div>
      </div>

      {/* Search & Filter section */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search products by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white outline-none placeholder:text-neutral-600 focus:border-neutral-700"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
          >
            <option value="all">All Categories</option>
            {activeCategories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/30 text-[10px] uppercase font-bold text-neutral-500">
                <th className="p-4 w-16">Preview</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Shape</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-900/30 group">
                    <td className="p-4">
                      <div className="relative h-11 w-9 overflow-hidden rounded border border-neutral-800 bg-neutral-900">
                        <Image src={p.images[0] || DEFAULT_IMAGE} alt={p.name} fill className="object-cover" sizes="36px" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white group-hover:underline cursor-pointer" onClick={() => openEditModal(p)}>{p.name}</p>
                          {p.disabled && (
                            <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                              Disabled
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{p.slug}</p>
                      </div>
                    </td>
                    <td className="p-4 uppercase tracking-wider text-[10px] text-neutral-400 font-medium">
                      {p.category}
                    </td>
                    <td className="p-4 text-neutral-400 font-medium">{p.shape}</td>
                    <td className="p-4 font-semibold text-white tabular-nums">
                      {formatPrice(p.price)}
                      {p.compareAtPrice && (
                        <span className="text-[10px] text-neutral-500 line-through ml-2 font-normal">
                          {formatPrice(p.compareAtPrice)}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stock === 0
                          ? "bg-red-500/10 text-red-500"
                          : p.stock <= 3
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-neutral-800 text-neutral-400"
                      }`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          href={`/shop/${p.slug}`}
                          target="_blank"
                          className="p-2 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                          title="View on storefront"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                          title="Edit product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded hover:bg-neutral-900 text-neutral-400 hover:text-red-400 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-600">
                    No products found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded hover:bg-neutral-900 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div>
              <h3 className="text-base font-bold text-white">
                {editingProduct ? "Edit Product Detail" : "Add New Eyewear Style"}
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">Fill out product configuration and details below.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amber Horizon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                />
              </div>

              {/* Price & Compare */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Price (৳)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1990"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Compare At Price (৳)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2990"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                  />
                </div>
              </div>

              {/* Category & Shape & Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryKey)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                  >
                    {activeCategories.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Shape</label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                  >
                    {activeShapes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Stock Qty</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 10"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                  />
                </div>
              </div>

              {/* Multiple Images Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Product Images (Up to 5 perspectives)</label>
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="relative aspect-[3/4] rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden flex items-center justify-center">
                        {img ? (
                          <>
                            <Image src={img} alt={`Preview ${i + 1}`} fill className="object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(i)}
                              className="absolute top-1 right-1 h-5 w-5 bg-neutral-950/80 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all text-xs"
                            >
                              &times;
                            </button>
                          </>
                        ) : (
                          <label className="cursor-pointer h-full w-full flex flex-col items-center justify-center p-2 text-center hover:bg-neutral-800/40 transition-all select-none">
                            <Plus size={16} className="text-neutral-500" />
                            <span className="text-[8px] text-neutral-500 font-bold uppercase mt-1">Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(i, e)}
                            />
                          </label>
                        )}
                      </div>
                      <span className="text-[8px] text-center font-bold text-neutral-500 uppercase">
                        {i === 0 && "Front"}
                        {i === 1 && "Side"}
                        {i === 2 && "45°"}
                        {i === 3 && "Life 1"}
                        {i === 4 && "Life 2"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
                <textarea
                  placeholder="Style particulars and frame materials..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none resize-none focus:border-neutral-700"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prescriptionRequired}
                    onChange={(e) => setPrescriptionRequired(e.target.checked)}
                    className="rounded border-neutral-800 bg-neutral-900 text-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Prescription Required</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-neutral-800 bg-neutral-900 text-white focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                    className="rounded border-neutral-800 bg-neutral-900 text-white focus:ring-0 focus:ring-offset-0"
                  />
                </label>
              </div>

              <div className="space-y-1 border-t border-neutral-800 pt-3.5">
                <label className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Home Featured Order (Serial Number)</label>
                <input
                  type="number"
                  value={featuredOrder}
                  onChange={(e) => setFeaturedOrder(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 1 (Leave blank for random)"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                />
                <p className="text-[9.5px] text-neutral-500 leading-normal mt-1">Products with a serial number will show up first in their category row section (e.g. 1 is first, 2 is second). Non-featured products will be randomized afterwards.</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 border-t border-neutral-800 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white transition-all uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-all uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
