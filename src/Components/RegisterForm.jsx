import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  };
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/Login");
  };

  return (
    <main>
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
          <button onClick={handleRegister}> Sign Up</button>
        </div>
        <p className="login">
          Already have an account? <a onClick={redirect}>Login</a>
        </p>
      </section>
    </main>
  );
};

export default RegisterForm;
