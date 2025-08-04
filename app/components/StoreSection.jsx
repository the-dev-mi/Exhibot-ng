"use client";

import React from "react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Exhibot Classic Tee",
    category: "Apparel",
    image: "/images/001.jpg",
    description: "Wear the badge of innovation – perfect for your robotics quests.",
  },
  {
    name: "Core Dad Hat",
    category: "Headwear",
    image: "/images/002.jpg",
    description: "Shade your vision while building Nigeria's tech future.",
  },
  {
    name: "NFC Wrist band",
    category: "Apparel",
    image: "/images/003.jpg",
    description: "Customizable NFC Wristband",
  },
];

const StoreSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full h-full bg-white py-12 sm:py-16 px-4 sm:px-6 text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-[#F97216] mb-6 sm:mb-8" style={{ fontFamily: 'Exima Geometric' }}>Gear Up for the Adventure </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto">
        Tees, hats, and hoodies for builders and believers. Equip yourself for the robotics revolution – coming soon.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
        {products.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-gray-50 rounded-xl shadow-md p-4 sm:p-6 w-full sm:w-[260px] flex flex-col items-center border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 sm:w-32 h-24 sm:h-32 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-blue-600 mb-2">{item.category}</p>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <button
              disabled
              className="bg-gray-300 text-gray-600 font-semibold px-4 sm:px-6 py-2 rounded cursor-not-allowed"
            >
              Coming Soon
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StoreSection;