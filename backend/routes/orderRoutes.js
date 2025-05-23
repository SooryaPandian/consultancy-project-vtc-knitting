const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser, // import new controller
} = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public routes
router.post("/", verifyToken, createOrder); // Create a new order

// Place this route BEFORE any route with "/:id"
router.get("/user", verifyToken, getOrdersByUser); // Get all orders for the logged-in user (no email param)

router.get("/:id", verifyToken, getOrderById); // Get order by ID

// Admin routes
router.get("/", verifyToken, verifyAdmin, getAllOrders); // Get all orders
router.put("/:id", verifyToken, verifyAdmin, updateOrderStatus); // Update order status
router.delete("/:id", verifyToken, verifyAdmin, deleteOrder); // Delete an order

module.exports = router;
