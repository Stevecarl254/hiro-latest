// pages/api/users/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "../../../models/User.js"; // relative path to JS model
import sequelize from "../../../config/database.js"; // relative path to DB config

type Data = {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Make sure DB tables exist
    await sequelize.sync();

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    // Return user data
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}