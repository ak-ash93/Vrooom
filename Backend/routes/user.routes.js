import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;
