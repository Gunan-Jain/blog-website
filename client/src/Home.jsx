import React from "react";
import "./Home.css";
import EnLogo from "./assets/EnLogo.jpg";
import Video from "./assets/video.mp4";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="top-navbar-extra">
        <span>Email: sales@dbsindia.in</span>
        <span>Phone: 9136533301</span>
        <a href="https://www.facebook.com/dbs.india.9">Facebook</a>
        <a href="https://www.facebook.com/dbs.india.9">Twitter</a>
        <a href="https://www.instagram.com/endroid.usa/">Instagram</a>
        <a href="https://www.linkedin.com/company/endroid-usa-630b76217/">
          LinkedIn
        </a>
        <a href="https://www.youtube.com/@vipinpahwa4815">YouTube</a>

        <Link to="/login" className="home">
          <button className="home-button">Login</button>
        </Link>
      </div>

      <div className="navbar">
        <div className="logo">
          <img src={EnLogo} alt="Endroid USA Logo" />
        </div>
        <nav>
          <a href="https://endroidusa.com/index.php">Home</a>
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
