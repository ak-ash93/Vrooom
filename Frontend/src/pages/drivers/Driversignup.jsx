import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store/authStore";

const Driversignup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const driverLogin = useAuthStore((state) => state.loginAsDriver);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const firstname = formData.firstname.trim();
    const lastname = formData.lastname.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const driverData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
    };

    driverLogin(driverData);

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/driverdashboard");
  };

  return (
    <div className="w-screen h-screen bg-white  p-7 flex flex-col justify-between">
      <div>
        <p className="heading-font mb-10 text-gray-900 px-5 text-xl font-extrabold ">
          VRoom
        </p>

        <form
          onSubmit={handleFormSubmit}
          className="poppins-regular text-gray-800"
        >
          <h3 className="text-base font-medium mb-2">Enter your Name</h3>
          <div className="flex gap-2 mb-5">
            <input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className={`border px-5 py-1.5 w-1/2 text-md placeholder:text-base  rounded-md transition-all duration-200 focus:outline-none ${
                formData.firstname
                  ? "bg-white text-black"
                  : "bg-[#eeeeee] text-gray-500"
              }`}
            />
            <input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className={`border px-5 py-1.5 w-1/2 text-md placeholder:text-base  rounded-md transition-all duration-200 focus:outline-none ${
                formData.lastname
                  ? "bg-white text-black"
                  : "bg-[#eeeeee] text-gray-500"
              }`}
            />
          </div>

          <h3 className="text-base font-medium mb-2">Enter your Email</h3>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@email.com"
            className={`border px-5 py-1.5 w-full text-base placeholder:text-base mb-5 rounded-md transition-all duration-200 focus:outline-none ${
              formData.email
                ? "bg-white text-black"
                : "bg-[#eeeeee] text-gray-500"
            }`}
          />
          <h3 className="text-base font-medium mb-2">Enter your Password</h3>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="********"
            className={`border px-5 py-1.5 w-full text-base placeholder:text-base mb-5 rounded-md transition-all duration-200 focus:outline-none ${
              formData.password
                ? "bg-white text-black"
                : "bg-[#eeeeee] text-gray-500"
            }`}
          />
          <h3 className="text-base font-medium mb-2">Confirm your Password</h3>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="********"
            className={`border px-5 py-1.5 w-full text-base placeholder:text-base mb-8 rounded-md transition-all duration-200 focus:outline-none ${
              formData.confirmPassword
                ? "bg-white text-black"
                : "bg-[#eeeeee] text-gray-500"
            }`}
          />

          <button className="bg-black text-white px-5 py-2 w-full   rounded ">
            Register
          </button>
        </form>
        <p className="text-center text-md mt-3 text-gray-600">
          Already registered?
          <Link to="/driverlogin" className="text-blue-800 ml-2">
            Sign In
          </Link>
        </p>
      </div>
      <div>
        <p className="text-center mt-2.5 text-xs text-gray-500">
          This site is protected by reCAPTCHA and the{" "}
          <span className="text-blue-800">Google Privacy Policy</span> and{" "}
          <span className="text-blue-800">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default Driversignup;
