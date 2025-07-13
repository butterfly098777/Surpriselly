// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "./components/ShopContext";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { ProductProvider } from "./components/ProductContext";
import { AuthProvider } from "./components/AuthContext"; // ✅ IMPORT
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ WRAP HERE FIRST */}
        <ShopProvider>
          <CartProvider>
            <WishlistProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </WishlistProvider>
          </CartProvider>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
