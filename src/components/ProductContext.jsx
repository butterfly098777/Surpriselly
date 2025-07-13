import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);

  const addProducts = (newItems = []) => {
    setAllProducts((prev) => {
      const merged = [...prev, ...newItems];
      const unique = Array.from(
        new Map(merged.map((item) => [item.slug || item.title, item])).values()
      );
      return unique;
    });
  };

  const getProductBySlug = (slug) =>
    allProducts.find((item) => item.slug === slug);

  return (
    <ProductContext.Provider value={{ allProducts, addProducts, getProductBySlug }}>
      {children}
    </ProductContext.Provider>
  );
}
