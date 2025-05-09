import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/user.validators.js";
import { get } from "mongoose";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/profile", authUser, getProfile);

export default router;
