import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/generateToken.utils.js";
import userModel from "../Models/user.model.js";

export const registerUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullname, email, password } = req.body;
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
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const { accessToken, refreshToken } = generateToken(user._id);
    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {}
};
