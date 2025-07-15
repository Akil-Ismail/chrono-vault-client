import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
  };

  const navigate = useNavigate();
  const redirect = () => {
    navigate("/register");
  };

  return (
    <main>
      <section className="login-container">
        <h2>Login</h2>
        <p className="agreement">
          By continuing, you agree to our <a href="#">User Agreement</a> and
          understand the <a href="#">Privacy Policy</a>.
        </p>
        <div className="login-form">
          <input
            type="text"
            id="username"
            className="username"
            placeholder="Email or username *"
            onChange={(e) => setUsername(e.target.value)}
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

          <button onClick={() => handleLogin()}> Login</button>
        </div>
        <p className="signup">
          Don't have an account? <a onClick={redirect}>Sign Up</a>
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
