import React, { useState, useEffect } from "react";
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
  const [menuData, setMenuData] = useState({
    Mains: [],
    Sides: [],
    Desserts: [],
    Drinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hämta data från API när komponenten laddas
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/menuItems"); // Din JSON server URL

        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }

        const data = await response.json();

        // Gruppera data efter kategori
        const groupedData = {
          Mains: data.filter((item) => item.category === "Mains"),
          Sides: data.filter((item) => item.category === "Sides"),
          Desserts: data.filter((item) => item.category === "Desserts"),
          Drinks: data.filter((item) => item.category === "Drinks"),
        };

        setMenuData(groupedData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching menu data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []); // Tom array betyder att det bara körs en gång när komponenten laddas

  const handleAddItem = (itemId) => {
    console.log(`Adding item ${itemId} to cart`);
    // Här ska du hantera att lägga till item i cart
  };

  // Visa loading meddelande
  if (loading) {
    return (
      <div className="order-page">
        <Header />
        <div className="main-content">
          <div className="loading">Loading menu...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Visa fel meddelande
  if (error) {
    return (
      <div className="order-page">
        <Header />
        <div className="main-content">
          <div className="error">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

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
                title="Mains"
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
                onAddItem={handleAddItem}
              />
              <CategorySection
                title="Drinks"
                items={menuData.Drinks}
                onAddItem={handleAddItem}
              />
            </>
          ) : (
            // Visa bara vald kategori
            <CategorySection
              title={activeFilter}
              items={menuData[activeFilter] || []}
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
