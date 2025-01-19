import React, { useState } from "react";
import "../styles/AdminPage.css";
import Widget from "../Components/widget";
import BlogManager from "../Components/BlogManager";
import VideoManager from "../Components/VideoManager";
import ThemeToggle from "../Components/Theme";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [blogContent, setBlogContent] = useState("");
  const navigate = useNavigate();

  const handleNavigateToBlog = () => {
    console.log("Navigating to Blog Page");
    navigate("/blog");
  };

  const handleTextFormatting = (style) => {
    const textarea = document.getElementById("blog-content");
    if (style === "bold") {
      document.execCommand("bold");
    } else if (style === "italic") {
      document.execCommand("italic");
    } else if (style === "underline") {
      document.execCommand("underline");
    } else if (style === "alignLeft") {
      document.execCommand("justifyLeft");
    } else if (style === "alignCenter") {
      document.execCommand("justifyCenter");
    } else if (style === "alignRight") {
      document.execCommand("justifyRight");
    }
  };

  const handleImageUpload = () => {
    // Open file picker for image upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imgTag = `<img src="${reader.result}" alt="uploaded" style="max-width: 100%; height: auto;"/>`;
          const content = document.getElementById("blog-content");
          content.innerHTML += imgTag;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <ThemeToggle />
      </header>
      <main className="admin-content">
        <section className="stats">
          <div onClick={handleNavigateToBlog} style={{ cursor: "pointer" }}>
            <Widget title="Blogs" value="12" description="Manage blogs" />
            {/* Blog Tools */}
            <div className="blog-tools">
              <i className="fas fa-upload" title="Upload Image" onClick={handleImageUpload}></i>
              <i className="fas fa-bold" title="Bold Text" onClick={() => handleTextFormatting("bold")}></i>
              <i className="fas fa-italic" title="Italic Text" onClick={() => handleTextFormatting("italic")}></i>
              <i className="fas fa-underline" title="Underline" onClick={() => handleTextFormatting("underline")}></i>
              <i className="fas fa-align-left" title="Align Left" onClick={() => handleTextFormatting("alignLeft")}></i>
              <i className="fas fa-align-center" title="Align Center" onClick={() => handleTextFormatting("alignCenter")}></i>
              <i className="fas fa-align-right" title="Align Right" onClick={() => handleTextFormatting("alignRight")}></i>
            </div>
          </div>

          <Widget title="Videos" value="25" description="Manage videos" />
        </section>
        <section className="management">
          <div className="blog-content">
            <div className="blog-input">
              <input
                type="text"
                placeholder="Blog Title"
                className="blog-title"
                // You can add additional functionality if needed for title input
              />
            </div>
            <div
              id="blog-content"
              className="blog-textarea"
              contentEditable="true"
              placeholder="Start writing your blog content..."
              onInput={(e) => setBlogContent(e.target.innerHTML)}
            />
          </div>
          <BlogManager />
          <VideoManager />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
