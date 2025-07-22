import React, { useState } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const user = {
    name: localStorage.getItem("user_name"),
    email: localStorage.getItem("user_email"),
  };
  const [name, updateName] = useState(user.name);
  const [email, updateEmail] = useState(user.email);
  localStorage.setItem("user_name", name);
  localStorage.setItem("user_email", email);
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/login");
    localStorage.clear();
  };
  const update = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    const token = localStorage.getItem("user_token");
    await axios
      .post("http://127.0.0.1:8000/api/v0.1/updateUser", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        if (data.status) {
          const payload = data.data.payload;

          localStorage.setItem("user_name", payload.name);
          localStorage.setItem("user_email", payload.email);
          localStorage.setItem("user_token", payload.token);
        }
      });
  };
  return (
    <div className="user-profile">
      <h2 className="title">Profile</h2>

      <div className="profile-picture-wrapper">
        <div className="picture-circle">
          <span className="plus-icon">+</span>
        </div>
      </div>

      <div className="info-fields">
        <div className="field-group">
          <label>Name</label>
          <input
            type="text"
            defaultValue={user.name}
            onChange={(e) => updateName(e.target.value)}
            required
          />
        </div>
        <div className="field-group">
          <label>Email</label>
          <input
            type="email"
            defaultValue={user.email}
            onChange={(e) => updateEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <button className="button" onClick={update}>
        Update Profile
      </button>
      <button className="logout-button" onClick={redirect}>
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;
