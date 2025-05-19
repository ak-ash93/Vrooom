import express from "express";
import {
  driverRegistrationValidation,
  driverLoginValidation,
} from "../validators/driver.validator.js";
import {
  getDriverProfile,
  loginDriver,
  logoutDriver,
  registerDriver,
} from "../controllers/driver.controller.js";
import { authDriver } from "../middleware/auth.middleware.js";
import { authDriverRefreshToken } from "../middleware/authRefresh.middleware.js";

const router = express.Router();

router.post("/register", driverRegistrationValidation, registerDriver);
router.post("/login", driverLoginValidation, loginDriver);
router.get("/profile", authDriver, getDriverProfile);
router.get("/logout", authDriverRefreshToken, logoutDriver);

export default router;
