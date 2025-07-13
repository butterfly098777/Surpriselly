import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../components/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { addToCart } = useCart();

  const WISHLIST_KEYS = [
    "wishlist",
    "wishlist-page2",
    "wishlist-page3",
    "wishlist-categories",
    "wishlist-page4",
    "wishlist-page5",
    "wishlist-page6",
    "wishlist-page7",
    "wishlist-page8",
  ];

  const loadWishlist = () => {
    const combined = WISHLIST_KEYS.flatMap((key) => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    });

    const unique = Array.from(
      new Map(combined.map((item) => [item.slug || item.title, item])).entries()
    ).map(([_, item]) => item);

    setWishlist(unique);
  };

  useEffect(() => {
    loadWishlist();
    const sync = () => loadWishlist();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const removeFromWishlist = (slugOrTitle) => {
    WISHLIST_KEYS.forEach((key) => {
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      const updated = stored.filter(
        (item) => item.slug !== slugOrTitle && item.title !== slugOrTitle
      );
      localStorage.setItem(key, JSON.stringify(updated));
    });
    loadWishlist();
    toast.success("Removed from wishlist.");
    window.dispatchEvent(new Event("storage"));
  };

  const clearWishlist = () => {
    WISHLIST_KEYS.forEach((key) => localStorage.removeItem(key));
    setWishlist([]);
    toast.success("Wishlist cleared.");
    window.dispatchEvent(new Event("storage"));
    setShowConfirmModal(false);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.title} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-[5rem] lg:mt-[10rem] py-10 px-4 relative">
      <Toaster position="top-right" />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center animate-scale-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to clear your wishlist?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={clearWishlist}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add animation class styles */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Wishlist ❤️</h1>
        {wishlist.length > 0 && (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No items in wishlist 💔</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item, i) => (
            <div
              key={item.slug || item.title || i}
              className="bg-white rounded-lg shadow p-4 transition hover:shadow-lg relative flex flex-col justify-between"
            >
              <button
                onClick={() => removeFromWishlist(item.slug || item.title)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                title="Remove from Wishlist"
              >
                <FaHeart />
              </button>

              <img
                src={item.image || item.img || "/placeholder.png"}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />

              <div className="mt-2 flex flex-col gap-1">
                <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h2>

                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-semibold">
                    ₹ {item.price || item.amount}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ₹ {item.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Delivery:{" "}
                  <span className="text-green-600 font-medium">
                    {item.delivery || "N/A"}
                  </span>
                </p>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-2 w-full flex items-center justify-center gap-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 rounded transition"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
