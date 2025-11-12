import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&h=900&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/30 to-black/50" />

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
        >
          Discover Your Signature Scent
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-8 font-light"
        >
          Explore our exclusive collection of premium perfumes
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToProducts}
          className="px-10 py-4 bg-gradient-to-r from-pink-400 to-amber-300 text-white rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/50 transition-all"
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
