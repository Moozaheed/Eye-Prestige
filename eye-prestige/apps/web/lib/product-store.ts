import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS as INITIAL_PRODUCTS } from "./mock-data";
import type { Product } from "./types";

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  restoreDefaults: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,

      addProduct: (product) => {
        set({ products: [...get().products, product] });
      },

      updateProduct: (id, updated) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        });
      },

      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },

      restoreDefaults: () => {
        set({ products: INITIAL_PRODUCTS });
      },
    }),
    { name: "eye-prestige-products-v1" }
  )
);
