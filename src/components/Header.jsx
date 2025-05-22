import React, { useState } from "react";
import "../css/Header.css"; // Separat css för header

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="frame-navbar">
      <div className="logo-frame">
        <div className="text">Text</div>
        <img className="logo" src="/logo1.jpg" alt="Restaurant logo" />
        <div className="text">Text</div>
      </div>

      {/* Hamburger-meny istället för navbar - mobilanpassning */}
      <div className="icon-frame" onClick={toggleMenu}>
        <img className="frame" src="/hamburgermenu.png" alt="Menu" />
      </div>

      {/* Navigationsmeny med mobil-toggle klass */}
      <div className={`navbar ${menuOpen ? "mobile-open" : ""}`}>
        <div className="home">HOME</div>
        <div className="order">ORDER</div>
        <div className="menu">MENU</div>
        <div className="contact">KONTAKT</div>
        <div className="sign-in">LOGIN</div>
      </div>
    </div>
  );
};

export default Header;
