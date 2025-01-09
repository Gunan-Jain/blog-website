// VideoManager.js
import React, { useState } from "react";
import "../Styles/VideoManage.css";
import { FaCloudUploadAlt } from "react-icons/fa";

function VideoManager() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleVideoUpload = (e) => {
    const uploadedVideo = e.target.files[0];
    processVideo(uploadedVideo);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedVideo = e.dataTransfer.files[0];
    processVideo(uploadedVideo);
  };

  const processVideo = (uploadedVideo) => {
    if (uploadedVideo && uploadedVideo.type === "video/mp4") {
      setVideoFile(uploadedVideo);
      setPreview(URL.createObjectURL(uploadedVideo));
    } else {
      alert("Only MP4 videos are allowed.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleVideoSubmit = () => {
    if (videoFile) {
      let uploadInterval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(uploadInterval);
            alert("Video uploaded successfully!");
            return 0;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 500);
    } else {
      alert("Please upload a video.");
    }
  };

  return (
    <div className="video-manager">
      <h2>Manage Videos</h2>
      <div
        className="video-form"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="text"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        <div className="upload-section">
          <label htmlFor="video-upload" className="upload-btn">
            <FaCloudUploadAlt size={30} /> Drag & Drop or Upload Video (MP4)
          </label>
          <input
            id="video-upload"
            type="file"
            onChange={handleVideoUpload}
            hidden
          />
        </div>
        {preview && <video src={preview} controls className="preview" />}
        {progress > 0 && (
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        )}
        <button className="btn" onClick={handleVideoSubmit}>
          Add Video
        </button>
      </div>
    </div>
  );
}

export default VideoManager;
