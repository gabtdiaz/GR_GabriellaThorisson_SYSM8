// src/components/Hero.jsx
import React from "react";
import "../css/Hero.css"; // Vi kommer att skapa en separat CSS för hero

const Hero = ({ backgroundImage }) => {
  return (
    <div
      className="heroimg"
      style={{
        background: `url(${backgroundImage}) center`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="menu-btn">
        <div className="menu2">MENY</div>
      </div>
      <div className="order-btn">
        <div className="order-online">BESTÄLL ONLINE</div>
      </div>
    </div>
  );
};

export default Hero;
