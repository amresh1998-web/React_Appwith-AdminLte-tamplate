import React from "react";

const CardComponent = ({ title, value, icon, backgroundColor }) => {
  return (
    <div style={{ backgroundColor }} className="card-container">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default CardComponent;
