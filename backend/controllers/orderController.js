const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      customer,
      email,
      date,
      amount,
      items,
      itemDetails,
      status,
      address,
      paymentMethod,
    } = req.body;

    // Generate order ID (e.g., ORD-XXXX)
    const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);

    // Adapt address to backend schema
    const backendAddress = {
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    };

    const newOrder = new Order({
      id: orderId,
      customer,
      email,
      date,
      amount,
      items,
      itemDetails,
      status,
      address: backendAddress,
      paymentMethod,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Get all orders for the logged-in user (by JWT)
const getOrdersByUser = async (req, res) => {
  console.log("REveived request for orders");
  try {
    const email = req.user.email;
    const orders = await Order.find({ email });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's orders", error });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { id },
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete an order (Admin only)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findOneAndDelete({ id });
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser,
};
