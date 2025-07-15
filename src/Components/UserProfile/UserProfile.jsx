import React from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/login");
    localStorage.clear();
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
          <input type="text" value="{user.name}" required />
        </div>
        <div className="field-group">
          <label>Email</label>
          <input type="email" value="{user.email}" readOnly />
        </div>
      </div>

      <button className="logout-button" onClick={redirect}>
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;
