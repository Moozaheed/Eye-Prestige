"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tag, ShoppingBag, Store, Users, ArrowLeft, Layers } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Tag },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/content", label: "Content (CMS)", icon: Layers },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-none border-r border-neutral-800 bg-neutral-950 flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-lg overflow-hidden flex-none">
            <Image
              src="/images/Logo Icon White.png"
              alt="EYE PRESTIGE Icon"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wider uppercase text-white">Eye Prestige</h1>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-white text-neutral-950 shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <Icon size={17} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-neutral-800">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all border border-neutral-800"
          >
            <ArrowLeft size={14} />
            Go to Store
          </Link>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2 rounded-lg bg-red-950/20 text-red-400 hover:text-red-200 hover:bg-red-950/40 text-xs font-semibold uppercase tracking-wider transition-all border border-red-900/30"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              {pathname === "/admin" && "Overview Dashboard"}
              {pathname === "/admin/products" && "Product Catalog"}
              {pathname === "/admin/orders" && "Order Operations"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 font-medium font-mono">SYSTEM: ACTIVE</span>
            <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-300">
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-y-auto bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
}
