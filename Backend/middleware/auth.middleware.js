import jwt from "jsonwebtoken";
import userModel from "../Models/user.model.js";

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Acces token expired or Invalid" });
  }
};
