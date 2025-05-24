import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importerar Link för navigering
import "../css/Header.css"; // Separat css för header

const Header = () => {
  // State för att hålla koll om mobilmenyn är öppen lr stängd
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    setMenuOpen(!menuOpen); // Byter från true till false eller tvärtom
    navigate(path); // Navigerar till den valda sidan
  };

  return (
    <div className="frame-navbar">
      <div className="logo-frame" onClick={() => navigate("/")}>
        <div className="text">Text</div>
        <img className="logo" src="/logo1.jpg" alt="Restaurant logo" />
        <div className="text">Text</div>
      </div>

      {/* Hamburgermeny istället för navbar - vid mobilskärmar */}
      <div className="icon-frame" onClick={toggleMenu}>
        <img className="frame" src="/hamburgermenu.png" alt="Menu" />
      </div>

      {/* Navigationsmeny med mobil-toggle klass */}
      <div className={`navbar ${menuOpen ? "mobile-open" : ""}`}>
        <div className="home">HOME</div>
        <div className="order">ORDER</div>
        <div className="menu">MENU</div>
        <div className="contact">CONTACT US</div>
        <div className="sign-in">LOGIN</div>
      </div>
    </div>
  );
};

export default Header;
