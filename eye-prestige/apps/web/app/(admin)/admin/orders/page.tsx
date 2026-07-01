"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Eye, X, Phone, Mail, MapPin, Clipboard, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useOrderStore, Order } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { orders, updateOrderStatus, deleteOrder, clearOrders } = useOrderStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Detail Modal states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search);
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    // If the modal is currently showing the updated order, sync it
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status } : null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this order record?")) {
      deleteOrder(id);
      setSelectedOrder(null);
    }
  };

  if (!mounted) {
    return (
      <div className="flex h-96 items-center justify-center text-neutral-400">
        Loading operations...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Order Operations</h1>
          <p className="text-xs text-neutral-400 mt-1">Review orders, inspect customer prescriptions, and update fulfillment statuses.</p>
        </div>
        {orders.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear all order records? This cannot be undone.")) {
                clearOrders();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-900/40 bg-red-950/20 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-all uppercase tracking-wider"
          >
            Clear All Orders
          </button>
        )}
      </div>

      {/* Search & Filter section */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search orders by ID, customer name, or phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white outline-none placeholder:text-neutral-600 focus:border-neutral-700"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-neutral-700"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/30 text-[10px] uppercase font-bold text-neutral-500">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-neutral-900/30 group">
                    <td className="p-4 font-semibold font-mono text-white">{o.id}</td>
                    <td className="p-4 font-medium text-neutral-200">{o.name}</td>
                    <td className="p-4 font-mono text-neutral-400">{o.phone}</td>
                    <td className="p-4 text-neutral-500">{new Date(o.createdAt).toLocaleString()}</td>
                    <td className="p-4 font-semibold text-white tabular-nums">{formatPrice(o.total)}</td>
                    <td className="p-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                        className={`bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-[11px] font-bold outline-none focus:border-neutral-700 ${
                          o.status === "PENDING" && "text-amber-500"
                        } ${
                          o.status === "CONFIRMED" && "text-blue-500"
                        } ${
                          o.status === "PROCESSING" && "text-purple-500"
                        } ${
                          o.status === "SHIPPED" && "text-cyan-500"
                        } ${
                          o.status === "DELIVERED" && "text-emerald-500"
                        } ${
                          o.status === "CANCELLED" && "text-red-500"
                        }`}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white transition-all font-semibold uppercase tracking-wider"
                        >
                          <Eye size={13} />
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-600">
                    No orders found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Inspector Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            {/* Close */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-4 top-4 p-1.5 rounded hover:bg-neutral-900 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Title / Id */}
            <div className="border-b border-neutral-800 pb-4 flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Order Record Details</span>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <h3 className="text-lg font-bold text-white font-mono">{selectedOrder.id}</h3>
                <span className="text-xs text-neutral-400">({new Date(selectedOrder.createdAt).toLocaleString()})</span>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Particulars */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Clipboard size={13} />
                  Customer Information
                </h4>
                <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-4 space-y-2.5 text-xs">
                  <p className="font-semibold text-white">{selectedOrder.name}</p>
                  <p className="flex items-center gap-2 text-neutral-400">
                    <Phone size={12} className="text-neutral-500" />
                    <span className="font-mono">{selectedOrder.phone}</span>
                  </p>
                  {selectedOrder.email && (
                    <p className="flex items-center gap-2 text-neutral-400">
                      <Mail size={12} className="text-neutral-500" />
                      <span>{selectedOrder.email}</span>
                    </p>
                  )}
                  <div className="flex items-start gap-2 text-neutral-400 border-t border-neutral-800/50 pt-2.5 mt-2.5">
                    <MapPin size={13} className="text-neutral-500 flex-none mt-0.5" />
                    <div>
                      <p>{selectedOrder.address}</p>
                      <p className="mt-1 text-[11px] font-medium text-neutral-500">
                        {selectedOrder.area}, {selectedOrder.district}, {selectedOrder.division}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Payment */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <FileText size={13} />
                  Fulfillment Status
                </h4>
                <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-4 space-y-4 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5">Change Status</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                      className={`w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-neutral-700 ${
                        selectedOrder.status === "PENDING" && "text-amber-500"
                      } ${
                        selectedOrder.status === "CONFIRMED" && "text-blue-500"
                      } ${
                        selectedOrder.status === "PROCESSING" && "text-purple-500"
                      } ${
                        selectedOrder.status === "SHIPPED" && "text-cyan-500"
                      } ${
                        selectedOrder.status === "DELIVERED" && "text-emerald-500"
                      } ${
                        selectedOrder.status === "CANCELLED" && "text-red-500"
                      }`}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t border-neutral-800/50 pt-3">
                    <p className="text-neutral-400">
                      <span className="text-neutral-500 font-bold uppercase text-[10px] block mb-0.5">Payment Method</span>
                      <span className="font-semibold text-white font-mono">{selectedOrder.paymentMethod}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Placed Items List */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Configured Items</h4>
              <div className="border border-neutral-800 bg-neutral-900/20 rounded-xl divide-y divide-neutral-800">
                {selectedOrder.items.map((item, idx) => {
                  const itemPrice = item.product.price + (item.selectedLens?.price || 0);
                  return (
                    <div key={idx} className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-white">{item.product.name}</p>
                          <p className="text-[10px] text-neutral-500 font-medium uppercase mt-0.5">
                            Category: {item.product.category} | Shape: {item.product.shape}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white tabular-nums">
                            {formatPrice(itemPrice)} &times; {item.quantity}
                          </p>
                          <p className="text-[10px] text-neutral-500 font-medium mt-0.5 tabular-nums">
                            Total: {formatPrice(itemPrice * item.quantity)}
                          </p>
                        </div>
                      </div>

                      {/* Lens Configuration Detail */}
                      {item.selectedLens && (
                        <div className="bg-neutral-900/60 rounded-lg p-3 border border-neutral-800 text-[11px] space-y-1.5">
                          <p className="text-white font-semibold flex items-center gap-1.5">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                            Lens Selection: {item.selectedLens.category.toUpperCase()}
                          </p>
                          {item.selectedLens.category !== "none" && (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-3 text-neutral-400">
                              <p>Type: <span className="text-neutral-200 font-medium">{item.selectedLens.typeName}</span></p>
                              <p>Add Price: <span className="text-neutral-200 font-semibold tabular-nums">+{formatPrice(item.selectedLens.price)}</span></p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Prescription details */}
                      {item.prescription && (
                        <div className="bg-neutral-900/60 rounded-lg p-3 border border-neutral-800 text-[11px] space-y-1.5">
                          <p className="text-white font-semibold flex items-center gap-1.5">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                            Prescription Review ({item.prescription.mode.toUpperCase()})
                          </p>
                          
                          {item.prescription.mode === "upload" && (
                            <div className="pl-3 space-y-1 text-neutral-400">
                              <p className="flex items-center gap-1.5">
                                <FileText size={12} className="text-neutral-500" />
                                Uploaded Prescription File: <span className="text-neutral-200 font-semibold font-mono underline">{item.prescription.imageFileName || "rx_file.pdf"}</span>
                              </p>
                              <div className="mt-2 h-20 w-32 border border-neutral-800 rounded bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500 font-mono italic">
                                RX File Mock Sandbox
                              </div>
                            </div>
                          )}

                          {item.prescription.mode === "manual" && item.prescription.values && (
                            <div className="pl-3 space-y-2">
                              <div className="grid grid-cols-3 gap-2 border-b border-neutral-800 pb-1.5 text-[10px] font-bold text-neutral-500 uppercase">
                                <span>Eye</span>
                                <span>SPH</span>
                                <span>CYL / Axis</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-neutral-400">
                                <span className="font-semibold text-neutral-300">Right (OD)</span>
                                <span className="font-mono">{item.prescription.values.right.sph || "0.00"}</span>
                                <span className="font-mono">{item.prescription.values.right.cyl || "0.00"} / {item.prescription.values.right.axis || "0"}°</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-neutral-400">
                                <span className="font-semibold text-neutral-300">Left (OS)</span>
                                <span className="font-mono">{item.prescription.values.left.sph || "0.00"}</span>
                                <span className="font-mono">{item.prescription.values.left.cyl || "0.00"} / {item.prescription.values.left.axis || "0"}°</span>
                              </div>
                              <p className="text-[10px] text-neutral-500 border-t border-neutral-800/40 pt-1.5">
                                Pupillary Distance (PD): <span className="text-neutral-300 font-bold font-mono">{item.prescription.values.pd || "N/A"} mm</span>
                              </p>
                            </div>
                          )}

                          {item.prescription.mode === "later" && (
                            <p className="pl-3 text-neutral-400 italic flex items-center gap-1.5">
                              <AlertCircle size={12} className="text-amber-500" />
                              Customer chose to provide prescription details later (WhatsApp/call).
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-xs space-y-2.5">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal</span>
                <span className="tabular-nums font-medium text-white">{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Fulfillment & Shipping Cost</span>
                <span className="tabular-nums font-medium text-white">{formatPrice(selectedOrder.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-neutral-800 pt-2.5 mt-2.5">
                <span>Grand Total</span>
                <span className="tabular-nums">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="flex justify-between items-center border-t border-neutral-800 pt-4">
              <button
                onClick={() => handleDelete(selectedOrder.id)}
                className="px-3.5 py-2 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-500 border border-red-900/40 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Delete Record
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-all uppercase tracking-wider"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
