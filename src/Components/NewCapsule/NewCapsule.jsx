import React, { useState } from "react";
import "./NewCapsule.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CapsuleModal = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");
  const [surprise, setSurprise] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [country, setCountry] = useState("us");

  const Navigate = useNavigate();

  const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    const attachments = [];

    for (let file of selectedFiles) {
      try {
        const base64 = await fileToBase64(file);
        attachments.push(base64);
      } catch (err) {
        console.error("Error encoding file:", err);
      }
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("mood", mood);
    formData.append("release_time", time);
    formData.append("release_date", date);
    formData.append("surprise", surprise ? 1 : 0);
    formData.append("privacy", privacy);
    formData.append("country", country);
    attachments.forEach((base64) => {
      formData.append("attachments[]", base64);
    });

    const token = localStorage.getItem("user_token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v0.1/createCapsule",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log(
          "Capsule created:",
          content,
          time,
          date,
          privacy,
          mood,
          selectedFiles,
          surprise
        );
        Navigate(-1);
      }
    } catch (err) {
      console.error("Capsule creation failed:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="capsule-modal">
        <button className="close-btn" onClick={() => Navigate(-1)}>
          ×
        </button>

        <h2>Time Capsule</h2>

        <label className="input-label">Capsule’s Content</label>
        <textarea
          placeholder="Place your thoughts, goals, what you want to achieve... etc."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          id="Mood"
          className="create-btn"
          name="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
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

        <label className="privacy-label">Privacy (</label>
        <label>
          <input
            type="checkbox"
            checked={surprise}
            onChange={(e) => setSurprise(e.target.checked)}
          />
          Surprise Mode )
        </label>

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

        <button className="create-btn" onClick={handleSubmit}>
          Create New Capsule
        </button>
      </div>
    </div>
  );
};

export default CapsuleModal;
