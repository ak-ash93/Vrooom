import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { registerValidation } from "../validators/user.validators.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);

export default router;
