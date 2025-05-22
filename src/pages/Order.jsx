import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import "../css/Order.css";

// Filter chipsen
const FilterChips = ({ activeFilter, setActiveFilter }) => {
  const filters = ["All", "Mains", "Sides", "Desserts", "Drinks"];

  return (
    <div className="filters">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`filter-chip ${activeFilter === filter ? "active" : ""}`}
        >
          <div className="state-layer">
            <div className="label-text">{filter}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

// Category Section Component
const CategorySection = ({ title, items, icon, onAddItem }) => {
  return (
    <div className="category-section">
      {/* Category Header */}
      <div className="category-header">
        {icon && <div className="category-icon">{icon}</div>}
        <h2 className="category-title">{title}</h2>
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} onAdd={onAddItem} />
        ))}
      </div>
    </div>
  );
};

// Main Order Page Component
const Order = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Sample menu data
  const menuData = {
    Mains: [
      {
        id: 1,
        name: "Combo plate",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: true,
      },
      {
        id: 2,
        name: "Combo plate",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 3,
        name: "Combo plate",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 4,
        name: "Combo plate",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
    ],
    Sides: [
      {
        id: 5,
        name: "Side Combo",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: true,
      },
      {
        id: 6,
        name: "Side Combo",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 7,
        name: "Side Combo",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 8,
        name: "Side Combo",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
    ],
    Desserts: [
      {
        id: 9,
        name: "Sweet Treat",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 10,
        name: "Sweet Treat",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
    ],
    Drinks: [
      {
        id: 11,
        name: "Refreshing Drink",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: true,
      },
      {
        id: 12,
        name: "Refreshing Drink",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 13,
        name: "Refreshing Drink",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
      {
        id: 14,
        name: "Refreshing Drink",
        description: "A combo of three different types of tacos",
        price: "90",
        popular: false,
      },
    ],
  };

  const handleAddItem = (itemId) => {
    console.log(`Adding item ${itemId} to cart`);
    // Här skulle du hantera att lägga till item i cart
  };

  // Category icons - placeholders för dina egna ikoner
  const categoryIcons = {
    Desserts: <img src="dessertlogo.png" alt="Desserts" className="dessert2" />,
    Drinks: <img src="drinklogo.png" alt="Drinks" className="ice-drink" />,
  };

  return (
    <div className="order-page">
      <Header />

      {/* Main Content */}
      <div className="main-content">
        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="content-container">
          {/* Show all categories or filtered */}
          {activeFilter === "All" ? (
            // Visa alla kategorier med sina rubriker
            <>
              <CategorySection
                title="Tacos"
                items={menuData.Mains}
                onAddItem={handleAddItem}
              />
              <CategorySection
                title="Sides"
                items={menuData.Sides}
                onAddItem={handleAddItem}
              />
              <CategorySection
                title="Desserts"
                items={menuData.Desserts}
                icon={categoryIcons.Desserts}
                onAddItem={handleAddItem}
              />
              <CategorySection
                title="Drinks"
                items={menuData.Drinks}
                icon={categoryIcons.Drinks}
                onAddItem={handleAddItem}
              />
            </>
          ) : (
            // Visa bara vald kategori
            <CategorySection
              title={activeFilter === "Mains" ? "Tacos" : activeFilter}
              items={menuData[activeFilter]}
              icon={categoryIcons[activeFilter]}
              onAddItem={handleAddItem}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
