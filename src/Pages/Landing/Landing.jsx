import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCapsule from "../../Components/AddCapsule";
import Sidebar from "../../Components/Sidebar";
import UserProfile from "../../Components/UserProfile/UserProfile";
import "./Styles.css";
import UserCard from "../../Components/UserCard/UserCard";

const dummyCapsule = {
  username: "Abbas Ahmad",
  message: "Hey future me! I hope you're still chasing your dreams 🚀.",
  image: "https://via.placeholder.com/600x250?text=Cover+Image",
  audio: "https://www.w3schools.com/html/horse.mp3",
  reveal: "2025-12-25T10:30",
  privacy: "private",
  surprise: false,
};
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
        <UserCard {...dummyCapsule} />

        <main>
          <AddCapsule />
        </main>
      </div>
    </div>
  );
};

export default Landing;
