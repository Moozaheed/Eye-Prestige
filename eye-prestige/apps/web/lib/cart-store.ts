import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem, SelectedLens, PrescriptionDetails } from "./types";

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    selectedLens?: SelectedLens,
    prescription?: PrescriptionDetails
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

const getItemId = (item: CartItem): string => {
  return (
    item.product.id +
    (item.selectedLens
      ? `-${item.selectedLens.category}-${item.selectedLens.typeId || ""}`
      : "")
  );
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, selectedLens, prescription) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) =>
            i.product.id === product.id &&
            i.selectedLens?.category === selectedLens?.category &&
            i.selectedLens?.typeId === selectedLens?.typeId
        );

        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + quantity,
            prescription: prescription || newItems[existingIndex].prescription,
          };
          set({ items: newItems });
        } else {
          set({
            items: [
              ...items,
              {
                product,
                quantity,
                selectedLens,
                prescription,
              },
            ],
          });
        }
      },

      removeItem: (itemId: string) => {
        set({
          items: get().items.filter((i) => getItemId(i) !== itemId),
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            getItemId(i) === itemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, i) =>
            sum +
            (i.product.price + (i.selectedLens?.price || 0)) * i.quantity,
          0
        ),
    }),
    { name: "eye-prestige-cart" }
  )
);
