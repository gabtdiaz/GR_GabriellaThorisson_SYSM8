// src/pages/Order.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import "../css/Order.css";

const Order = () => {
  const [activeFilter, setActiveFilter] = useState("Mains");

  // Sample menu data - ersätt med din riktiga data
  const menuData = {
    Mains: [
      {
        id: 1,
        name: "Combo plate",
        description: "A combo of three different types of tacos",
        price: "90 SEK",
        image: "/api/placeholder/150/120",
        isPopular: true,
      },
      {
        id: 2,
        name: "Al Pastor Tacos",
        description: "Pork, Onion, Cilantro, Pineapple, Salsa verde",
        price: "75 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
      {
        id: 3,
        name: "Carne Asada",
        description: "Beef, Onion, Cilantro, Salsa verde",
        price: "80 SEK",
        image: "/api/placeholder/150/120",
        isPopular: true,
      },
      {
        id: 4,
        name: "Veggie Tacos",
        description: "Fried beans, Onion, Cilantro, Salsa verde",
        price: "65 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
    ],
    Sides: [
      {
        id: 5,
        name: "Guacamole",
        description: "Avocado spread w. onion, cilantro, cumin and lime",
        price: "45 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
      {
        id: 6,
        name: "Nachos",
        description: "Fried tortilla bread w. tomato salsa",
        price: "55 SEK",
        image: "/api/placeholder/150/120",
        isPopular: true,
      },
      {
        id: 7,
        name: "Rice and Beans",
        description: "Frijoles with steamed rice",
        price: "40 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
      {
        id: 8,
        name: "Jalapeño Poppers",
        description: "Spicy jalapeños with cream cheese",
        price: "50 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
    ],
    Desserts: [
      {
        id: 9,
        name: "Tres Leches Cake",
        description: "Soaked in condensed milk",
        price: "65 SEK",
        image: "/api/placeholder/150/120",
        isPopular: true,
      },
      {
        id: 10,
        name: "Churros",
        description: "W. cinnamon and sugar",
        price: "55 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
    ],
    Drinks: [
      {
        id: 11,
        name: "Jarritos Cola",
        description: "Classic Mexican cola",
        price: "35 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
      {
        id: 12,
        name: "Corona Beer",
        description: "Light Mexican beer",
        price: "45 SEK",
        image: "/api/placeholder/150/120",
        isPopular: true,
      },
      {
        id: 13,
        name: "Michelada",
        description: "Beer cocktail with lime and spices",
        price: "50 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
      {
        id: 14,
        name: "Horchata",
        description: "Traditional rice drink",
        price: "40 SEK",
        image: "/api/placeholder/150/120",
        isPopular: false,
      },
    ],
  };

  const filters = ["Mains", "Sides", "Desserts", "Drinks"];

  return (
    <div className="order-page">
      <Header />
      <main className="order-main">
        {/* Filter Section - exakt som din HTML */}
        <div className="filters">
          {filters.map((filter) => (
            <div
              key={filter}
              className={`filter-chip ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              <div className="state-layer">
                <div className="label-text">{filter}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Items Frame - exakt som din HTML struktur */}
        <div className="menuitems-frame">
          {/* Category Header */}
          <div className="category-header-section">
            <div className="category-title-wrapper">
              <div className="category-title-text">{activeFilter}</div>
            </div>
          </div>

          {/* Menu Items - två och två per rad */}
          <div className="category-frame">
            <div className="items-row-container">
              {menuData[activeFilter]?.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
