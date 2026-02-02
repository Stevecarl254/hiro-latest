// pages/api/users/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User.js"; // relative path to JS model
import sequelize from "../../../config/database.js"; // relative path to DB config

type Data = {
  message: string;
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

  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Ensure tables exist
    await sequelize.sync();

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,      // Will be hashed automatically via hook
      phoneNumber,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}