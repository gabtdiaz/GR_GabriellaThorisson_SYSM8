// src/pages/Menu.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../css/Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="menu-page">
      <Header />
      <main className="menu-main">
        <section
          className="menu-hero"
          style={{ backgroundImage: "url(menuitems2.jpg)" }}
        >
          <div className="menu-container">
            <div className="menu-card">
              <h1 className="menu-title">THE MENU</h1>

              <div className="menu-section">
                <h2 className="section-title">Sides</h2>
                <p>
                  Guacamole - avocado spread w. onion, cilatro, cumin and lime
                </p>
                <p>Nachos - fried tortillabread w. tomato salsa</p>
                <p>Rice and beans - Frijoles with spicy rice</p>
              </div>

              <div className="menu-section">
                <h2 className="section-title">Tacos (x3)</h2>
                <p>Al pastor - Pork, Onion, Cilantro, Pineapple, Salsa verde</p>
                <p>Carne asada - Beef, Onion, Cilantro, Salsa verde</p>
                <p>Veggie - Fried beans, Onion, Cilantro, Salsa verde</p>
              </div>

              <div className="menu-section">
                <h2 className="section-title">Desserts</h2>
                <p>Tres leches cake - Soaked in condensed milk</p>
                <p>Churros - W. cinnamon and sugar</p>
              </div>

              <div className="menu-section">
                <h2 className="section-title">Drinks</h2>
                <p>Jarritos - Cola | Lime | Orange</p>
                <p>Beer - Corona</p>
              </div>

              <button
                className="order-button"
                onClick={() => navigate("/order")}
              >
                ORDER ONLINE
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
