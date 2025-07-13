import React from "react";

const quirkyItems = [
  {
    title: "Birthday Gifts",
    image: "https://i.imgur.com/1.png", // replace with real
    bg: "bg-pink-50",
  },
  {
    title: "For Friends",
    image: "https://i.imgur.com/2.png",
    bg: "bg-orange-50",
  },
  {
    title: "Pop Culture",
    image: "https://i.imgur.com/3.png",
    bg: "bg-yellow-50",
  },
  {
    title: "Hatke Gifts",
    image: "https://i.imgur.com/4.png",
    bg: "bg-yellow-100",
  },
];

export default function QuirkyCelebrations() {
  return (
    <section className="px-4 sm:px-6 md:px-8 bg-purple-50 py-10 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Quirky Celebrations
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {quirkyItems.map((item, i) => (
          <div
            key={i}
            className={`
              ${item.bg}
              rounded-2xl overflow-hidden shadow-sm transition-transform hover:scale-105
              flex flex-col items-center justify-between
              ${i === quirkyItems.length - 1 ? "md:col-span-2" : ""}
            `}
          >
            <div className="p-4 w-full flex justify-center items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 sm:w-28 md:w-32 h-40 sm:h-44 md:h-48 object-contain"
              />
            </div>
            <div className="text-center pb-4 text-sm font-medium">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
