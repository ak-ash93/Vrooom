import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Driverlogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const driverLogin = useAuthStore((state) => state.loginAsDriver);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    const driverData = {
      email,
    };

    driverLogin(driverData);

    setEmail("");
    setPassword("");
    navigate("/driverdashboard");
  };
  return (
    <div className="p-7 h-screen w-screen border-2 flex flex-col justify-between bg-white text-black">
      <div>
        <p className="heading-font mb-10 text-gray-900 px-5 text-xl font-extrabold ">
          VRoom
        </p>
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">Enter Your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            type="email"
            className={`border px-5 py-2 w-full text-lg placeholder:text-base mb-5 rounded-md transition-all duration-200 focus:outline-none ${
              email ? "bg-white text-black" : "bg-[#eeeeee] text-gray-500"
            }`}
          />
          <h3 className="text-lg fot-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            type="password"
            className={`border px-5 py-2 w-full text-lg placeholder:text-base mb-8 rounded-md transition-all duration-200 focus:outline-none ${
              password ? "bg-white text-black" : "bg-[#eeeeee] text-gray-500"
            }`}
          />

          <button className="bg-black text-white px-5 py-2 w-full  mb-2 rounded ">
            Login
          </button>
        </form>
        <p className="text-center mt-2 text-sm text-gray-600">
          Want to be a driver?
          <Link to="/driversignup" className="text-blue-800 ml-2">
            Create an account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-green-700 flex justify-center items-center text-white px-5 py-2 w-full  mb-2 rounded focus:outline-none "
        >
          Sign In as User
        </Link>
      </div>
    </div>
  );
};

export default Driverlogin;
