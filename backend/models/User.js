const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true }, // Removed enum
  zip: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{5,6}$/.test(v); // Validates 5 or 6 digit postal codes
      },
      message: (props) => `${props.value} is not a valid postal code!`,
    },
  },
  country: { type: String, required: true }, // Removed enum
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true },
  addresses: [addressSchema], // Allow multiple addresses
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ email: 1 });
userSchema.index({ "addresses.zip": 1 });



const User = mongoose.model("User", userSchema);
module.exports = User;
