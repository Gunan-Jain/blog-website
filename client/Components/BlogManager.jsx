import React, { useState } from "react";
import "../Styles/BlogManager.css";

// Importing Font Awesome icons
import { FaUpload, FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

function BlogManager() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleSubmit = async () => {
    if (blogTitle.trim() === "" || blogContent.trim() === "") {
      alert("Please fill in both the title and the content fields.");
    } else {
      try {
        const response = await fetch("http://localhost:5000/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: blogTitle, content: blogContent }),
        });
        if (response.ok) {
          alert("Blog added successfully!");
          setBlogTitle("");
          setBlogContent("");
        } else {
          alert("Failed to add blog.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleTextFormat = (formatType) => {
    const activeElement = document.activeElement;
    const selectionStart = activeElement.selectionStart;
    const selectionEnd = activeElement.selectionEnd;
    const selectedText = activeElement.value.substring(selectionStart, selectionEnd);

    if (selectedText) {
      let formattedText;
      switch (formatType) {
        case "bold":
          formattedText = `<b>${selectedText}</b>`;
          break;
        case "italic":
          formattedText = `<i>${selectedText}</i>`;
          break;
        case "alignLeft":
          formattedText = `<div style="text-align: left;">${selectedText}</div>`;
          break;
        case "alignCenter":
          formattedText = `<div style="text-align: center;">${selectedText}</div>`;
          break;
        case "alignRight":
          formattedText = `<div style="text-align: right;">${selectedText}</div>`;
          break;
        default:
          return;
      }

      const newText = activeElement.value.substring(0, selectionStart) + formattedText + activeElement.value.substring(selectionEnd);
      if (activeElement === document.getElementById("blogTitle")) {
        setBlogTitle(newText);
      } else if (activeElement === document.getElementById("blogContent")) {
        setBlogContent(newText);
      }
    }
  };

  const handleImageUpload = () => {
    alert("Upload image functionality goes here.");
    // You can implement image uploading here
  };

  return (
    <div className="blog-manager">
      <h2>Manage Blogs</h2>
      <div className="blog-form">
        <input
          id="blogTitle"
          type="text"
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <textarea
          id="blogContent"
          placeholder="Blog Content"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        ></textarea>
        <div className="toolbar">
          <FaUpload className="icon" onClick={handleImageUpload} title="Upload Image" />
          <FaBold className="icon" onClick={() => handleTextFormat("bold")} title="Bold" />
          <FaItalic className="icon" onClick={() => handleTextFormat("italic")} title="Italic" />
          <FaAlignLeft className="icon" onClick={() => handleTextFormat("alignLeft")} title="Align Left" />
          <FaAlignCenter className="icon" onClick={() => handleTextFormat("alignCenter")} title="Align Center" />
          <FaAlignRight className="icon" onClick={() => handleTextFormat("alignRight")} title="Align Right" />
        </div>
        <button className="btn" onClick={handleSubmit}>
          Add Blog
        </button>
      </div>
    </div>
  );
}

export default BlogManager;
