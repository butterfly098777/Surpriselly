import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

export default function Page3() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist-page3")) || [];
  });

  const { addProducts } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products?category=Tech%20%26%20Products"
        );
        const data = await res.json();
        const withAmount = data.map((item) => ({
          ...item,
          amount: item.amount ?? item.price,
        }));
        setItems(withAmount);
        setLoading(false);
        addProducts(withAmount);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("wishlist-page3");
      setWishlist(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const isInWishlist = (slug) => wishlist.some((item) => item.slug === slug);

  const toggleWishlist = (item) => {
    const exists = isInWishlist(item.slug);
    const updated = exists
      ? wishlist.filter((i) => i.slug !== item.slug)
      : [...wishlist, item];

    setWishlist(updated);
    localStorage.setItem("wishlist-page3", JSON.stringify(updated));
    toast.success(
      `${exists ? "Removed from" : "Added to"} Wishlist: ${item.title || item.name}`
    );
    window.dispatchEvent(new Event("storage"));
  };

  const shimmerArray = new Array(4).fill(null);

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page3-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page3", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page3", scrollToSelf);
  }, []);

  return (
    <div
      id="page3-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-4 sm:px-6 lg:px-8 min-h-auto"
    >
      <Cards
        title="Tech & Products"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Electronics%20%26%20Gadgets"
        itemKey={(item, i) => `page3-${item?.slug || `shimmer-${i}`}`}
        renderItem={(item, _, isActive) =>
          !item ? (
            <div className="animate-pulse p-3 space-y-3 h-[300px] flex flex-col justify-between">
              <div className="w-full h-44 bg-gray-300 rounded-lg" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ) : (
            <Link
              to={`/product/${item.slug}`}
              className="relative group block p-3 h-[300px] flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition"
              onClick={() => setSelected(item)}
            >
             {item.image ? (
  <img
    src={
      item.image.startsWith("http")
        ? item.image
        : `http://localhost:5000${item.image}`
    }
    alt={item.title || item.name}
    className="w-full h-44 object-cover rounded-lg"
  />
) : (
  <div className="w-full h-44 bg-gray-100 text-center flex items-center justify-center rounded-lg text-sm text-gray-500">
    No Image
  </div>
)}

              <button
                className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item);
                }}
              >
                <FaHeart
                  className={`text-sm transition ${
                    isInWishlist(item.slug)
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title || item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-700 font-semibold text-base">
                    ₹ {item.price}
                  </span>
                  {item.originalPrice && (
                    <>
                      <span className="line-through text-sm text-gray-500">
                        ₹ {item.originalPrice}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {item.discount}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Delivery: Tomorrow<span className="text-green-600 font-medium">{"Tomorrow"}</span>
                </p>
              </div>
            </Link>
          )
        }
      />
    </div>
  );
}
