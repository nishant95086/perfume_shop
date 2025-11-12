const product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

const getsingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await product.findById(id);
    if (!singleProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      singleProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};

module.exports = { getAllProducts, getsingleProduct };
