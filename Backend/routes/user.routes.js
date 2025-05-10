import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/user.validators.js";

import { authUser } from "../middleware/auth.middleware.js";
import { authRefreshToken } from "../middleware/authRefresh.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/profile", authUser, getProfile);
router.get("/logout", authRefreshToken, logoutUser);

export default router;
