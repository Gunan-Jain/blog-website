import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPage.css";
import ThemeToggle from "../Components/Theme";

const Blog = () => {
  const [pendingParagraphs, setPendingParagraphs] = useState([]);

  // Fetch pending paragraphs
  const fetchPendingParagraphs = async () => {
    try {
      const response = await axios.get("http://localhost:4009/paragraphs", {
        params: { status: "pending" },
      });
      setPendingParagraphs(response.data);
    } catch (error) {
      console.error("Error fetching pending paragraphs:", error);
    }
  };

  // Approve paragraph
  const approveParagraph = async (id) => {
    try {
      // Send the correct PUT request with the paragraph ID
      await axios.put(`http://localhost:4009/paragraphs/${id}/approve`);

      // Refresh pending paragraphs after approval
      fetchPendingParagraphs();
    } catch (error) {
      console.error("Error approving paragraph:", error);
    }
  };

  useEffect(() => {
    fetchPendingParagraphs();
  }, []);

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <ThemeToggle />
      </header>
      <main className="admin-content">
        <h2>Pending Paragraphs</h2>
        {pendingParagraphs.length > 0 ? (
          pendingParagraphs.map((paragraph) => (
            <div key={paragraph._id} className="paragraph-item">
              <p>{paragraph.content}</p>
              <button onClick={() => approveParagraph(paragraph._id)}>Approve</button>
            </div>
          ))
        ) : (
          <p>No pending paragraphs</p>
        )}
      </main>
    </div>
  );
};

export default Blog;