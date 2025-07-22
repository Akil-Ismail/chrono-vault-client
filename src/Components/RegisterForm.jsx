import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    await axios
      .post("http://127.0.0.1:8000/api/v0.1/guest/register", formData)
      .then((data) => {
        if (data.status) {
          navigate("/");
          const payload = data.data.payload;

          localStorage.setItem("user_id", payload.id);
          localStorage.setItem("user_name", payload.name);
          localStorage.setItem("user_email", payload.email);
          localStorage.setItem("user_phone", payload.phone);
          localStorage.setItem("user_token", payload.token);
        } else {
          alert(data.error || "Register failed.");
        }
      });
  };
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/Login");
  };

  return (
    <form onSubmit={handleRegister}>
      <section className="Register-container">
        <h2>Register</h2>

        <div className="Register-form">
          <input
            type="text"
            id="name"
            className="name"
            placeholder="Enter Full name *"
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
          <input
            type="text"
            id="phone"
            className="phone"
            placeholder="Enter phone number *"
            onChange={(e) => setPhone(e.target.value)}
            required
          />{" "}
          <input
            type="email"
            id="email"
            className="email"
            placeholder="Enter your email *"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            className="password"
            placeholder="Enter Password *"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button> Sign Up</button>
        </div>
        <p className="login">
          Already have an account? <a onClick={redirect}>Login</a>
        </p>
      </section>
    </form>
  );
};

export default RegisterForm;
