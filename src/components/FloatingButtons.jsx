import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // 🛒 use FaShoppingCart

export default function FloatingButtons() {
  const { pathname } = useLocation();

  // Hide buttons on login/signup routes
  const hideOnRoutes = ["/login", "/signup"];
  if (hideOnRoutes.includes(pathname)) return null;

  return (
    <>
      {/* Floating Wishlist Icon (Bottom-Left) */}
      <Link
        to="/wishlist"
        className="md:hidden fixed bottom-6 left-5 z-50 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition duration-300"
      >
        <FaHeart size={20} />
      </Link>

      {/* Floating Cart Icon (Bottom-Right) - replaced Shop */}
      <Link
        to="/cart"
        className="md:hidden fixed bottom-6 right-5 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition duration-300"
      >
        <FaShoppingCart size={20} />
      </Link>
    </>
  );
}
