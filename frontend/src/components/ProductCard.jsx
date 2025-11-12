import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const displayImage = product?.images?.[0] || '';
  const displayPrice = Number(product?.basePrice || product?.sizes?.[0]?.price || 0);
  
  const handleClick = () => {
    if (product?._id) navigate(`/product/${product._id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
    alert('Added to cart!');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group relative"
    >
      {/* Category Badge */}
      {product?.category && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md"
        >
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
            {product.category}
          </span>
        </motion.div>
      )}

      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center transition-colors duration-300"
      >
        <Heart
          className={`w-5 h-5 transition-all duration-300 ${
            isWishlisted
              ? 'fill-pink-500 text-pink-500'
              : 'text-gray-600 hover:text-pink-500'
          }`}
        />
      </motion.button>

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-3/4 bg-linear-to-br from-pink-50 to-amber-50">
        <motion.img
          src={displayImage}
          alt={product?.name || 'product'}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Gradient Overlay on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-0 right-0 flex gap-2 px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 px-4 py-3 bg-linear-to-r from-pink-500 to-amber-500 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-white text-gray-900 rounded-xl font-semibold shadow-lg flex items-center justify-center"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
          {product?.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product?.description}
        </p>

        {/* Rating (if available) */}
        {product?.rating && (
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Price and Size Info */}
        <div className="flex justify-between items-center">
          <div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-linear-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent"
            >
              ₹{displayPrice.toLocaleString()}
            </motion.span>
            {product?.sizes?.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {product.sizes.length} size{product.sizes.length > 1 ? 's' : ''} available
              </p>
            )}
          </div>

          {/* Quick Add Button (Desktop) */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-12 h-12 bg-linear-to-r from-pink-500 to-amber-500 text-white rounded-full shadow-lg flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-amber-500 origin-left"
      />
    </motion.div>
  );
};

export default ProductCard;