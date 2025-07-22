import React from "react";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Personal from "../Pages/personal/personal";

const Apis = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/Personal" element={<Personal />}></Route>
    </Routes>
  );
};

export default Apis;
