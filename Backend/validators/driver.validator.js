import { body } from "express-validator";

export const driverRegistrationValidation = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("Invalid first name"),
  body("fullname.lastname")
    .isLength({ min: 3 })
    .withMessage("Invalid last name"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("vehicle.registration")
    .isLength({ min: 2 })
    .withMessage("Invalid vehicle plate"),
  body("vehicle.vehicleCapacity")
    .isInt({ min: 4, max: 8 })
    .withMessage("Invalid vehicle capacity"),
  body("vehicle.vehicleType")
    .isIn(["sedan", "suv", "van", "hatchback"])
    .withMessage("Invalid vehicle type"),
];

export const driverLoginValidation = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
