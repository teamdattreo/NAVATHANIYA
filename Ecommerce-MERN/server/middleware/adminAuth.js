const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

// Middleware to authenticate admin
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const admin = await Admin.findById(decoded._id).select("-password");
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        error: "Invalid token or admin not found.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      error: "Invalid token.",
    });
  }
};

// Middleware to check if user is admin
exports.requireAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admin privileges required.",
    });
  }
  next();
};

// Middleware to check if user is superadmin
exports.requireSuperAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== "superadmin") {
    return res.status(403).json({
      error: "Access denied. Super admin privileges required.",
    });
  }
  next();
};
