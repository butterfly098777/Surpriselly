// src/pages/OccasionShop.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProduct } from "../components/ProductContext";
import Cards from "../components/Cards";

export default function OccasionShop() {
  const { name } = useParams(); // e.g., 'birthday'
  const { allProducts } = useProduct();
  const location = useLocation();

  const sub = new URLSearchParams(location.search).get("sub");

  const readableName = name
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const products = allProducts.filter(
    (item) =>
      item.category === "Occasions" &&
      item.shop.toLowerCase() === readableName.toLowerCase() &&
      (!sub || item.subcategory === sub)
  );

  return (
    <div className="max-w-6xl mt-32 mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🎁 {readableName} Gifts
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <Cards items={products} />
      )}
    </div>
  );
}
