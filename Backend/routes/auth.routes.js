import express from "express";
import { authUserToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/refreshToken", authUserToken);

export default router;
