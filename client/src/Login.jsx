import React, { useState } from "react";
import "./Login.css";
import video from "./assets/Ai.mp4";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    axios
      .post("http://localhost:5003/login", formData)
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/Dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="login-image-section">
        <video
          src={video}
          className="login-video"
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
          muted
        />
        <div className="video-tagline">
          <p>Your Eyes When You’re Away</p>
        </div>
      </div>

      <div className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>

          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="login-input"
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-footer">
            Don’t have an account?{" "}
            <Link to="/signup" className="login-signup-link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
