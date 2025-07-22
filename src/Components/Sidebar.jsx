import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <a onClick={() => navigate("/")} className="nav-link">
        Public Wall
      </a>
      <a onClick={() => navigate("/personal")} className="nav-link">
        Personal Wall
      </a>
    </div>
  );
};

export default Sidebar;
