"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, DollarSign, TrendingUp, AlertTriangle, ArrowRight, ClipboardCheck } from "lucide-react";
import { useOrderStore } from "@/lib/order-store";
import { useProductStore } from "@/lib/product-store";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const orders = useOrderStore((s) => s.orders);
  const products = useProductStore((s) => s.products);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const revenue = orders
      .filter((o) => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + o.total, 0);
    const avgValue = totalOrders > 0 ? revenue / totalOrders : 0;
    const lowStock = products.filter((p) => p.stock <= 3);

    return {
      totalOrders,
      revenue,
      avgValue,
      lowStockCount: lowStock.length,
      lowStockItems: lowStock.slice(0, 5),
    };
  }, [orders, products]);

  if (!mounted) {
    return (
      <div className="flex h-96 items-center justify-center text-neutral-400">
        Loading metrics...
      </div>
    );
  }

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Overview Dashboard</h1>
        <p className="text-xs text-neutral-400 mt-1">Real-time statistics compiled from storefront operations.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Revenue */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Total Revenue</p>
            <h3 className="text-xl font-bold mt-1 text-white tabular-nums">{formatPrice(stats.revenue)}</h3>
            <p className="text-[10px] text-emerald-500 mt-1 flex items-center gap-1 font-medium">
              <span>★ Live Storefront</span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Orders */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Total Orders</p>
            <h3 className="text-xl font-bold mt-1 text-white tabular-nums">{stats.totalOrders}</h3>
            <p className="text-[10px] text-neutral-400 mt-1 font-medium">Placed via checkout</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <ShoppingBag size={20} />
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Average Ticket</p>
            <h3 className="text-xl font-bold mt-1 text-white tabular-nums">{formatPrice(stats.avgValue)}</h3>
            <p className="text-[10px] text-neutral-400 mt-1 font-medium">Per-order checkout value</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <TrendingUp size={20} />
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Low Stock Alerts</p>
            <h3 className="text-xl font-bold mt-1 text-white tabular-nums">{stats.lowStockCount}</h3>
            <p className="text-[10px] text-neutral-400 mt-1 font-medium">Items with &le; 3 in stock</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {/* Grid: Orders & Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-800 bg-neutral-950 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Recent Orders</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">Manage details and fulfillment workflows.</p>
            </div>
            <Link href="/admin/orders" className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
              View All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] uppercase font-bold text-neutral-500">
                  <th className="py-2.5">Order ID</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-900/30">
                      <td className="py-3 font-semibold font-mono text-white">{order.id}</td>
                      <td className="py-3">{order.name}</td>
                      <td className="py-3 text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 font-medium text-white tabular-nums">{formatPrice(order.total)}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          order.status === "PENDING" && "bg-amber-500/10 text-amber-500"
                        } ${
                          order.status === "CONFIRMED" && "bg-blue-500/10 text-blue-500"
                        } ${
                          order.status === "PROCESSING" && "bg-purple-500/10 text-purple-500"
                        } ${
                          order.status === "SHIPPED" && "bg-cyan-500/10 text-cyan-500"
                        } ${
                          order.status === "DELIVERED" && "bg-emerald-500/10 text-emerald-500"
                        } ${
                          order.status === "CANCELLED" && "bg-red-500/10 text-red-500"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-neutral-600">
                      No orders placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts detail */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-white">Low Stock Monitor</h3>
            <p className="text-[11px] text-neutral-500 mt-0.5">Inventory alerts that require attention.</p>
          </div>

          <div className="space-y-3">
            {stats.lowStockItems.length > 0 ? (
              stats.lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-800 bg-neutral-900/30">
                  <div>
                    <p className="text-xs font-semibold text-white">{item.name}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 uppercase tracking-wider">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.stock === 0 ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {item.stock} left
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-neutral-600 text-xs">
                All item stocks healthy.
              </div>
            )}
          </div>

          <Link href="/admin/products" className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs text-neutral-300 hover:text-white transition-all font-semibold uppercase tracking-wider">
            Go to Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
