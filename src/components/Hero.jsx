// src/components/Hero.jsx
import React from "react";
import "../css/Hero.css";

const Hero = ({ backgroundImage }) => {
  return (
    <div className="heroimg">
      {/* Bakgrundsbild med lägre opacitet */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Valfri mörkare overlay (ta bort om du bara vill ha lägre opacitet) */}
      <div className="hero-overlay" />

      {/* Innehåll med knappar (full opacitet) */}
      <div className="hero-content">
        <div className="menu-btn">
          <div className="menu2">MENY</div>
        </div>
        <div className="order-btn">
          <div className="order-online">BESTÄLL ONLINE</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
