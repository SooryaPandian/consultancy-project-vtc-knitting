const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
} = require("../controllers/productController");
const router = express.Router();
const verifyAdmin = require("../middleware/adminMiddleware"); // Middleware to verify admin access
const verifyToken = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllProducts); // Fetch all products
router.get("/:id", getProductById); // Fetch product by ID

// Admin routes
router.post("/", verifyAdmin, addProduct); // Add a new product
router.put("/:id", verifyAdmin, updateProduct); // Update a product by ID
router.delete("/:id", verifyAdmin, deleteProduct); // Delete a product by ID

// Add review to a product (rating + comment)
router.post("/:id/review",verifyToken, addProductReview);

module.exports = router;
