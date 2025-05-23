const mongoose = require("mongoose");
const Product = require("./models/Products");
const products = require("../client/src/data/products").default; // Import products from products.js

mongoose.connect(
  "mongodb+srv://db1:3R9GVpigokkEdaNK@cluster0.q5rt5.mongodb.net/vtc",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedProducts = async () => {
  try {
    const inserted = await Product.insertMany(products);
    console.log("Products inserted:", inserted.length);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedProducts();
