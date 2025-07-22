import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    await axios
      .post("http://127.0.0.1:8000/api/v0.1/guest/login", formData)
      .then((data) => {
        if (data.status) {
          navigate("/");
          const payload = data.data.payload;

          localStorage.setItem("user_name", payload.name);
          localStorage.setItem("user_email", payload.email);
          localStorage.setItem("user_phone", payload.phone);
          localStorage.setItem("user_token", payload.token);
        } else {
          alert(data.error || "Login failed.");
        }
      });
  };

  const navigate = useNavigate();
  const redirect = () => {
    navigate("/register");
  };

  return (
    <form onSubmit={handleLogin}>
      <section className="login-container">
        <h2>Login</h2>
        <p className="agreement">
          By continuing, you agree to our <a href="#">User Agreement</a> and
          understand the <a href="#">Privacy Policy</a>.
        </p>
        <div className="login-form">
          <input
            type="email"
            id="username"
            className="username"
            placeholder="Email *"
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

          <button onClick={handleLogin}> Login</button>
        </div>
        <p className="signup">
          Don't have an account? <a onClick={redirect}>Sign Up</a>
        </p>
      </section>
    </form>
  );
};

export default LoginForm;
