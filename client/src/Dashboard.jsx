import React, { useState } from "react";
import "../styles/AdminPage.css";
import "./Dashboard.css";
import Widget from "../Components/widget";
import BlogManager from "../Components/BlogManager";
import VideoManager from "../Components/VideoManager";
import ThemeToggle from "../Components/Theme";
import { useNavigate } from "react-router-dom";
import ImageManager from "../Components/ImageManager";

function Dashboard() {
  const [blogContent, setBlogContent] = useState("");
  const navigate = useNavigate();

  const handleNavigateToBlog = () => {
    console.log("Navigating to Blog Page");
    navigate("/blog");
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <ThemeToggle />
      </header>
      <main className="admin-content">
        <section className="stats">
          <div
            onClick={handleNavigateToBlog}
            style={{ cursor: "pointer", maxWidth: "50vw" }}
          >
            <Widget title="Blogs" value="12" description="Manage blogs" />
          </div>

          <Widget
            title="Videos"
            value="25"
            description="Manage videos"
            className="VideoButton"
          />
        </section>
        <section className="management">
          <ImageManager />

          <BlogManager />
          <VideoManager />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
