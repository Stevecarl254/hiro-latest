import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role?.toLowerCase() === "admin" ? "admin" : "user",
    });

    // Generate token immediately
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const role = user.role?.toLowerCase() || "user";

    const token = generateToken(user.id, role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= GET PROFILE ================= */
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
        address: req.user.address || "",
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= UPDATE PROFILE & PASSWORD ================= */
export const updateCurrentUser = async (req, res) => {
  try {
    const { name, phoneNumber, address, currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let updated = false;

    // Update basic fields
    if (name && name !== user.name) {
      user.name = name;
      updated = true;
    }
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      user.phoneNumber = phoneNumber;
      updated = true;
    }
    if (address && address !== user.address) {
      user.address = address;
      updated = true;
    }

    // Update password
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Both current and new passwords are required to change password.",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Current password is incorrect." });

      if (newPassword.length < 8)
        return res.status(400).json({
          message: "New password must be at least 8 characters.",
        });

      const isSameAsCurrent = await bcrypt.compare(newPassword, user.password);
      if (isSameAsCurrent)
        return res.status(400).json({
          message: "New password cannot be the same as current password.",
        });

      // Hash new password
      user.password = await bcrypt.hash(newPassword, 10);
      updated = true;
    }

    if (!updated) {
      return res.status(200).json({ message: "No changes detected." });
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address || "",
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

/* ================= LOGOUT ================= */
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};