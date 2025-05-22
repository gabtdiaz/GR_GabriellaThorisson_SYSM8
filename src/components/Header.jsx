import React, { useState } from "react";
import "../css/Header.css"; // Vi kommer att skapa en separat CSS för header

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="frame-navbar">
      <div className="logo-frame">
        <div className="text">Text</div>
        <img className="logo" src="/logo1.jpg" alt="Restaurangens logotyp" />
        <div className="text">Text</div>
      </div>

      {/* Hamburger-meny istället för navbar - mobilanpassning */}
      <div className="icon-frame" onClick={toggleMenu}>
        <img className="frame" src="/hamburgermenu.png" alt="Meny" />
      </div>

      {/* Navigationsmeny med mobil-toggle klass */}
      <div className={`navbar ${menuOpen ? "mobile-open" : ""}`}>
        <div className="home">Hem</div>
        <div className="order">Beställ</div>
        <div className="menu">Meny</div>
        <div className="contact">Kontakt</div>
        <div className="sign-in">Logga in</div>
      </div>
    </div>
  );
};

export default Header;
