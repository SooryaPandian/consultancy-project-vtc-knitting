const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Route for user registration
router.post("/signup", register);

// Route for user login
router.post("/login", login);

// Route for user logout (placeholder, if needed in the future)
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

// Route to change password (requires JWT and current password)
router.post("/change-password", verifyToken, changePassword);

// Route to get user info from token
router.get("/me", verifyToken, (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

module.exports = router;
