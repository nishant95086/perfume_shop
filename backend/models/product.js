const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  size: String,
  price: Number,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  sizes: [SizeSchema],
  basePrice: Number,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
