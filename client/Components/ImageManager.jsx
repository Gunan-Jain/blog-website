import React, { useState } from "react";
import "../Styles/ImageManager.css";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageManager() {
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    processImage(uploadedImage);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedImage = e.dataTransfer.files[0];
    processImage(uploadedImage);
  };

  const processImage = (uploadedImage) => {
    if (
      uploadedImage &&
      ["image/jpeg", "image/png", "image/gif"].includes(uploadedImage.type)
    ) {
      setImageFile(uploadedImage);
      setPreview(URL.createObjectURL(uploadedImage));
    } else {
      alert("Only JPEG, PNG, or GIF images are allowed.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageSubmit = () => {
    if (imageFile) {
      let uploadInterval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(uploadInterval);
            alert("Image uploaded successfully!");
            return 0;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 500);
    } else {
      alert("Please upload an image.");
    }
  };

  return (
    <div className="image-manager">
      <h2>Manage Images</h2>
      <div
        className="image-form"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="text"
          placeholder="Image Title"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
        />
        <div className="upload-section">
          <label htmlFor="image-upload" className="upload-btn">
            <FaCloudUploadAlt size={30} /> Drag & Drop or Upload Image
            (JPEG/PNG/GIF)
          </label>
          <input
            id="image-upload"
            type="file"
            onChange={handleImageUpload}
            hidden
          />
        </div>
        {preview && <img src={preview} alt="Preview" className="preview" />}
        {progress > 0 && (
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        )}
        <button className="btn" onClick={handleImageSubmit}>
          Add Image
        </button>
      </div>
    </div>
  );
}

export default ImageManager;
