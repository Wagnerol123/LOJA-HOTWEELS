"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "hotwheels-store-cart";

interface CartContextValue {
  items: CartItem[];
  catalog: Product[];
  getProduct: (productId: string) => Product | undefined;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage write errors (e.g. private mode)
    }
  }, [items, hydrated]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (!cancelled) setCatalog(data);
      })
      .catch(() => {
        // ignore network errors; cart will show items without details
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function getProduct(productId: string) {
    return catalog.find((p) => p.id === productId);
  }

  function addItem(productId: string, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function setQuantity(productId: string, quantity: number) {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.productId !== productId);
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  }

  function clearCart() {
    setItems([]);
  }

  const { totalItems, totalPrice } = useMemo(() => {
    let count = 0;
    let price = 0;
    for (const item of items) {
      const product = catalog.find((p) => p.id === item.productId);
      if (!product) continue;
      count += item.quantity;
      price += product.price * item.quantity;
    }
    return { totalItems: count, totalPrice: price };
  }, [items, catalog]);

  const value: CartContextValue = {
    items,
    catalog,
    getProduct,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return ctx;
}
