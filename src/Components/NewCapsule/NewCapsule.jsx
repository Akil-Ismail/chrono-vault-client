import React, { useState } from "react";
import "./NewCapsule.css";

const CapsuleModal = ({ OnclickHandler }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [privacy, setPrivacy] = useState("public");

  const handleSubmit = () => {
    console.log({
      content,
      time,
      date,
      privacy,
      selectedFiles,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="capsule-modal">
        <button className="close-btn" onClick={OnclickHandler}>
          ×
        </button>

        <h2>Time Capsule</h2>

        <label className="input-label">Capsule’s Content</label>
        <textarea
          placeholder="Place your thoughts, goals, what you want to achieve... etc."
          onChange={(e) => setContent(e.target.value)}
        />

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
                    onClick={() =>
                      setSelectedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
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
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="datetime-field">
            <label>Release Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <label className="privacy-label">Privacy</label>
        <section className="privacy-options">
          <section className="privacy-options">
            <button
              type="button"
              className={privacy === "public" ? "active" : ""}
              onClick={() => setPrivacy("public")}
            >
              Public
            </button>

            <button
              type="button"
              className={privacy === "private" ? "active" : ""}
              onClick={() => setPrivacy("private")}
            >
              Private
            </button>

            <button
              type="button"
              className={privacy === "unlisted" ? "active" : ""}
              onClick={() => setPrivacy("unlisted")}
            >
              Unlisted
            </button>
          </section>
        </section>

        <button className="create-btn" onClick={handleSubmit}>
          Create New Capsule
        </button>
      </div>
    </div>
  );
};

export default CapsuleModal;
