import userModel from "../Models/user.model.js";
import { generateToken } from "../utils/generateToken.utils.js";
import jwt from "jsonwebtoken";

export const authUserToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
