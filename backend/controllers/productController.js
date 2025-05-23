const Product = require("../models/Products");

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Fetch a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Add a new product (Admin functionality)
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update an existing product by ID (Admin functionality)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProduct = await Product.findOneAndUpdate({ id }, updatedData, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product by ID (Admin functionality)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Add a review and update average rating
const addProductReview = async (req, res) => {
  console.log("Adding review...");
  try {
    const { id } = req.params; // product id
    const { rating, comment } = req.body;
    const username = req.user.name; // Assuming you have user info in req.user
    // Find product
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create review object
    const review = {
      id: Math.random().toString(36).substr(2, 9), // simple random id
      username,
      rating,
      comment,
      date: new Date(),
    };

    // Add review
    product.reviews.push(review);

    // Update average rating
    const ratings = product.reviews.map((r) => r.rating);
    product.rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
      rating: product.rating,
      reviews: product.reviews,
    });
  } catch (error) {
    // console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Export the controller functions
module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductReview, // export the new controller
};
