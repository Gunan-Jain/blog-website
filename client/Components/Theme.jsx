import React, { useState, useEffect } from "react";
import "../Styles/theme.css";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <div className={`toggle-capsule ${darkMode ? "dark" : ""}`}>
        <span className="icon">{darkMode ? "🌙" : "☀️"}</span>
      </div>
    </div>
  );
}

export default ThemeToggle;
