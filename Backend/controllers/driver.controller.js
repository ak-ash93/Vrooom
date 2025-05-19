import driverModel from "../models/driver.model.js";
import { createDriver } from "../services/driver.service.js";
import { generateToken } from "../utils/generateToken.utils.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerDriver = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password, phone, vehicle } = req.body;

  const existingDriver = await driverModel.findOne({ email });
  if (existingDriver) {
    return res.status(400).json({ message: "Profile already exists" });
  }
  try {
    const hashedPassword = await hashPassword(password);

    const driver = await createDriver({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      phone,
      color: vehicle.color,
      registration: vehicle.registration,
      vehicleCapacity: vehicle.vehicleCapacity,
      vehicleType: vehicle.vehicleType,
    });
    const { accessToken, refreshToken } = generateToken(driver._id);
    return res.status(201).json({
      driver,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginDriver = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, password } = req.body;
  try {
    const driver = await driverModel.findOne({ email }).select("+password");
    if (!driver) {
      return res.status(401).json({ message: "Credentials don't match" });
    }

    const isPasswordValid = await comparePassword(password, driver.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credentials don't match" });
    }

    const { accessToken, refreshToken } = generateToken(driver._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({
      driver: {
        id: driver._id,
        email: driver.email,
        fullname: driver.fullname,
        phone: driver.phone,
        vehicle: {
          color: driver.vehicle.color,
          registration: driver.vehicle.registration,
          vehicleCapacity: driver.vehicle.vehicleCapacity,
          vehicleType: driver.vehicle.vehicleType,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server Error.Please try again later." });
  }
};

export const getDriverProfile = async (req, res) => {
  res.status(200).json(req.driver);
};

export const logoutDriver = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const driver = await driverModel.findById(decoded._id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    await blacklistTokenModel.create({
      token: refreshToken,
      userId: driver._id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
