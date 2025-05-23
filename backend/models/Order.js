const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  selectedColor: { type: String }, // Optional: Color of the product
  selectedSize: { type: String }, // Optional: Size of the product
});

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Order ID
  customer: { type: String, required: true }, // Full name of the customer
  email: { type: String, required: true }, // Customer email
  date: { type: String, required: true }, // Order date
  amount: { type: Number, required: true }, // Total amount including shipping
  items: { type: Number, required: true }, // Total number of items
  itemDetails: [orderItemSchema], // Array of item details
  status: { type: String, default: "Pending" }, // Order status
  address: addressSchema,
  paymentMethod: { type: String, required: true }, // Payment method
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
