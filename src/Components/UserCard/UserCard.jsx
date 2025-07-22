import React, { useEffect, useState } from "react";
import "./UserCard.css";

const UserCapsuleCard = ({ capsule }) => {
  const {
    username,
    message,
    video,
    image,
    audio,
    reveal,
    privacy,
    mood,
    surprise,
  } = capsule;

  const [isRevealed, setIsRevealed] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const revealTime = new Date(reveal);

    const updateCountdown = () => {
      const now = new Date();
      const timer = revealTime - now;

      if (timer <= 0) {
        setIsRevealed(true);
        setCountdown("");
        return;
      }

      const days = Math.floor(timer / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timer / (1000 * 60)) % 60);
      const seconds = Math.floor((timer / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [reveal]);

  return (
    <div className="capsule-card">
      <div className="capsule-header">
        <h3>
          <div>{username ? username : ""}</div>{" "}
          {isRevealed && mood && `(${mood})`}
        </h3>
        <span className="privacy">{privacy}</span>
      </div>

      <div className="capsule-content">
        <p className="reveal-date">
          <strong>Reveal on:</strong>{" "}
          {new Date(reveal).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {!isRevealed && countdown && (
          <p className="countdown-timer">{countdown}</p>
        )}

        {isRevealed && !surprise && message && (
          <p className="capsule-message">{message}</p>
        )}

        {isRevealed && video && (
          <div className="media-wrapper">
            <p>
              <strong>Attached Video:</strong>
            </p>
            <video
              src={video}
              alt="Capsule Attachment"
              className="capsule-media"
            />
          </div>
        )}

        {isRevealed && image && (
          <div className="media-wrapper">
            <p>
              <strong>Attached Image:</strong>
            </p>
            <img
              src={image}
              alt="Capsule Attachment"
              className="capsule-media"
              loading="lazy"
            />
          </div>
        )}

        {isRevealed && audio && (
          <div className="media-wrapper">
            <p>
              <strong>Audio Note:</strong>
            </p>
            <audio controls src={audio} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCapsuleCard;
