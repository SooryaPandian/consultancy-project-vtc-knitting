const express = require("express");
const {
  register,
  login,
  changePassword,
  adminLogin, // add this
} = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

// Route for user registration
router.post("/signup", register);

// Route for user login
router.post("/login", login);

// Route for admin login
router.post("/admin-login", adminLogin);

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

// Route to get admin info from token
router.get("/admin/me", verifyAdmin, (req, res) => {
  // Only is_admin is guaranteed for admin JWT
  const { email, is_admin } = req.user;
  res.json({ email, is_admin });
});

module.exports = router;
