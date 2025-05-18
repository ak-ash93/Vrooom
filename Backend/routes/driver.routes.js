import express from "express";
import {
  driverRegistrationValidation,
  driverLoginValidation,
} from "../validators/driver.validator.js";
import { registerDriver } from "../controllers/driver.controller.js";

const router = express.Router();

router.post("/register", driverRegistrationValidation, registerDriver);

export default router;
