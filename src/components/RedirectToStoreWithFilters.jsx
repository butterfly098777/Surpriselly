import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "./ProductContext";

export default function RedirectToStoreWithFilters() {
  const { slug } = useParams();
  const { getProductBySlug } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const product = getProductBySlug(slug);

    if (product) {
      const category = encodeURIComponent(product.category);
      const shop = encodeURIComponent(product.shop || "");
      navigate(`/store?category=${category}${shop ? `&shop=${shop}` : ""}`, { replace: true });
    } else {
      navigate("/store", { replace: true });
    }
  }, [slug, getProductBySlug, navigate]);

  return null; // no UI needed
}
