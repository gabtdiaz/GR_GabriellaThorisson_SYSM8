import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css"; // Separat css för header

const Header = () => {
  // State för att hålla koll om mobilmenyn är öppen lr stängd
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderUpdated, setOrderUpdated] = useState(false);

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
      <div className="logo-frame" onClick={() => handleNavigation("/")}>
        <img className="logo" src="/logo1.jpg" alt="Restaurant logo" />
        <div className="text">Alma Mexicana</div>
      </div>

      {/* Hamburgermeny istället för navbar - vid mobilskärmar */}
      <div className="icon-frame" onClick={toggleMenu}>
        <img className="frame" src="/hamburgermenu.png" alt="Menu" />
      </div>

      {/* Navigationsmeny med mobil-toggle klass */}
      <div className={`navbar ${menuOpen ? "mobile-open" : ""}`}>
        <div className="home" onClick={() => handleNavigation("/")}>
          HOME
        </div>
        <div className="menu" onClick={() => handleNavigation("/menu")}>
          MENU
        </div>
        <div className="order" onClick={() => handleNavigation("/order")}>
          ORDER
        </div>
        <div className="contact" onClick={() => handleNavigation("/")}>
          CONTACT
        </div>
        <div className="sign-in" onClick={() => handleNavigation("/")}>
          LOGIN
        </div>
      </div>
      <button className="show-order-btn" onClick={() => navigate("/cart")}>
        SHOW ORDER
      </button>
    </div>
  );
};

export default Header;
