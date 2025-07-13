import React, { useEffect, useState } from "react";
import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import { Link } from "react-router-dom"; // Only if you're using React Router

export default function Page5() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((res) => setTimeout(res, 500));
      setItems([
        {
          title: "Give Gifts to Your Loved Ones",
          subtitle: "A Surprise Gift",
          slug: "give-gifts-loved-ones",
          image: choco1,
          bg: "bg-[#dfe0bc]",
        },
        {
          title: "Give something what useful",
          subtitle: "",
          slug: "give-something-useful",
          image: choco2,
          bg: "bg-gradient-to-r from-[#b28efc] to-[#dcc6fc]",
        },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-purple-50 py-2 px-4 mt-24 mb-14 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`rounded-3xl p-16 flex flex-col justify-between ${item.bg}`}
          >
            <div className="flex flex-col justify-between h-full md:flex-row items-center gap-4">
              {/* Text Content */}
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {item.title}
                </h2>
                {item.subtitle && (
                  <p className="mt-2 text-sm text-gray-700">{item.subtitle}</p>
                )}
                <Link to={`/product/${item.slug}`}>
                  <button className="mt-6 bg-black text-white px-6 py-2 rounded-md font-semibold shadow hover:cursor-pointer hover:bg-gray-900 transition">
                    Buy Now
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-60 w-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
