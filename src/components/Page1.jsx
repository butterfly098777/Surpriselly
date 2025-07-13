import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaBaby } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiGiftOfKnowledge, GiClothes, GiTechnoHeart, GiHomeGarage, GiFruitBowl, GiFlowers, GiChocolateBar, GiPlantSeed } from "react-icons/gi";

const slides = [
  {
    id: 1,
    heading: "Send Gifts to Loved Ones in Your City within Minutes",
    sub: "A Surprise Gift",
    img: "https://images.unsplash.com/photo-1739022113824-6b86cf63c4cf?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    heading: "Make Someone Smile with a Surprise Delivery",
    sub: "Fast & Reliable",
    img: "https://images.unsplash.com/photo-1606787360230-2f8b1c3d4e5f?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    heading: "Celebrate Every Moment with the Perfect Gift",
    sub: "Crafted with Love",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60",
  },
];

const categories = [
  { title: "Personalized Gifts", icon: <GiGiftOfKnowledge /> },
  { title: "Fashion & Accessories", icon: <GiClothes /> },
  { title: "Electronics & Gadgets", icon: <GiTechnoHeart /> },
  { title: "Home & Decor", icon: <GiHomeGarage /> },
  { title: "Combo Baskets", icon: <GiFruitBowl /> },
  { title: "Toys & Games", icon: <FaBaby /> }, // replaced icon here
];


export default function Page1() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const categoryRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const delay = 3000;

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval);
  }, [current, paused]);

  const scrollCategories = (dir) => {
    const el = categoryRef.current;
    if (el) {
      el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[10rem] px-6 lg:px-0 lg:mt-[10rem] bg-white text-black">
      {/* ── Hero Section ── */}
      <div
        className="relative w-full max-w-screen-xl overflow-hidden rounded-3xl shadow-lg my-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-3xl">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage:` url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/40 w-full h-full flex items-center justify-start px-4 sm:px-10 rounded-3xl">
                <div className="max-w-md text-white space-y-2 sm:space-y-3 animate-slide-text">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
                    {slide.heading}
                  </h2>
                  <p className="text-sm sm:text-base">{slide.sub}</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:px-6 rounded-full font-semibold text-sm sm:text-base">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
        >
          <FaChevronRight />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition ${
                i === current ? "bg-red-400 scale-110" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* ── Scrollable Category Bar ── */}
      <div className="relative mt-6 w-full max-w-screen-xl">
        <div className="flex items-center relative">
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={categoryRef}
            className="flex overflow-x-auto gap-4 px-10 py-4 scroll-smooth scrollbar-hide w-full"
          >
            {categories.map((cat, index) => (
              <Link
                to={
                  cat.title === "Combo Baskets"
                    ? "/store?category=Combos%20%26%20Baskets&shop=Combos"
                    : `/store?category=${encodeURIComponent(cat.title)}`
                }
                key={index}
                className="flex flex-col items-center text-center min-w-[70px] sm:min-w-[90px] hover:scale-105 hover:text-purple-700 transition-transform"
              >
                <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl sm:text-2xl shadow-md">
                  {cat.icon}
                </div>
                <p className="mt-2 text-xs font-semibold whitespace-wrap">{cat.title}</p>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}