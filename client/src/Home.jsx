import React, { useState } from "react";
import "./Home.css";
import EnLogo from "./assets/EnLogo.jpg";
import Video from "./assets/video.mp4";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "Security Solutions for Modern Homes",
      content:
        "Discover how the latest advancements in security technology can transform the safety of your home. Learn about surveillance systems, smart cameras, and more...",
      comments: [],
      showCommentBox: false,
      commentText: "",
      commentImage: null,
    },
    {
      title: "How to Choose the Right Security Camera",
      content:
        "With so many options available, it can be overwhelming to choose the right security camera for your needs. This guide breaks down key features to look for...",
      comments: [],
      showCommentBox: false,
      commentText: "",
      commentImage: null,
    },
    {
      title: "Why Surveillance is Essential for Businesses",
      content:
        "Protecting your business from theft and vandalism is essential. In this post, we discuss the importance of security cameras in ensuring business safety...",
      comments: [],
      showCommentBox: false,
      commentText: "",
      commentImage: null,
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    file: null,
  });

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setNewBlog({ ...newBlog, image: e.target.files[0] });
  };

  const handleAddBlog = () => {
    setBlogs([
      ...blogs,
      { title: newBlog.title, content: newBlog.content, comments: [] },
    ]);
    setNewBlog({
      title: "",
      content: "",
      image: null,
      file: null,
    });
  };

  const toggleCommentBox = (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].showCommentBox = !updatedBlogs[index].showCommentBox;
    setBlogs(updatedBlogs);
  };

  const handleCommentTextChange = (e, index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].commentText = e.target.value;
    setBlogs(updatedBlogs);
  };

  const handleAddComment = (index) => {
    const updatedBlogs = [...blogs];
    const newComment = {
      text: blogs[index].commentText,
      replies: [],
    };
    updatedBlogs[index].comments.push(newComment);
    updatedBlogs[index].commentText = "";
    updatedBlogs[index].showCommentBox = false;
    setBlogs(updatedBlogs);
  };

  const handleAddReply = (blogIndex, commentIndex, replyText) => {
    const updatedBlogs = [...blogs];
    const newReply = {
      text: replyText,
    };
    updatedBlogs[blogIndex].comments[commentIndex].replies.push(newReply);
    setBlogs(updatedBlogs);
  };

  return (
    <>
      <div className="top-navbar-extra">
        <span>Email: sales@dbsindia.in</span>
        <span>Phone: 9136533301</span>
        <a href="https://www.facebook.com/dbs.india.9" target="_blank">
          Facebook
        </a>
        <a href="https://www.facebook.com/dbs.india.9" target="_blank">
          Twitter
        </a>
        <a href="https://www.instagram.com/endroid.usa/" target="_blank">
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/company/endroid-usa-630b76217/"
          target="_blank"
        >
          LinkedIn
        </a>
        <a href="https://www.youtube.com/@vipinpahwa4815" target="_blank">
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
          <a href="https://endroidusa.com/index.php" target="_blank">
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

        {/* Blog Section */}
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

                <button
                  onClick={() => toggleCommentBox(index)}
                  className="comment-button"
                >
                  💬
                </button>

                {blog.showCommentBox && (
                  <div className="comment-box">
                    <textarea
                      value={blog.commentText}
                      onChange={(e) => handleCommentTextChange(e, index)}
                      placeholder="Add a comment"
                    />
                    <button onClick={() => handleAddComment(index)}>
                      Add Comment
                    </button>
                  </div>
                )}

                {/* Render Comments */}
                {blog.comments.length > 0 && (
                  <div className="comments">
                    {blog.comments.map((comment, commentIndex) => (
                      <div key={commentIndex} className="comment">
                        <p>{comment.text}</p>

                        {/* Render Replies */}
                        {comment.replies.length > 0 && (
                          <div className="replies">
                            {comment.replies.map((reply, replyIndex) => (
                              <div key={replyIndex} className="reply">
                                <p>{reply.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Button */}
                        <textarea
                          placeholder="Reply to this comment"
                          onChange={(e) => {
                            const replyText = e.target.value;
                            handleAddReply(index, commentIndex, replyText);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
            <div>
              <p>
                <strong>Follow us:</strong>
              </p>
              <div className="social-media">
                <a href="https://www.facebook.com/DBSENDROID">Facebook</a>
                <a href="https://www.instagram.com/endroid.usa">Instagram</a>
              </div>
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
