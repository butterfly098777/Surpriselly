import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaBell,
  FaHeart,
  FaSearch,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import { useProduct } from "../components/ProductContext";

const categoriesBottom = [
  "Personalized Gifts",
  "Electronics & Gadgets",
  "Fashion & Accessories",
  "Home & Decor",
  "Food & Beverages",
  "Toys & Games",
  "Wellness & Self‑Care",
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState({ isLoggedIn: false, name: "", avatar: "" });

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");
  const { allProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileMenuOpen]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setMobileMenuOpen(false),
    onSwipedRight: () => setMobileMenuOpen(true),
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ isLoggedIn: false, name: "", avatar: "" });
    navigate("/");
  };

  const handleCategoryClick = (cat) => {
    navigate(`/store?category=${encodeURIComponent(cat)}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
    {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Logo" className="h-14" />
        </a>

        <div className="hidden md:flex ml-[6rem] flex-1 mx-6">
          <div className="relative w-full max-w-md group">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 pr-12 py-2.5 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-2.5 hover:bg-purple-200 text-purple-600 p-1.5 rounded-full"
              title="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/store" className="text-purple-700 font-semibold hover:underline">
            Same Day Delivery <FaMotorcycle className="inline ml-1" />
          </NavLink>
          <div className="flex items-center gap-2 font-medium text-purple-700">
            <FaMapMarkerAlt className="text-red-600" />
            <span>Jhansi</span>
          </div>

          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-purple-700 hover:text-green-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 grid place-content-center">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </NavLink>

          <NavLink to="/wishlist" className="relative">
            <FaHeart className="text-2xl text-purple-700 hover:text-red-600" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 grid place-content-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          <button className="relative">
            <FaBell className="text-2xl text-purple-700 hover:scale-110 transition" />
            <span className="absolute -top-1 -right-2 h-4 w-4 text-[10px] bg-red-600 text-white rounded-full grid place-content-center">
              0
            </span>
          </button>

          <div className="relative group">
            <button className="text-2xl text-purple-700 hover:text-purple-900 transition">
              <FaUserCircle />
            </button>
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
              {user?.isLoggedIn ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    👋 Hello, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-purple-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                  >
                    Log In
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

      {/* </div> */}

 {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-purple-700 text-2xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

   {/* 🔍 Mobile Search Bar   ......... */}
      <div className="md:hidden mt-[-10px] px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full border pl-10 pr-12 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-2.5 hover:bg-purple-200 text-purple-600 p-1 rounded-full"
            title="Search"
          >
            <FaSearch />
          </button>
        </div>
      </div>

  {/* Desktop Category Strip */}
      <div className="bg-white text-black p-2 font-medium text-sm border-b hidden md:flex">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap gap-12">
          {categoriesBottom.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryClick(cat)}
              className={`cursor-pointer hover:text-purple-700 whitespace-nowrap ${
                currentCategory === cat.trim() ? "text-purple-700 font-semibold underline" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🔽 Mobile Dropdown  */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 bg-white shadow-xl ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <img src={logo} alt="Logo" className="h-10" />
          <button onClick={() => setMobileMenuOpen(false)}>
            <FaTimes className="text-2xl text-purple-700" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-col px-4 py-4 gap-2">
          {categoriesBottom.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`text-left py-2 px-3 rounded hover:bg-purple-100 ${
                currentCategory === cat.trim() ? "bg-purple-200 font-semibold" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 👤 Profile Section w/ Dynamic Avatar */}
        <div className="border-t mt-2 pt-4 px-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={
                user?.isLoggedIn && user?.avatar
                  ? user.avatar
                  : "https://api.dicebear.com/7.x/thumbs/svg?seed=guest"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-semibold text-sm text-gray-700">
                {user?.isLoggedIn ? `Welcome, ${user.name}` : "Welcome, Guest!"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.isLoggedIn ? "Manage your profile" : "Please login to continue"}
              </p>
            </div>
          </div>

          {user?.isLoggedIn ? (
            <button
              onClick={() => {
                setUser({ isLoggedIn: false, name: "", avatar: "" });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-purple-100"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-purple-100"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-purple-100"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
