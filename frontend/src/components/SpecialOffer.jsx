import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
  "✨ Limited Edition Fragrances — Up to 30% Off This Week ✨",
  "🌸 Free Shipping on Orders Above ₹2999 🌸",
  "💫 Buy 1 Get 1 Half Price — This Weekend Only 💫",
  "🌿 New Arrivals: Fresh Citrus & Ocean Collection 🌿",
  "🔥 Flat 25% Off on Bestseller Oud Perfumes 🔥",
  "🎁 Complimentary Gift Wrap with Every Purchase 🎁",
  "💐 Sign Up & Get an Extra 10% Off Your First Order 💐",
];

const SpecialOffer = () => {
  const [index, setIndex] = useState(0);

  // Change offer every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Special Offers"
      className="relative py-4 bg-linear-to-r from-pink-500 via-purple-500 to-amber-400 overflow-hidden"
    >
      {/* Decorative overlay for shine */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Animated text fade-in/out */}
      <div className="flex justify-center items-center h-10 sm:h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={offers[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-center px-6 pb-5 text-base sm:text-lg md:text-xl font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-white via-yellow-100 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            {offers[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marquee underline effect (adds motion energy) */}
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-2 left-0 w-full whitespace-nowrap text-white/70 text-xs sm:text-sm font-medium opacity-70"
      >
        {offers.map((offer, i) => (
          <span key={i} className="mx-8">
            {offer}
          </span>
        ))}
      </motion.div>

      {/* Pause animation on hover */}
      <style>
        {`
          section:hover div[motion] {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default SpecialOffer;
