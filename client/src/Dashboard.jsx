import React from "react";
import "../styles/AdminPage.css";
import Widget from "../Components/widget";
import BlogManager from "../Components/BlogManager";
import VideoManager from "../Components/VideoManager";
import ImageManager from "../Components/ImageManager";
import ThemeToggle from "../Components/Theme";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    console.log("Blog website");
    navigate("/Blog");
  };
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button type="button" onClick={handleNavigate}>
          History Blogs
        </button>
        <ThemeToggle />
      </header>
      <main className="admin-content">
        <section className="stats">
          <Widget title="Blogs" value="25" description="Manage blogs" />
          <Widget title="Videos" value="12" description="Manage videos" />
        </section>
        <section className="management">
          <BlogManager />
          <ImageManager />
          <VideoManager />
        </section>
      </main>
    </div>
  );
}

export default App;
