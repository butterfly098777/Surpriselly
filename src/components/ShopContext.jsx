import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const [shop, setShop] = useState("All");

  return (
    <ShopContext.Provider value={{ shop, setShop }}>
      {children}
    </ShopContext.Provider>
  );
}
