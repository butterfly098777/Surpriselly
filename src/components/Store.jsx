import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import toast, { Toaster } from "react-hot-toast";

export default function Store() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // ✅ Fetch real-time products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products");
      });
  }, []);

  useEffect(() => {
    const section = document.getElementById("store-section");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = products
    .filter((item) =>
      selectedCategory === "All"
        ? true
        : item?.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
    .filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => item?.price <= maxPrice);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div id="store-section" className="p-6 max-w-6xl mt-[12rem] mx-auto space-y-10">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center">🛍️ Product Store</h1>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={clsx(
              "px-4 py-1 rounded-full border text-sm transition-all",
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-white border-purple-300 text-purple-700 hover:bg-purple-100"
            )}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div>
          <label className="font-semibold block">Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="0"
            max="20000"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.length === 0 ? (
          <p className="col-span-full text-center">No matching products.</p>
        ) : (
          paginatedProducts.map((item, index) => {
            const wished = isInWishlist(item.slug);
            return (
              <div
                key={index}
                className="group border rounded-lg shadow p-4 bg-white hover:shadow-lg transition-all duration-300 relative"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image || ""}`
                  }
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-purple-700 font-bold">₹{item.price}</p>

                <button
                  onClick={() => {
                    toggleWishlist(item);
                    const newWished = !wished;
                    toast.success(
                      `${newWished ? "Added to" : "Removed from"} Wishlist: ${item.name}`
                    );
                  }}
                  className={`absolute top-3 right-3 text-2xl transition-transform duration-300 ${
                    wished
                      ? "text-red-500 scale-110"
                      : "text-gray-400 group-hover:scale-110"
                  }`}
                >
                  {wished ? "❤️" : "🤍"}
                </button>

                <button
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 rounded transition"
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to cart!`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

