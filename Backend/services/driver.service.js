import driverModel from "../models/driver.model.js";

export const createDriver = async ({
  firstname,
  lastname,
  email,
  password,
  phone,
  color,
  registration,
  vehicleCapacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !phone ||
    !color ||
    !registration ||
    !vehicleCapacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const newDriver = await driverModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    phone,
    vehicle: {
      color,
      registration,
      vehicleCapacity,
      vehicleType,
    },
  });
  return newDriver;
};
