// import React, { useState, useEffect, useRef } from "react";
// import { FaChevronLeft, FaChevronRight, FaBaby } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import {
//   GiGiftOfKnowledge,
//   GiClothes,
//   GiTechnoHeart,
//   GiHomeGarage,
//   GiFruitBowl,
// } from "react-icons/gi";

// const slides = [
//   {
//     id: 1,
//     heading: "Send Gifts to Loved Ones in Your City within Minutes",
//     sub: "A Surprise Gift",
//     img: "https://images.unsplash.com/photo-1739022113824-6b86cf63c4cf?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     id: 2,
//     heading: "Make Someone Smile with a Surprise Delivery",
//     sub: "Fast & Reliable",
//     img: "https://images.unsplash.com/photo-1606787360230-2f8b1c3d4e5f?w=600&auto=format&fit=crop&q=60",
//   },
//   {
//     id: 3,
//     heading: "Celebrate Every Moment with the Perfect Gift",
//     sub: "Crafted with Love",
//     img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60",
//   },
// ];

// const categories = [
//   { title: "Personalized Gifts", icon: <GiGiftOfKnowledge /> },
//   { title: "Fashion & Accessories", icon: <GiClothes /> },
//   { title: "Electronics & Gadgets", icon: <GiTechnoHeart /> },
//   { title: "Home & Decor", icon: <GiHomeGarage /> },
//   { title: "Combo Baskets", icon: <GiFruitBowl /> },
//   { title: "Toys & Games", icon: <FaBaby /> },
// ];

// export default function Cards() {
//   const [current, setCurrent] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const categoryRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);
//   const delay = 3000;

//   const prevSlide = () =>
//     setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
//   const nextSlide = () =>
//     setCurrent((prev) => (prev + 1) % slides.length);

//   useEffect(() => {
//     if (paused) return;
//     const interval = setInterval(nextSlide, delay);
//     return () => clearInterval(interval);
//   }, [current, paused]);

//   const scrollCategories = (dir) => {
//     const el = categoryRef.current;
//     if (el) {
//       el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
//     }
//   };

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX.current;
//     if (diff > 50) nextSlide();
//     else if (diff < -50) prevSlide();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center mt-[10rem] px-6 lg:px-0 lg:mt-[10rem] bg-white text-black">
//       {/* ── Hero Section ── */}
//       <div
//         className="relative w-full max-w-screen-xl overflow-hidden rounded-3xl shadow-lg my-4"
//         onMouseEnter={() => setPaused(true)}
//         onMouseLeave={() => setPaused(false)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-3xl">
//           {slides.map((slide, i) => (
//             <div
//               key={slide.id}
//               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                 i === current ? "opacity-100 z-10" : "opacity-0 z-0"
//               }`}
//               style={{
//                 backgroundImage: `url(${slide.img})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <div className="bg-black/40 w-full h-full flex items-center justify-start px-4 sm:px-10 rounded-3xl">
//                 <div className="max-w-md text-white space-y-2 sm:space-y-3 animate-slide-text">
//                   <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
//                     {slide.heading}
//                   </h2>
//                   <p className="text-sm sm:text-base">{slide.sub}</p>
//                   <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:px-6 rounded-full font-semibold text-sm sm:text-base">
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={prevSlide}
//           className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
//         >
//           <FaChevronRight />
//         </button>

//         <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
//           {slides.map((_, i) => (
//             <div
//               key={i}
//               className={`h-2 w-2 rounded-full transition ${
//                 i === current ? "bg-red-400 scale-110" : "bg-gray-300"
//               }`}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* ── Scrollable Category Bar ── */}
//       <div className="relative mt-6 w-full max-w-screen-xl">
//         <div className="flex items-center relative">
//           <button
//             onClick={() => scrollCategories("left")}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
//           >
//             <FaChevronLeft />
//           </button>

//           <div
//             ref={categoryRef}
//             className="flex overflow-x-auto gap-4 px-10 py-4 scroll-smooth scrollbar-hide w-full"
//           >
//             {categories.map((cat, index) => (
//               <Link
//                 to={
//                   cat.title === "Combo Baskets"
//                     ? "/store?category=Combos%20%26%20Baskets&shop=Combos"
//                     : `/store?category=${encodeURIComponent(cat.title)}`
//                 }
//                 key={index}
//                 className="flex flex-col items-center text-center min-w-[70px] sm:min-w-[90px] hover:scale-105 hover:text-purple-700 transition-transform"
//               >
//                 <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl sm:text-2xl shadow-md">
//                   {cat.icon}
//                 </div>
//                 <p className="mt-2 text-xs font-semibold whitespace-wrap">{cat.title}</p>
//               </Link>
//             ))}
//           </div>

//           <button
//             onClick={() => scrollCategories("right")}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaBaby } from "react-icons/fa";
import { GiGiftOfKnowledge, GiClothes, GiTechnoHeart, GiHomeGarage, GiFruitBowl } from "react-icons/gi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function CardsWrapper(props) {
  return (
    <ErrorBoundary>
      <Cards {...props} />
    </ErrorBoundary>
  );
}

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <div className="text-red-600 text-center p-4">Something went wrong while loading cards.</div>
  ) : (
    <ErrorCatcher onError={() => setHasError(true)}>{children}</ErrorCatcher>
  );
}

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCaught: false };
  }

  static getDerivedStateFromError() {
    return { hasCaught: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in Cards:", error, errorInfo);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasCaught) return null;
    return this.props.children;
  }
}

function Cards({
  title = "Combos & Baskets",
  data = [],
  selectedItem = null,
  renderItem,
  onSelect = () => {},
  itemKey = (item, index) => item?.slug || `shimmer-${index}`,
  viewMoreLink = "#",
  loading = false,
}) {
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleStorage = () => {
      const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(updated);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleWishlist = (slug, title) => {
    let updated = [...wishlist];
    const index = updated.indexOf(slug);

    if (index >= 0) {
      updated.splice(index, 1);
      toast.error(`Removed: ${title}`);
    } else {
      updated.push(slug);
      toast.success(`Added: ${title}`);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const scrollCategories = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = 280;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = touchStartX.current - endX;
      if (Math.abs(diffX) > 50) {
        scrollCategories(diffX > 0 ? "right" : "left");
      }
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const renderCard = (item, index) => {
    if (loading || !item) {
      return (
        <div className="animate-pulse p-3 space-y-3">
          <div className="w-full h-36 sm:h-44 bg-gray-300 rounded-lg" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      );
    }

    const titleToUse = item?.title || item?.name || "";
    const selectedTitle = selectedItem?.title || selectedItem?.name || "";
    const isActive = selectedTitle === titleToUse;
    const isLiked = wishlist.includes(item.slug);

    return (
      <Link
        to={item.slug ? `/product/${item.slug}` : "#"}
        className="relative group block p-3"
        onClick={() => onSelect(item)}
      >
        {item.image && (
          <img
            src={item.image || "/placeholder.png"}
            alt={item.title}
            className="w-full h-36 sm:h-44 object-cover rounded-lg"
          />
        )}

        <button
          className="absolute bottom-4 right-4 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(item.slug, titleToUse);
          }}
        >
          <FaHeart
            className={`text-sm transition ${isLiked ? "text-red-500" : "text-gray-500"}`}
          />
        </button>

        <div className="mt-3">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {titleToUse}
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
            Earliest Delivery: <span className="text-green-600 font-medium">{item.delivery}</span>
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h2>
        <a
          href={viewMoreLink}
          className="text-sm font-medium text-green-600 hover:underline"
        >
          View More
        </a>
      </div>

      <div className="relative">
        <button
          onClick={() => scrollCategories("left")}
          className="hidden sm:flex absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 py-4 px-2 sm:px-8 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {data.map((item, index) => {
            const titleToUse = item?.title || item?.name || "";
            const selectedTitle = selectedItem?.title || selectedItem?.name || "";
            const isActive = selectedTitle === titleToUse;

            return (
              <div
                key={itemKey(item, index)}
                className={`flex-shrink-0 w-52 sm:w-56 md:w-64 snap-start transition-transform duration-300 ${
                  isActive ? "scale-105 border-2 border-green-500 rounded-xl" : ""
                }`}
              >
                <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
                  {renderItem ? renderItem(item, index, isActive) : renderCard(item, index)}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollCategories("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Cards;
