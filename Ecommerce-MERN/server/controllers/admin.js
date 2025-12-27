const Admin = require("../models/admin");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken");

// Admin registration
exports.signup = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const { name, email, password, adminCode } = req.body;

    // Validate admin code (temporarily disabled for testing)
    // if (adminCode !== (process.env.ADMIN_CODE || "ADMIN2024")) {
    //   return res.status(400).json({
    //     error: "Invalid admin authorization code",
    //   });
    // }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        error: "Admin with this email already exists",
      });
    }

    // Create new admin
    const admin = new Admin({
      name,
      email,
      password,
    });

    await admin.save();

    // Generate token
    const token = admin.generateAuthToken();

    res.status(201).json({
      message: "Admin account created successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({
      error: errorHandler(error) || "Failed to create admin account",
    });
  }
};

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate token
    const token = admin.generateAuthToken();

    res.json({
      message: "Login successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({
      error: errorHandler(error) || "Login failed",
    });
  }
};

// Get current admin profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    res.json(admin);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(400).json({
      error: errorHandler(error) || "Failed to get profile",
    });
  }
};

// Update admin profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const adminId = req.admin._id;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.admin.email) {
      const existingAdmin = await Admin.findOne({ email, _id: { $ne: adminId } });
      if (existingAdmin) {
        return res.status(400).json({
          error: "Email is already taken",
        });
      }
    }

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(400).json({
      error: errorHandler(error) || "Failed to update profile",
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin._id;

    // Get admin with password
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    // Check current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        error: "Current password is incorrect",
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(400).json({
      error: errorHandler(error) || "Failed to change password",
    });
  }
};

// Logout (client-side token removal, but we can track if needed)
exports.logout = async (req, res) => {
  try {
    // In a real implementation, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(400).json({
      error: errorHandler(error) || "Logout failed",
    });
  }
};
