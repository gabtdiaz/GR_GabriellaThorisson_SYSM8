// src/pages/RestaurantPage.jsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";
import "../css/RestaurantPage.css";

const RestaurantPage = () => {
  return (
    <div className="desktop-1">
      <Header />
      <Hero backgroundImage="/heroimg0.png" />
      <MenuSection />
      <Footer />
    </div>
  );
};

export default RestaurantPage;
