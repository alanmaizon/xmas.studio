import type { CartItem } from "@/lib/types";

const CART_KEY = "xmas-studio-cart";

export const readCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const writeCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item: CartItem) => {
  const current = readCart();
  const existing = current.find(
    (entry) =>
      entry.slug === item.slug &&
      entry.color === item.color &&
      entry.size === item.size,
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    current.push(item);
  }

  writeCart(current);
};

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
