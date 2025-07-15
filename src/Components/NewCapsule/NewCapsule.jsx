import React from "react";
import "./NewCapsule.css";
import { useState } from "react";

const CapsuleModal = ({ OnclickHandler }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className="modal-overlay">
      <div className="capsule-modal">
        <button className="close-btn" onClick={OnclickHandler}>
          ×
        </button>

        <h2>Time Capsule</h2>

        <label className="input-label">Capsule’s Content</label>
        <textarea placeholder="Place your thoughts , goals , what do you want to acheive ...etc." />

        <div className="attach-line">
          <span>
            To attach files (images, voice notes, videos…)
            <label className="attach-link">
              Press Here +
              <input
                type="file"
                multiple
                hidden
                onChange={(e) =>
                  setSelectedFiles((prevFiles) => [
                    ...prevFiles,
                    ...Array.from(e.target.files),
                  ])
                }
              />
            </label>
          </span>

          {selectedFiles.length > 0 && (
            <ul className="file-list">
              {selectedFiles.map((file, index) => (
                <li key={index} className="file-name">
                  {file.name}
                  <button
                    className="remove-file-btn"
                    onClick={() => {
                      setSelectedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="datetime-wrapper">
          <div className="datetime-field">
            <label>Release Time</label>
            <input type="time" placeholder="HH:MM" />
          </div>
          <div className="datetime-field">
            <label>Release Date</label>
            <input type="date" placeholder="DD/MM/YYYY" />
          </div>
        </div>

        <label className="privacy-label">Privacy</label>
        <div className="privacy-options">
          <button>public</button>
          <button>private</button>
          <button>unlisted</button>
        </div>

        <button className="create-btn">Create New Capsule</button>
      </div>
    </div>
  );
};

export default CapsuleModal;
