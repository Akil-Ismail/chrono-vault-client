import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCapsule from "../../Components/AddCapsule";
import Sidebar from "../../Components/Sidebar";
import UserProfile from "../../Components/UserProfile/UserProfile";
import "./Styles.css";

const Landing = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div>
      <header>
        <h1>ChronoVault</h1>
        <button
          className="profile-btn"
          onClick={() => setShowProfile((state) => !state)}
        >
          Profile
        </button>
      </header>

      {showProfile && <UserProfile />}

      <div className="layout">
        <Sidebar />
        <main>
          <AddCapsule />
        </main>
      </div>
    </div>
  );
};

export default Landing;
