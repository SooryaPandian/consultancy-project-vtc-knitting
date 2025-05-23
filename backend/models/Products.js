const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: String, // Added to match frontend
  username: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

const variantSchema = new mongoose.Schema({
  colorName: String,
  colorCode: String,
  images: [String],
  sizes: [
    {
      size: String,
      price: Number,
      stock: Number,
    },
  ],
});

const productSchema = new mongoose.Schema({
  id: Number, // Added to match frontend
  name: String,
  category: String,
  type: String,
  description: String, // Added to match frontend
  basePrice: Number, // Added to match frontend
  price: Number, // Retained for compatibility
  image: String,
  rating: Number,
  discount: Number, // Added to match frontend
  offerEndsAt: Date, // Added to match frontend
  variants: [variantSchema], // Added to match frontend
  reviews: [reviewSchema],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
