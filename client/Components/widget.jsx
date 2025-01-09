import React from "react";
import "../Styles/widget.css";

function Widget({ title, value, description }) {
  return (
    <div className="widget">
      <h3>{title}</h3>
      <p className="widget-value">{value}</p>
      <span className="widget-description">{description}</span>
    </div>
  );
}

export default Widget;
