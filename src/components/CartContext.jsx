import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // 🔁 Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Add to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.slug === item.slug);
      if (exists) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  // ❌ Remove from cart
  const removeFromCart = (slug) =>
    setCart((prev) => prev.filter((i) => i.slug !== slug));

  // 🔄 Update quantity
  const updateQty = (slug, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // ⬆️ Increment qty
  const incrementQty = (slug) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ⬇️ Decrement qty
  const decrementQty = (slug) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  // 🧹 Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        incrementQty,
        decrementQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
