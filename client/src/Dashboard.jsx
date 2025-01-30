import React, { useState, useEffect } from "react";
import "../styles/AdminPage.css";
import Widget from "../Components/widget";
import VideoManager from "../Components/VideoManager";
import ThemeToggle from "../Components/Theme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlogManager from "../Components/BlogManager";

function Dashboard() {
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: null });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewBlog({ ...newBlog, image: e.target.files[0] });
  };

  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.image) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      formData.append("image", newBlog.image);

      const response = await axios.post("http://localhost:5000/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog added successfully!");
      navigate("/", { state: { newBlog: response.data } });

      setNewBlog({ title: "", content: "", image: null });
    } catch (err) {
      console.error("Error adding blog:", err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <ThemeToggle />
      </header>
      <main className="admin-content">
        <section className="stats">
          <Widget title="Blogs" />
          <Widget title="Videos" />
        </section>

        <section className="blog-manager">
          <h1>Add New Blog</h1>
          <div className="blog-form">
            <input
              type="text"
              placeholder="Enter Blog Title"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
            />
            <textarea
              placeholder="Enter Blog Content"
              name="content"
              value={newBlog.content}
              onChange={handleInputChange}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="toolbar">
              <button className="btn" onClick={handleAddBlog}>Post Blog</button>
            </div>
          </div>
        </section>

        <VideoManager />
      </main>
    </div>
  );
}

export default Dashboard;