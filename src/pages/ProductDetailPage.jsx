import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "../components/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://surpriselly.onrender.com/api/products/slug/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleCheckout = () => {
    window.location.href = "https://razorpay.me/@socialoffer";
  };

  if (loading) {
    return (
      <p className="text-center mt-32 text-sm text-gray-500 animate-pulse">
        Fetching latest product info...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-32 text-gray-500">Product not found.</p>
    );
  }
    console.log("Product image path:", product.image);
    
  return (
    <div className="max-w-6xl mt-[8rem] mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {product.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-lg">
        {/* Left Section */}
        <div className="space-y-4">
          <img
            src={`https://surpriselly.onrender.com/${product.image}`}
            alt={product.name}
            className="w-full h-[22rem] object-cover rounded-xl shadow"
          />  
        </div>
  
        {/* Right Section */}
        <div className="space-y-6">
          <p className="text-3xl font-bold text-green-700">₹ {product.price}</p>

          {product.brand && (
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          )}
          {product.category && (
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          )}

        {product.Description ? (
  <p className="text-gray-600">
    <span className="font-semibold">Description:</span> {product.Description}
  </p>
) : (
  <p className="text-gray-600">No description available.</p>
)}


          <div className="w-full">
            <input
              type="text"
              placeholder="Any special message for loved ones?"
              className="w-full p-4 border-2 border-purple-300 rounded-3xl shadow-md 
                         focus:outline-none focus:border-purple-500 
                         transition-all duration-300 ease-in-out"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-all text-white rounded-full shadow-md"
          >
            Add to Cart
          </button>
          <button
            onClick={handleCheckout}
            className="px-6 py-3 mx-5 bg-green-500 hover:bg-green-700 transition-all text-white rounded-full shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
