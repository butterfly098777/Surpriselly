import React from "react";
import bannerImage from "../assets/react.svg"; // replace with actual image path

export default function EventBanner() {
  return (
    <div className="bg-[#e7e8ee] py-12 mt-[5rem] px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900">
            Shop for a<br />
            Cause: <span className="italic">Creativity with a Purpose</span>
          </h2>

          <button className="mt-6 px-6 py-2 bg-teal-200 text-black font-medium rounded-full hover:bg-teal-300 transition">
            REGISTER TO ATTEND
          </button>

          {/* Details */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-800">
            <div>
              <p className="uppercase text-xs text-gray-600">Save the Date</p>
              <p className="mt-1 font-medium">May 7, 2030</p>
            </div>
            <div>
              <p className="uppercase text-xs text-gray-600">Check-In Starts</p>
              <p className="mt-1 font-medium">9:00 AM</p>
            </div>
            <div>
              <p className="uppercase text-xs text-gray-600">Event Begins At</p>
              <p className="mt-1 font-medium">10:00 AM</p>
            </div>
            <div>
              <p className="uppercase text-xs text-gray-600">See You There</p>
              <p className="mt-1 font-medium">Common Grounds</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={bannerImage}
            alt="Event"
            className="w-full h-[20rem] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
