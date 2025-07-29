"use client";

import React from "react";

const products = [
  {
    name: "Havitech Classic Tee",
    category: "Apparel",
    image: "/products/image.jpg",
  },
  {
    name: "Core Dad Hat",
    category: "Headwear",
    image: "/products/hat.jpeg",
  },
  {
    name: "Vision Hoodie",
    category: "Apparel",
    image: "/products/hoodie.png",
  },
];

const StoreSection = () => {
  return (
    <div className="w-full h-full bg-white py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-[#F97216] mb-8" style={{ fontFamily: 'Exima Geometric' }}>Exhibot Merch Store</h2>
      <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
        Tees, hats, and hoodies for builders and believers. Coming soon.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {products.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl shadow-md p-6 w-[260px] flex flex-col items-center border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-blue-600 mb-6">{item.category}</p>
            <button
              disabled
              className="bg-gray-300 text-gray-600 font-semibold px-6 py-2 rounded cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSection;
