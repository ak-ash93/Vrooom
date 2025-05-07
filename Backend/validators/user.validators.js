import { body } from "express-validator";

export const registerValidation = [
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
];
