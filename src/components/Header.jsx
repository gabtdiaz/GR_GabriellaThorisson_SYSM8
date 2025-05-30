import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import "../css/Header.css";

const Header = () => {
  // State för att hålla koll om mobilmenyn är öppen eller stängd
  const [menuOpen, setMenuOpen] = useState(false);

  // Använd cart context istället för localStorage direkt
  const { hasItems, getTotalItems } = useCart();

  // Auth context
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    setMenuOpen(false); // Stäng menyn när man navigerar
    navigate(path); // Navigerar till den valda sidan
  };

  // Logout funktion
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/"); // Skicka användaren till hem efter logout
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

        {/* Visa MY ACCOUNT eller SIGN IN */}
        {token ? (
          <>
            <div
              className="sign-in"
              onClick={() => handleNavigation("/account")}
            >
              MY ACCOUNT
            </div>
            <div className="sign-in" onClick={handleLogout}>
              LOGOUT
            </div>
          </>
        ) : (
          <div className="sign-in" onClick={() => handleNavigation("/signin")}>
            SIGN IN
          </div>
        )}
      </div>

      {/* Show order knapp, placeras utanför navbar! ska alltid synas om det finns varor i varukorg.*/}
      <button
        className={`show-order-btn ${!hasItems() ? "hidden" : ""}`}
        onClick={() => navigate("/cart")}
      >
        SHOW ORDER ({getTotalItems()})
      </button>
    </div>
  );
};

export default Header;
