import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/generateToken.utils.js";
import userModel from "../Models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullname, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateToken(user._id);

    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Credentials don't match" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credentials don't match" });
    }
    const { accessToken, refreshToken } = generateToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({
      user: { id: user._id, email: user.email, fullname: user.fullname },
      accessToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server Error.Please try again later." });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "User" });
    }

    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    await blacklistTokenModel.create({
      token: refreshToken,
      userId: decoded._id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
