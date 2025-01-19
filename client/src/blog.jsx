import React from "react";
import "../styles/AdminPage.css";
import ThemeToggle from "../Components/Theme";

const Blog = () => {
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Blog Page</h1>
        <ThemeToggle />
      </header>
      <main className="admin-content">
        <p>Welcome to the Blog Page! This is where blogs will be displayed.</p>
      </main>
    </div>
  );
};

export default Blog;
