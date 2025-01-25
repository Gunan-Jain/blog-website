import React, { useState, useEffect } from "react";
import "./Home.css";
import EnLogo from "./assets/EnLogo.jpg";
import Video from "./assets/video.mp4";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
  });
  const [showForm, setShowForm] = useState(false); // Toggles the form

  // Fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3008/paragraphs");
      const formattedBlogs = response.data.map((item) => {
        const [title, content] = item.content.split(": ");
        return { title: title || "Untitled", content: content || "" };
      });
      setBlogs(formattedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddBlog = async () => {
    if (newBlog.title.trim() && newBlog.content.trim()) {
      try {
        const newBlogContent = `${newBlog.title}: ${newBlog.content}`;

        // Post the new blog to the backend
        await axios.post("http://localhost:3008/paragraphs", {
          content: newBlogContent, // Sending title and content as combined string
        });

        // Fetch blogs again to reflect the new addition
        fetchBlogs();

        // Reset the new blog form and close it
        setNewBlog({ title: "", content: "" });
        setShowForm(false);
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    } else {
      alert("Please fill in both title and content.");
    }
  };

  return (
    <>
      <div className="top-navbar-extra">
        <span>Email: sales@dbsindia.in</span>
        <span>Phone: 9136533301</span>
        <a
          href="https://www.facebook.com/dbs.india.9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://www.facebook.com/dbs.india.9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://www.instagram.com/endroid.usa/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/company/endroid-usa-630b76217/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://www.youtube.com/@vipinpahwa4815"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <Link to="/login" className="home">
          <button className="home-button">Login</button>
        </Link>
      </div>

      <div className="navbar">
        <div className="logo">
          <img src={EnLogo} alt="Endroid USA Logo" />
        </div>
        <nav>
          <a
            href="https://endroidusa.com/index.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home
          </a>
          <a href="#about">About Us</a>
          <a href="#features">Products</a>
          <a href="#marketing">Marketing</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </div>

      <div className="main-content">
        <section className="video-section">
          <video autoPlay muted loop>
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay">Welcome to Endroid USA</div>
        </section>

        <section className="features" id="features">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature">
              <h4>Advanced Technology</h4>
              <p>State-of-the-art surveillance systems for your safety.</p>
            </div>
            <div className="feature">
              <h4>High Reliability</h4>
              <p>Products designed for durability and consistency.</p>
            </div>
            <div className="feature">
              <h4>Easy Installation</h4>
              <p>Hassle-free setup for immediate use.</p>
            </div>
          </div>
        </section>

        <section className="blog" id="blog">
          <h3>Latest Blog Posts</h3>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div className="blog-post" key={index}>
                <h4>{blog.title}</h4>
                <div
                  className="blog-content"
                  style={{ maxHeight: "300px", overflowY: "scroll" }}
                >
                  <p>{blog.content}</p>
                </div>
              </div>
            ))}

            {/* Add Blog Icon */}
            <div
              className="blog-post add-blog"
              onClick={() => setShowForm(!showForm)}
            >
              <FaPlusCircle size={50} color="#007BFF" />
              <p>Add New Blog</p>
            </div>

            {/* Blog Form */}
            {showForm && (
              <div className="blog-post">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Blog Title"
                  value={newBlog.title}
                  onChange={handleBlogChange}
                  className="blog-input"
                />
                <textarea
                  name="content"
                  placeholder="Enter Blog Content"
                  value={newBlog.content}
                  onChange={handleBlogChange}
                  className="blog-textarea"
                />
                <button onClick={handleAddBlog} className="submit-button">
                  Post Blog
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="contact" id="contact">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div>
              <p>
                <strong>Email:</strong> sales@endroidusa.com
              </p>
            </div>
            <div>
              <p>
                <strong>Phone:</strong> +1 913-653-3301
              </p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <h3>About Us</h3>
          <p>
            Endroid USA is dedicated to providing cutting-edge security
            solutions to homes and businesses. Our products are designed with
            reliability, efficiency, and ease of use in mind, ensuring that your
            safety is never compromised. With a commitment to excellence, we
            strive to deliver the best in surveillance and security technology.
          </p>
        </section>

        <footer>
          <p>&copy; 2025 Endroid USA. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
