// src/pages/RestaurantPage.jsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";
import "../css/Home.css";

const HomePage = () => {
  return (
    <div className="desktop-1">
      <Header />
      <Hero backgroundImage="/heroimg.jpg" />
      <MenuSection />
      <Footer />
    </div>
  );
};

export default HomePage;
