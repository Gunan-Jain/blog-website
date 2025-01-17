import React, { useState } from "react";
import "./Signup.css";
import video from "./assets/Login-video.mp4";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/register", formData)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <video
          src={video}
          className="login-video"
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
          muted
        />
      </div>
      <div className="signup-form">
        <form className="signup-form-content" onSubmit={handleSubmit}>
          <h2 className="signup-title">Sign Up</h2>

          <label htmlFor="name" className="signup-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="signup-input"
          />

          <label htmlFor="email" className="signup-label">
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
            className="signup-input"
          />

          <label htmlFor="password" className="signup-label">
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
            className="signup-input"
          />

          <button type="submit" className="signup-button">
            Register
          </button>

          <p className="signup-footer">
            Already signed in?{" "}
            <Link to="/login" className="signup-login-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import "./Signup.css";
// import Image from "./assets/Endroid.jpg";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:3001/register", formData)
//       .then((result) => {
//         console.log(result);
//         navigate("/login");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="signup-container">
//       <div className="container">
//         <div className="signup-image">
//           <img src={Image} alt="not shown" />
//         </div>
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <h2 className="signup-title">Sign Up</h2>

//           <label htmlFor="name" className="signup-label">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//             className="signup-input"
//           />

//           <label htmlFor="email" className="signup-label">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//             className="signup-input"
//           />

//           <label htmlFor="password" className="signup-label">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//             className="signup-input"
//           />

//           <button type="submit" className="signup-button">
//             Register
//           </button>

//           <p className="signup-footer">
//             Already signed in?{" "}
//             <Link to="/login" className="signup-login-link">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
