"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  volumeLabel: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clear: () => void;
  totalCents: () => number;
  totalItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i
              )
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },
      setQuantity: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
        }));
      },
      clear: () => set({ items: [] }),
      totalCents: () => get().items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0)
    }),
    { name: "po22-koszyk" }
  )
);
