// src/components/Hero.jsx
import React from "react";
import "../css/Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = ({ backgroundImage }) => {
  const navigate = useNavigate();
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
        <div className="menu-btn" onClick={() => navigate("/menu")}>
          <div className="menu2">MENU</div>
        </div>
        <div className="order-btn" onClick={() => navigate("/order")}>
          <div className="order-online">ORDER</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
