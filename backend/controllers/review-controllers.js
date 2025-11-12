const review = require("../models/review");

const getreviewsByProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await review.find({ product: id }).sort({ createdAt: -1 });
    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this product",
      });
    }
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const id = req.params.id;
    const newReview = new review({
      product: id,
      name,
      rating,
      comment,
    });
    await newReview.save();
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
    });
  }
};

module.exports = {getreviewsByProduct,addReview};