import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

const WISHLIST_KEYS = ["wishlist", "wishlist-page2", "wishlist-page3"];

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    const allItems = WISHLIST_KEYS.flatMap((key) => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    });

    const unique = Array.from(
      new Map(allItems.map((item) => [item.slug, item])).values()
    );

    setWishlist(unique);
  };

  useEffect(() => {
    loadWishlist();
    const sync = () => loadWishlist();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const toggleWishlist = (item) => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = stored.some((i) => i.slug === item.slug);
    const updated = exists
      ? stored.filter((i) => i.slug !== item.slug)
      : [...stored, item];

    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // sync other tabs/components
    loadWishlist(); // refresh context
  };

  const isInWishlist = (slug) =>
    wishlist.some((item) => item.slug === slug);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
