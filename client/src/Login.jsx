import React, { useState } from "react";
import "./Login.css";
import Image from "./assets/Endroid.jpg";
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
      .post("http://localhost:5000/login", formData)
      .then((result) => {
        console.log(result);
        if (result.data == "Success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="login-image">
          <img src={Image} alt="Not Shown" />
        </div>
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
