import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Userlogin from "./pages/users/Userlogin";
import Usersignup from "./pages/users/Usersignup";
import Driverlogin from "./pages/drivers/Driverlogin";
import Driversignup from "./pages/drivers/Driversignup";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Userlogin />}></Route>
        <Route path="/signup" element={<Usersignup />}></Route>
        <Route path="/driverlogin" element={<Driverlogin />}></Route>
        <Route path="/driversignup" element={<Driversignup />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="light"
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
      />
    </>
  );
};

export default App;
