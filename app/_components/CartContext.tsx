"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartItem = {
  id: string; name: string; priceInCents: number; imagePath: string; quantity: number;
};

type CartCtx = {
  items: CartItem[]; isOpen: boolean;
  openCart: () => void; closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number; totalCents: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem("qb-cart"); if (s) setItems(JSON.parse(s)); } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("qb-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: Omit<CartItem, "quantity">) =>
    setItems(p => p.find(i => i.id === item.id)
      ? p.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...p, { ...item, quantity: 1 }]);

  const removeItem = (id: string) => setItems(p => p.filter(i => i.id !== id));
  const updateQuantity = (id: string, delta: number) =>
    setItems(p => p.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0));
  const clearCart = () => setItems([]);

  return (
    <Ctx.Provider value={{
      items, isOpen,
      openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
      addItem, removeItem, updateQuantity, clearCart,
      totalCount: items.reduce((s, i) => s + i.quantity, 0),
      totalCents: items.reduce((s, i) => s + i.priceInCents * i.quantity, 0),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}
