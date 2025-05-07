import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { hashPassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/generateToken.utils.js";

export const registerUser = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullname, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateToken(user._id);

    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
