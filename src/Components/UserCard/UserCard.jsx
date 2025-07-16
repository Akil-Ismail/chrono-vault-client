import React from "react";
import "./UserCard.css";

const UserCapsuleCard = ({
  username,
  message,
  image,
  audio,
  reveal,
  privacy,
  color,
  mood,
  coverImage,
  surprise,
  tags,
}) => {
  return (
    <div className="capsule-card" style={{ borderColor: color }}>
      <div className="capsule-header" style={{ backgroundColor: color }}>
        <h3>
          {username} {mood}
        </h3>
        <span className="privacy">{privacy}</span>
      </div>

      <div className="capsule-content">
        <p>
          <strong>Reveal on:</strong> {new Date(reveal).toLocaleString()}
        </p>
        {!surprise && <p className="capsule-message">{message}</p>}

        {image && (
          <div>
            <p>
              <strong>Attached Image:</strong>
            </p>
            <img src={image} alt="Attached" className="capsule-media" />
          </div>
        )}

        {audio && (
          <div>
            <p>
              <strong>Audio Note:</strong>
            </p>
            <audio controls src={audio}></audio>
          </div>
        )}

        {tags && (
          <p className="capsule-tags">
            <strong>Tags:</strong> {tags}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCapsuleCard;
