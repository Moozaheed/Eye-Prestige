"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Check, RefreshCw, Upload, Layout, Columns, Film, Eye, Megaphone } from "lucide-react";
import { useConfigStore, CategoryItem, HeroSlide } from "@/lib/config-store";

export default function AdminContentPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    categories,
    shapes,
    heroSlides,
    homeSections,
    itemsPerSection,
    promoEnabled,
    promoText,
    promoTextBn,
    promoLink,
    brandStory,
    whatsapp,
    email,
    address,
    socials,
    footerColumns,
    menuItems,
    addCategory,
    updateCategory,
    deleteCategory,
    addShape,
    deleteShape,
    updateHeroSlide,
    setHomeSections,
    setItemsPerSection,
    setPromoSettings,
    setBrandStorySettings,
    setContactSettings,
    setFooterColumns,
    setMenuItems,
    restoreDefaults,
  } = useConfigStore();

  const [activeTab, setActiveTab] = useState<"hero" | "categories" | "shapes" | "layout" | "marketing">("hero");
  const [successMsg, setSuccessMsg] = useState("");

  // Category modal / form states
  const [newCatKey, setNewCatKey] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [newCatNameBn, setNewCatNameBn] = useState("");
  const [newCatImage, setNewCatImage] = useState("");

  // Shape form state
  const [newShapeName, setNewShapeName] = useState("");

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatKey.trim() || !newCatName.trim()) return;

    const key = newCatKey.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    if (categories.some((c) => c.key === key)) {
      alert("Category key already exists!");
      return;
    }

    addCategory({
      key,
      name: newCatName,
      nameBn: newCatNameBn || newCatName,
      image: newCatImage || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop",
    });

    setNewCatKey("");
    setNewCatName("");
    setNewCatNameBn("");
    setNewCatImage("");
    triggerSuccess("Category added successfully!");
  };

  const handleCategoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewCatImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCategoryValue = (key: string, field: keyof CategoryItem, value: string) => {
    updateCategory(key, { [field]: value });
    triggerSuccess("Category updated!");
  };

  const handleCategoryListImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateCategory(key, { image: event.target.result as string });
          triggerSuccess("Category thumbnail updated!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddShape = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShapeName.trim()) return;

    const name = newShapeName.trim();
    if (shapes.includes(name)) {
      alert("Shape already exists!");
      return;
    }

    addShape(name);
    setNewShapeName("");
    triggerSuccess(`Shape "${name}" added!`);
  };

  const handleUpdateSlideImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateHeroSlide(index, { image: event.target.result as string });
          triggerSuccess(`Slide ${index + 1} background updated!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleHomeSection = (key: string) => {
    if (homeSections.includes(key)) {
      // Remove unless it is the last one
      if (homeSections.length > 1) {
        setHomeSections(homeSections.filter((s) => s !== key));
        triggerSuccess("Homepage section removed.");
      } else {
        alert("Must display at least one homepage category section.");
      }
    } else {
      setHomeSections([...homeSections, key]);
      triggerSuccess("Homepage section added!");
    }
  };

  const handleMoveHomeSection = (index: number, direction: "up" | "down") => {
    const list = [...homeSections];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setHomeSections(list);
    triggerSuccess("Section order rearranged.");
  };

  if (!mounted) {
    return (
      <div className="flex h-[400px] items-center justify-center text-neutral-400">
        <RefreshCw className="animate-spin mr-2" size={16} />
        <span>Loading CMS settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Content Management (CMS)</h1>
          <p className="text-xs text-neutral-500 mt-1">Configure layout, shapes, hero content, and categories on the storefront.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("Reset all content templates to original factory presets? This will overwrite your CMS edits.")) {
                restoreDefaults();
                triggerSuccess("Content settings reverted to default.");
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <RefreshCw size={12} />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Success Notification Bar */}
      {successMsg && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-xs font-semibold text-green-400 shadow-xl transition-all animate-bounce">
          <Check size={14} />
          {successMsg}
        </div>
      )}

      {/* CMS Tab Bar Navigation */}
      <div className="flex border-b border-neutral-800 gap-1 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "hero"
              ? "border-white text-white bg-neutral-800/10"
              : "border-transparent text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Film size={13} />
          Hero Slides
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "categories"
              ? "border-white text-white bg-neutral-800/10"
              : "border-transparent text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Layout size={13} />
          Categories
        </button>
        <button
          onClick={() => setActiveTab("shapes")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "shapes"
              ? "border-white text-white bg-neutral-800/10"
              : "border-transparent text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Columns size={13} />
          Shapes
        </button>
        <button
          onClick={() => setActiveTab("layout")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "layout"
              ? "border-white text-white bg-neutral-800/10"
              : "border-transparent text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Eye size={13} />
          Homepage Layout
        </button>
        <button
          onClick={() => setActiveTab("marketing")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "marketing"
              ? "border-white text-white bg-neutral-800/10"
              : "border-transparent text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Megaphone size={13} />
          Promo & Brand Story
        </button>
      </div>

      {/* Tab Panel contents */}
      <div className="space-y-6">
        
        {/* HERO SLIDES TAB */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide, idx) => (
                <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
                  {/* Slide background visual preview */}
                  <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden group">
                    <Image
                      src={slide.image}
                      alt={`Slide ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="flex items-center gap-1.5 bg-white text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-full cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all">
                        <Upload size={12} />
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUpdateSlideImage(idx, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <span className="absolute top-3 left-3 bg-neutral-950/70 backdrop-blur text-[10px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      Slide {idx + 1}
                    </span>
                  </div>

                  {/* Form fields */}
                  <div className="p-4 space-y-4 flex-1">
                    {/* Eyebrow */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Eyebrow (EN)</label>
                        <input
                          type="text"
                          value={slide.eyebrow}
                          onChange={(e) => updateHeroSlide(idx, { eyebrow: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white outline-none focus:border-neutral-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Eyebrow (BN)</label>
                        <input
                          type="text"
                          value={slide.eyebrowBn || ""}
                          onChange={(e) => updateHeroSlide(idx, { eyebrowBn: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white outline-none focus:border-neutral-700"
                        />
                      </div>
                    </div>

                    {/* Headline */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Headline (EN)</label>
                        <textarea
                          rows={2}
                          value={slide.headline}
                          onChange={(e) => updateHeroSlide(idx, { headline: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white outline-none focus:border-neutral-700 resize-none font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Headline (BN)</label>
                        <textarea
                          rows={2}
                          value={slide.headlineBn || ""}
                          onChange={(e) => updateHeroSlide(idx, { headlineBn: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white outline-none focus:border-neutral-700 resize-none font-sans"
                        />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Subtitle (EN)</label>
                        <textarea
                          rows={2}
                          value={slide.subtitle}
                          onChange={(e) => updateHeroSlide(idx, { subtitle: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 outline-none focus:border-neutral-700 resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Subtitle (BN)</label>
                        <textarea
                          rows={2}
                          value={slide.subtitleBn || ""}
                          onChange={(e) => updateHeroSlide(idx, { subtitleBn: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 outline-none focus:border-neutral-700 resize-none"
                        />
                      </div>
                    </div>

                    {/* CTA URL */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">CTA Link Destination</label>
                      <input
                        type="text"
                        value={slide.cta}
                        onChange={(e) => updateHeroSlide(idx, { cta: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                        placeholder="/shop"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORIES MANAGEMENT TAB */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Create Category Panel */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create New Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Category Key (URL Slug)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. nightdrive"
                    value={newCatKey}
                    onChange={(e) => setNewCatKey(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Name (EN)</label>
                    <input
                      type="text"
                      required
                      placeholder="Night Drive"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Name (BN)</label>
                    <input
                      type="text"
                      placeholder="নাইট ড্রাইভ"
                      value={newCatNameBn}
                      onChange={(e) => setNewCatNameBn(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                {/* Category Thumbnail selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Category Image</label>
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex-none">
                      {newCatImage ? (
                        <Image src={newCatImage} alt="New Category" fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-neutral-600">
                          <Layout size={20} />
                        </div>
                      )}
                    </div>
                    <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-neutral-800 hover:border-neutral-700 rounded-lg py-4 text-center cursor-pointer select-none transition-colors">
                      <Upload size={14} className="text-neutral-500 mb-1" />
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Upload Thumbnail</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <Plus size={14} />
                  Add Category
                </button>
              </form>
            </div>

            {/* List Categories Panel */}
            <div className="xl:col-span-2 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Storefront Categories</h3>
              <div className="divide-y divide-neutral-900 max-h-[500px] overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <div key={cat.key} className="flex flex-col sm:flex-row items-center gap-4 py-4 first:pt-0 last:pb-0">
                    
                    {/* Thumbnail slot */}
                    <div className="relative h-14 w-14 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden group flex-none">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="56px" />
                      <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <Upload size={10} className="text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCategoryListImageUpload(cat.key, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Meta Fields */}
                    <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-600">Name (English)</label>
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => handleEditCategoryValue(cat.key, "name", e.target.value)}
                          className="w-full bg-neutral-900 border border-transparent rounded px-2 py-1 text-xs text-white outline-none focus:border-neutral-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-600">Name (Bangla)</label>
                        <input
                          type="text"
                          value={cat.nameBn || ""}
                          onChange={(e) => handleEditCategoryValue(cat.key, "nameBn", e.target.value)}
                          className="w-full bg-neutral-900 border border-transparent rounded px-2 py-1 text-xs text-white outline-none focus:border-neutral-700"
                        />
                      </div>
                    </div>

                    {/* Meta Key Info / Remove */}
                    <div className="flex items-center gap-3 justify-between w-full sm:w-auto flex-none border-t border-neutral-900/50 pt-2 sm:border-0 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-neutral-500 font-mono block">Key:</span>
                        <code className="text-[10px] text-neutral-400 font-mono">{cat.key}</code>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete category "${cat.name}"? This will remove it from storefront filters and home section grids.`)) {
                            deleteCategory(cat.key);
                            triggerSuccess(`Category "${cat.name}" deleted.`);
                          }
                        }}
                        className="p-2 rounded bg-neutral-900 hover:bg-red-500/10 text-neutral-500 hover:text-red-500 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SHAPES MANAGEMENT TAB */}
        {activeTab === "shapes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Create Shape Panel */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create New Frame Shape</h3>
              <form onSubmit={handleAddShape} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Shape Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hexagonal, Butterfly"
                    value={newShapeName}
                    onChange={(e) => setNewShapeName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <Plus size={14} />
                  Add Shape
                </button>
              </form>
            </div>

            {/* List Shapes Panel */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Frame Shapes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-1">
                {shapes.map((shape) => (
                  <div key={shape} className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-xs font-semibold text-white">{shape}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete shape "${shape}" from option pickers?`)) {
                          deleteShape(shape);
                          triggerSuccess(`Shape "${shape}" deleted.`);
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-500/10 text-neutral-500 hover:text-red-500 transition-colors"
                      title="Delete Shape"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* HOMEPAGE LAYOUT SETTINGS */}
        {activeTab === "layout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Top Categories to display */}
            <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Homepage Category Grid Sections</h3>
              <p className="text-[11px] text-neutral-500">Configure which category listing grids are shown on the home page, and rearrange their render order.</p>
              
              <div className="space-y-2.5">
                {categories.map((cat, idx) => {
                  const isActive = homeSections.includes(cat.key);
                  const activeIdx = homeSections.indexOf(cat.key);
                  
                  return (
                    <div
                      key={cat.key}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                        isActive
                          ? "bg-neutral-900/60 border-neutral-800"
                          : "bg-neutral-950 border-neutral-900 opacity-60"
                      }`}
                    >
                      {/* Checkbox toggle */}
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleToggleHomeSection(cat.key)}
                        className="rounded border-neutral-800 bg-neutral-950 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer h-4 w-4"
                      />

                      {/* Info thumbnail */}
                      <div className="relative h-10 w-10 rounded overflow-hidden border border-neutral-800 bg-neutral-900">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="40px" />
                      </div>

                      {/* Meta */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{cat.name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono truncate">{cat.key}</p>
                      </div>

                      {/* Rearrange order up/down arrows */}
                      {isActive && (
                        <div className="flex items-center gap-1">
                          <button
                            disabled={activeIdx === 0}
                            onClick={() => handleMoveHomeSection(activeIdx, "up")}
                            className="p-1 text-neutral-500 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
                            title="Move section up"
                          >
                            ▲
                          </button>
                          <button
                            disabled={activeIdx === homeSections.length - 1}
                            onClick={() => handleMoveHomeSection(activeIdx, "down")}
                            className="p-1 text-neutral-500 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
                            title="Move section down"
                          >
                            ▼
                          </button>
                          <span className="text-[10px] text-neutral-400 font-bold ml-1 w-4 text-center">
                            #{activeIdx + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid limit config */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4 h-fit">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Section Limits</h3>
              <p className="text-[11px] text-neutral-500">Configure how many product frames are shown per category row section on the home page slider.</p>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Products Display Limit</label>
                  <select
                    value={itemsPerSection}
                    onChange={(e) => {
                      setItemsPerSection(Number(e.target.value));
                      triggerSuccess(`Row section items limit set to ${e.target.value}.`);
                    }}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                  >
                    <option value={10}>10 Products (Default)</option>
                    <option value={12}>12 Products</option>
                    <option value={15}>15 Products</option>
                    <option value={20}>20 Products</option>
                    <option value={25}>25 Products</option>
                    <option value={30}>30 Products</option>
                    <option value={100}>Show All Products</option>
                  </select>
                </div>
                
                <div className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-lg text-[10px] text-neutral-400 leading-normal space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[9px] mb-1">💡 Mobile Tip</p>
                  <p>On mobile layouts, category row sections are scrollable horizontally to save vertical space. Selecting a smaller limit (4 or 5) maintains page load speed while offering optimal scrolling variety.</p>
                </div>
            </div>

          </div>
        </div>
      )}

        {/* PROMO & BRAND STORY TAB */}
        {activeTab === "marketing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column: Promo Banner & Contact Coordinates */}
            <div className="space-y-6">
              
              {/* Promo Banner Customize Box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Promo Announcement Banner</h3>
                  <label className="flex items-center gap-2 text-xs text-neutral-300 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promoEnabled}
                      onChange={(e) => setPromoSettings({ enabled: e.target.checked })}
                      className="rounded border-neutral-800 bg-neutral-900 text-white focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Active / Visible</span>
                  </label>
                </div>
                <p className="text-[11px] text-neutral-500">Configure the header banner displayed at the very top of all storefront pages to run seasonal promotions.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Banner text (EN)</label>
                      <input
                        type="text"
                        value={promoText}
                        onChange={(e) => setPromoSettings({ text: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Banner text (BN)</label>
                      <input
                        type="text"
                        value={promoTextBn}
                        onChange={(e) => setPromoSettings({ textBn: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Banner CTA Link Destination</label>
                    <input
                      type="text"
                      value={promoLink}
                      onChange={(e) => setPromoSettings({ link: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                      placeholder="/shop"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details & Social Handles Box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Social Coordinates</h3>
                <p className="text-[11px] text-neutral-500">Configure global support details shown in the storefront footer and sticky buttons.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">WhatsApp Support</label>
                      <input
                        type="text"
                        value={whatsapp}
                        onChange={(e) => setContactSettings({ whatsapp: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setContactSettings({ email: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Physical Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setContactSettings({ address: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
                    />
                  </div>

                  <div className="border-t border-neutral-850 pt-4 space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Social Profile Link Targets</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-400 uppercase">Instagram</label>
                        <input
                          type="text"
                          value={socials.instagram}
                          onChange={(e) => setContactSettings({ socials: { ...socials, instagram: e.target.value } })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-400 uppercase">Facebook</label>
                        <input
                          type="text"
                          value={socials.facebook}
                          onChange={(e) => setContactSettings({ socials: { ...socials, facebook: e.target.value } })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-400 uppercase">TikTok</label>
                        <input
                          type="text"
                          value={socials.tiktok}
                          onChange={(e) => setContactSettings({ socials: { ...socials, tiktok: e.target.value } })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-400 uppercase">X (Twitter)</label>
                        <input
                          type="text"
                          value={socials.x}
                          onChange={(e) => setContactSettings({ socials: { ...socials, x: e.target.value } })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items Configurator */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Header Menu Configuration</h3>
                  <button
                    onClick={() => {
                      const updated = [
                        ...menuItems,
                        { label: "New Menu Link", labelBn: "নতুন মেনু লিঙ্ক", url: "#" }
                      ];
                      setMenuItems(updated);
                      triggerSuccess("Menu link item added.");
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-white font-bold hover:bg-neutral-800 transition-colors"
                  >
                    <Plus size={10} />
                    Add Link
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">Add or update custom menu links displayed in the storefront side drawer menu panel.</p>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-neutral-900/30 p-2.5 rounded border border-neutral-800/60">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const list = [...menuItems];
                          list[idx].label = e.target.value;
                          setMenuItems(list);
                        }}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white outline-none focus:border-neutral-700 font-semibold"
                        placeholder="Label (EN)"
                      />
                      <input
                        type="text"
                        value={item.labelBn || ""}
                        onChange={(e) => {
                          const list = [...menuItems];
                          list[idx].labelBn = e.target.value;
                          setMenuItems(list);
                        }}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white outline-none focus:border-neutral-700 font-semibold"
                        placeholder="Label (BN)"
                      />
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => {
                            const list = [...menuItems];
                            list[idx].url = e.target.value;
                            setMenuItems(list);
                          }}
                          className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                          placeholder="URL (e.g. /shop)"
                        />
                        <button
                          onClick={() => {
                            const list = menuItems.filter((_, i) => i !== idx);
                            setMenuItems(list);
                            triggerSuccess("Menu link deleted.");
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 hover:bg-neutral-800/40 rounded transition-colors"
                          title="Delete Link"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {menuItems.length === 0 && (
                    <div className="text-center py-6 text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-lg">
                      No custom menu items configured. Click "Add Link" above.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Brand Story & Footer Columns Manager */}
            <div className="space-y-6">
              
              {/* Brand Story Customize Box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Brand Story Section</h3>
                <p className="text-[11px] text-neutral-500">Customize the Brand Story widget at the bottom of the storefront home page.</p>
                
                <div className="space-y-4">
                  {/* Eyebrow */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Eyebrow (EN)</label>
                      <input
                        type="text"
                        value={brandStory.eyebrow}
                        onChange={(e) => setBrandStorySettings({ eyebrow: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Eyebrow (BN)</label>
                      <input
                        type="text"
                        value={brandStory.eyebrowBn || ""}
                        onChange={(e) => setBrandStorySettings({ eyebrowBn: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Title (EN)</label>
                      <textarea
                        rows={2}
                        value={brandStory.title}
                        onChange={(e) => setBrandStorySettings({ title: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700 resize-none font-sans"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Title (BN)</label>
                      <textarea
                        rows={2}
                        value={brandStory.titleBn || ""}
                        onChange={(e) => setBrandStorySettings({ titleBn: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700 resize-none font-sans"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description (EN)</label>
                      <textarea
                        rows={3}
                        value={brandStory.description}
                        onChange={(e) => setBrandStorySettings({ description: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description (BN)</label>
                      <textarea
                        rows={3}
                        value={brandStory.descriptionBn || ""}
                        onChange={(e) => setBrandStorySettings({ descriptionBn: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 resize-none"
                      />
                    </div>
                  </div>

                  {/* CTA text / links */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Button CTA (EN)</label>
                      <input
                        type="text"
                        value={brandStory.ctaText}
                        onChange={(e) => setBrandStorySettings({ ctaText: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Button CTA (BN)</label>
                      <input
                        type="text"
                        value={brandStory.ctaTextBn || ""}
                        onChange={(e) => setBrandStorySettings({ ctaTextBn: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-neutral-700"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Button Link</label>
                      <input
                        type="text"
                        value={brandStory.ctaLink}
                        onChange={(e) => setBrandStorySettings({ ctaLink: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                        placeholder="/shop"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Columns Manager */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Footer Columns Configuration</h3>
                  <button
                    onClick={() => {
                      const newId = `col-${Date.now()}`;
                      const updated = [
                        ...footerColumns,
                        { id: newId, title: "New Column", titleBn: "নতুন কলাম", links: [] }
                      ];
                      setFooterColumns(updated);
                      triggerSuccess("New footer column added.");
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-white font-bold hover:bg-neutral-800 transition-colors"
                  >
                    <Plus size={10} />
                    Add Column
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">Configure custom columns and individual redirection links for storefront footer navigation.</p>
                
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">
                  {footerColumns.map((col, cIdx) => (
                    <div key={col.id || cIdx} className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-3.5 space-y-3">
                      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-2">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={col.title}
                            onChange={(e) => {
                              const list = [...footerColumns];
                              list[cIdx].title = e.target.value;
                              setFooterColumns(list);
                            }}
                            className="bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white outline-none focus:border-neutral-700 font-semibold"
                            placeholder="Title (EN)"
                          />
                          <input
                            type="text"
                            value={col.titleBn || ""}
                            onChange={(e) => {
                              const list = [...footerColumns];
                              list[cIdx].titleBn = e.target.value;
                              setFooterColumns(list);
                            }}
                            className="bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white outline-none focus:border-neutral-700 font-semibold"
                            placeholder="Title (BN)"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const list = footerColumns.filter((_, idx) => idx !== cIdx);
                            setFooterColumns(list);
                            triggerSuccess("Footer column deleted.");
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 hover:bg-neutral-800/40 rounded transition-colors"
                          title="Delete Column"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      {/* Column Links List */}
                      <div className="space-y-2">
                        {col.links.map((lnk, lIdx) => (
                          <div key={lIdx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-neutral-950/40 p-2 rounded border border-neutral-800/40">
                            <input
                              type="text"
                              value={lnk.label}
                              onChange={(e) => {
                                const list = [...footerColumns];
                                list[cIdx].links[lIdx].label = e.target.value;
                                setFooterColumns(list);
                              }}
                              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-white outline-none focus:border-neutral-700"
                              placeholder="Label (EN)"
                            />
                            <input
                              type="text"
                              value={lnk.labelBn || ""}
                              onChange={(e) => {
                                const list = [...footerColumns];
                                list[cIdx].links[lIdx].labelBn = e.target.value;
                                setFooterColumns(list);
                              }}
                              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-white outline-none focus:border-neutral-700"
                              placeholder="Label (BN)"
                            />
                            <div className="flex items-center gap-1.5 font-sans">
                              <input
                                type="text"
                                value={lnk.url}
                                onChange={(e) => {
                                  const list = [...footerColumns];
                                  list[cIdx].links[lIdx].url = e.target.value;
                                  setFooterColumns(list);
                                }}
                                className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-neutral-300 outline-none focus:border-neutral-700 font-mono"
                                placeholder="URL (e.g. /shop)"
                              />
                              <button
                                onClick={() => {
                                  const list = [...footerColumns];
                                  list[cIdx].links = list[cIdx].links.filter((_, idx) => idx !== lIdx);
                                  setFooterColumns(list);
                                  triggerSuccess("Link item removed.");
                                }}
                                className="p-1 text-neutral-500 hover:text-red-400 hover:bg-neutral-800/40 rounded transition-colors"
                                title="Delete Link"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => {
                            const list = [...footerColumns];
                            list[cIdx].links.push({ label: "New Link", labelBn: "নতুন লিঙ্ক", url: "#" });
                            setFooterColumns(list);
                            triggerSuccess("Link item added!");
                          }}
                          className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white font-semibold transition-colors mt-1"
                        >
                          <Plus size={10} />
                          Add Link Item
                        </button>
                      </div>
                    </div>
                  ))}

                  {footerColumns.length === 0 && (
                    <div className="text-center py-6 text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-lg">
                      No custom footer columns configured. Click "Add Column" above.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
