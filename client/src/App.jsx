import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
