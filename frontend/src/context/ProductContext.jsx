import React, { createContext, useContext, useState, useEffect } from "react";
import { allProduct, singleProduct } from "../api/products-api";
import { getReviews, addReview as addReviewAPI } from "../api/reviews-api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all products once
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data = await allProduct();
      const productArray = data?.products || [];

      // Calculate average rating for each product
      const withRatings = await Promise.all(
        productArray.map(async (p) => {
          try {
            const revs = await getReviews(p._id);
            const avg =
              revs?.length > 0
                ? revs.reduce((sum, r) => sum + (r.rating || 0), 0) /
                  revs.length
                : 0;
            return { ...p, averageRating: Number(avg.toFixed(1)) };
          } catch {
            return { ...p, averageRating: 0 };
          }
        })
      );

      setProducts(withRatings);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch single product + reviews
  const fetchSingleProduct = async (id) => {
    setLoading(true);
    try {
      const prod = await singleProduct(id);
      setSelectedProduct(prod);
      const revs = await getReviews(id);
      setReviews(revs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new review
  const addReview = async (productId, name, comment, rating = 5) => {
    try {
      // Call your backend API
      const newReview = await addReviewAPI(productId, {
        name,
        comment,
        rating,
      });

      // Safely update state — ensure reviews is always an array
      setReviews((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev, newReview];
      });

      // Also update the selected product if it’s currently being viewed
      setSelectedProduct((prev) =>
        prev && prev._id === productId
          ? {
              ...prev,
              reviews: Array.isArray(prev.reviews)
                ? [...prev.reviews, newReview]
                : [newReview],
            }
          : prev
      );
    } catch (error) {
      console.error("Error adding review:", error);
      throw error; // So handleAddReview can catch it if needed
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        reviews,
        fetchSingleProduct,
        addReview,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
