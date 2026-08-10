import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProducts } from "@/lib/products";

const CART_STORAGE_KEY = "eventrentals_cart";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      }
      catch (err) {
        console.error("Failed to parse cart storage", err);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) => prev.flatMap((item) => item.id === productId ? (quantity > 0 ? [{ ...item, quantity }] : []) : [item]));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const products = getProducts();
  const cartProducts = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product)
          return null;
        return { ...product, quantity: item.quantity };
      })
      .filter(Boolean);
  }, [items, products]);

  return (
    <CartContext.Provider
      value={{ items, cartProducts, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
