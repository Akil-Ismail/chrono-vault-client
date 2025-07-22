import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCapsule from "../../Components/AddCapsule";
import Sidebar from "../../Components/Sidebar";
import UserProfile from "../../Components/UserProfile/UserProfile";
import UserCapsuleCard from "../../Components/UserCard/UserCard";

const Personal = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [mood, setMood] = useState("");
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/v0.1/getUserCapsules",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const rawCapsules = res.data.payload;

        const userCapsules = rawCapsules.map((capsule) => {
          const image =
            capsule.attachments?.find((a) =>
              a.type?.toLowerCase().startsWith("image/")
            )?.encoded || null;

          const audio =
            capsule.attachments?.find((a) =>
              a.type?.toLowerCase().startsWith("audio/")
            )?.encoded || null;

          return {
            username: capsule.user?.name || "  ",
            message: capsule.content || "",
            image,
            audio,
            reveal: `${capsule.release_date}T${capsule.release_time}`,
            privacy: capsule.privacy,
            mood: capsule.mood || "",
            country: capsule.country,
          };
        });

        setCapsules(userCapsules);
      } catch (error) {
        console.error("Failed to fetch capsules:", error);
      }
    };

    fetchCapsules();
  }, []);

  return (
    <div>
      <header className="nav-bar">
        <h1>ChronoVault</h1>
        <div className="Filters">
          <select
            id="Mood"
            className="Mood-filter"
            name="Mood"
            onChange={(e) => setMood(e.target.value)}
            value={mood}
          >
            <option value="">All Moods</option>
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😢 Sad</option>
            <option value="Angry">😠 Angry</option>
            <option value="Excited">🤩 Excited</option>
            <option value="Relaxed">😌 Relaxed</option>
            <option value="Bored">😐 Bored</option>
            <option value="Anxious">😰 Anxious</option>
          </select>
        </div>
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
          <div className="PublicCapsules">
            {capsules
              .filter((capsule) => mood === "" || capsule.mood === mood)
              .map((capsule, index) => (
                <UserCapsuleCard key={index} capsule={capsule} />
              ))}
          </div>

          <AddCapsule />
        </main>
      </div>
    </div>
  );
};

export default Personal;
