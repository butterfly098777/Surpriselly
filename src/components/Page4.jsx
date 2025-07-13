import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { useWishlist } from "./WishlistContext";

export default function Page4() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const shimmerArray = new Array(4).fill(null);

  const { addProducts } = useProduct();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch("https://surpriselly.onrender.com/api/products?category=Toys%20%26%20Games")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          slug: item.slug || item._id,
          amount: item.amount ?? item.price,
          category: item.category || "Toys & Games",
          shop: item.shop || "Kids",
        }));
        setItems(normalized);
        setLoading(false);
        addProducts(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch Toys & Games products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page4-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page4", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page4", scrollToSelf);
  }, []);

  const handleWishlistToggle = (e, item) => {
    e.preventDefault();
    toggleWishlist(item);
    toast.success(
      `${isInWishlist(item.slug) ? "Removed from" : "Added to"} Wishlist: ${item.title || item.name}`
    );
  };

  return (
    <div
      id="page4-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-4 sm:px-6 lg:px-8 min-h-auto"
    >
      <Cards
        title="Toys & Games"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Toys%20%26%20Games"
        itemKey={(item, i) => `page4-${item?.slug || `shimmer-${i}`}`}
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
        : `https://surpriselly.onrender.com${item.image}`
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
                onClick={(e) => handleWishlistToggle(e, item)}
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
                {item.brand && (
                  <p className="text-xs text-gray-500 mt-1">Brand: {item.brand}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Delivery:{" "}
                  <span className="text-green-600 font-medium">
                    {"Tomorrow"}
                  </span>
                </p>
              </div>
            </Link>
          )
        }
      />
    </div>
  );
}
