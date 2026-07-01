import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, PaymentMethod, OrderStatus } from "./types";

export interface Order {
  id: string;
  phone: string;
  name: string;
  email?: string;
  division: string;
  district: string;
  area: string;
  address: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },

      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        });
      },

      deleteOrder: (id) => {
        set({ orders: get().orders.filter((o) => o.id !== id) });
      },

      clearOrders: () => set({ orders: [] }),
    }),
    { name: "eye-prestige-orders-v1" }
  )
);
