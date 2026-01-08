const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} = require("../controllers/admin");

const { authenticate, requireAdmin } = require("../middleware/adminAuth");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);
router.post("/logout", authenticate, logout);

module.exports = router;
