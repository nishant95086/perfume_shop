import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Share2, Heart, ChevronLeft } from "lucide-react";
import { useProductContext } from "../context/ProductContext";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, fetchSingleProduct, reviews, addReview, loading } =
    useProductContext();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (id) fetchSingleProduct(id);
  }, [id]);

  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(null);
    setReviewText("");
    setUserName("");
    setRating(0);
  }, [selectedProduct?._id]);

  if (loading || !selectedProduct?.singleProduct) {
    return (
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
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading product details...
        </motion.p>
      </div>
    );
  }

  const product = selectedProduct.singleProduct;
  const allReviews = reviews?.reviews || [];

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("✅ Product link copied to clipboard!");
      }
    } catch {
      alert("❌ Share failed. Please try again.");
    }
  };

  const handleAddReview = async () => {
    if (userName.trim() && reviewText.trim() && rating > 0) {
      try {
        await addReview(
          product._id,
          userName.trim(),
          reviewText.trim(),
          rating
        );
        setUserName("");
        setReviewText("");
        setRating(0);
        navigate(0);
      } catch {
        alert("Failed to add review. Try again later.");
      }
    } else {
      alert("Please provide your name, review, and rating.");
    }
  };

  const activePrice = Number(
    selectedSize?.price ||
      product?.basePrice ||
      (product?.sizes && product.sizes[0]?.price) ||
      0
  );

  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          allReviews.length
        ).toFixed(1)
      : "N/A";

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => allReviews.filter((r) => r.rating === star).length
  );
  const totalRatings = ratingCounts.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-amber-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-700 hover:text-pink-500 mb-8 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </motion.button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images?.[selectedImage] || ""}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-3/4 rounded-3xl object-cover shadow-2xl"
                />
              </AnimatePresence>
              <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
              {product.images?.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative shrink-0 w-20 aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === i
                      ? "ring-4 ring-pink-400 shadow-lg"
                      : "ring-2 ring-transparent hover:ring-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                  {selectedImage === i && (
                    <div className="absolute inset-0 bg-pink-400/20" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl"
          >
            {/* Category Badge */}
            {product.category && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-100 to-amber-100 border border-pink-200 rounded-full mb-4"
              >
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                  {product.category}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-serif font-bold mb-4 bg-linear-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent"
            >
              {product.name}
            </motion.h1>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <Star className="text-amber-400 fill-amber-400 w-6 h-6" />
              <span className="font-bold text-2xl text-gray-800">
                {averageRating}
              </span>
              {allReviews.length > 0 && (
                <span className="text-gray-600 text-base">
                  ({allReviews.length}{" "}
                  {allReviews.length === 1 ? "review" : "reviews"})
                </span>
              )}
            </div>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Select Size
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((s) => (
                    <motion.button
                      key={s._id}
                      onClick={() => setSelectedSize(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize?._id === s._id
                          ? "bg-linear-to-r from-pink-500 to-amber-500 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-200 hover:border-pink-400 text-gray-700"
                      }`}
                    >
                      {s.size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold mb-8 text-gray-900"
            >
              ₹ {activePrice.toLocaleString()}
            </motion.h2>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-8 py-4 bg-linear-to-r from-pink-500 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300"
              >
                Buy Now
              </motion.button>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all duration-300 font-medium"
              >
                <Heart className="w-5 h-5" /> Wishlist
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all duration-300 font-medium"
              >
                <Share2 className="w-5 h-5" /> Share
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ⭐ Ratings & Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-gray-100"
        >
          <h3 className="text-4xl font-bold mb-8 bg-linear-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">
            Ratings & Reviews
          </h3>

          {/* Summary */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-8 bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl shadow-md border border-amber-200"
            >
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {averageRating} ★
              </div>
              <div className="text-gray-600 font-medium">
                {allReviews.length}{" "}
                {allReviews.length === 1 ? "Review" : "Reviews"}
              </div>
            </motion.div>

            {/* Rating Bars */}
            <div className="w-full md:w-1/2">
              {ratingCounts.map((count, i) => {
                const percentage = totalRatings
                  ? (count / totalRatings) * 100
                  : 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <span className="w-10 text-sm font-semibold text-gray-700">
                      {5 - i}★
                    </span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full bg-linear-to-r from-amber-400 to-orange-400 rounded-full"
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600 font-medium">
                      {count}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <hr className="my-8 border-gray-200" />
          {console.log(allReviews)}
          {/* Reviews List */}
          {allReviews.length > 0 ? (
            <ul className="space-y-6">
              {allReviews.map((r, index) => (
                <motion.li
                  key={r._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-200 pb-6 last:border-none hover:bg-pink-50/50 p-4 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < r.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-green-600 text-lg">
                      {r.rating}.0
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 bg-linear-to-br from-pink-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    {r.name}
                  </p>
                  <p className="text-gray-800 leading-relaxed mb-3 text-base">
                    {r.comment}
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-4 text-center py-8 text-lg">
              No reviews yet. Be the first to review this product! ✨
            </p>
          )}

          {/* Add Review Box */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 border-t border-gray-200 pt-8 bg-linear-to-br from-pink-50 to-amber-50 p-8 rounded-2xl"
          >
            <h4 className="text-2xl font-bold mb-6 text-gray-800">
              Write a Review
            </h4>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-gray-700 font-semibold">Your Rating:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      className={`w-7 h-7 cursor-pointer transition-all duration-200 ${
                        i < rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 hover:text-amber-400"
                      }`}
                      onClick={() => setRating(i + 1)}
                    />
                  </motion.div>
                ))}
              </div>
              {rating > 0 && (
                <span className="text-sm text-gray-600 ml-2">
                  ({rating} star{rating !== 1 ? "s" : ""})
                </span>
              )}
            </div>

            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-2 border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 p-4 rounded-xl w-full mb-4 transition-all duration-300 outline-none"
            />
            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="border-2 border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 p-4 rounded-xl w-full mb-4 transition-all duration-300 outline-none resize-none"
              rows="4"
            />
            <motion.button
              onClick={handleAddReview}
              disabled={!userName.trim() || !reviewText.trim() || rating === 0}
              whileHover={
                userName.trim() && reviewText.trim() && rating > 0
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                userName.trim() && reviewText.trim() && rating > 0
                  ? { scale: 0.98 }
                  : {}
              }
              className={`px-8 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 ${
                userName.trim() && reviewText.trim() && rating > 0
                  ? "bg-linear-to-r from-pink-500 to-amber-500 hover:shadow-xl"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Review
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
