import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useProductContext } from "../context/ProductContext";

const ProductsSection = () => {
  const { products, loading, error } = useProductContext();

  return (
    <section
      id="collections"
      className="py-20 px-4 bg-linear-to-b from-[#fefcf8] to-pink-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-lg text-gray-600">
            Handpicked fragrances for every personality
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* Animated ring */}
            <motion.div
              className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />

            {/* Fading text */}
            <motion.p
              className="text-gray-600 mt-4 text-base font-medium"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading product details...
            </motion.p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products available.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
