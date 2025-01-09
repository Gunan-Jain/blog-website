import React, { useState, useEffect } from "react";
import "./Blog.css";
function Blog() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/blog");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/blog`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully!");
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog History</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h2>{blog.title}</h2>
          <p>{blog.content.substring(0, 100)}...</p>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Blog;
