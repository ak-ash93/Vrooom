import userModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const newUser = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return newUser;
};
