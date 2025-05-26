import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import MenuItemModal from "../components/MenuItemModal";

import { useCart } from "../context/cartContext";
import "../css/Order.css";

// Filter knappar för att visa olika kategorier
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

// En sektion som visar en kategori med titel och dess items
const CategorySection = ({ title, items, onAddItem, onCardClick }) => {
  return (
    <div className="category-section">
      {/* Rubrik för kategorin */}
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
      </div>

      {/* Grid med alla items i kategorin */}
      <div className="items-grid">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onAdd={onAddItem} // När man klickar på plus-knappen
            onCardClick={onCardClick} //  När man klickar på hela kortet
          />
        ))}
      </div>
    </div>
  );
};

// Huvudkomponenten för Order-sidan
const Order = () => {
  // Använd cart context istället för lokal state
  const { addToCart } = useCart();

  // Vilken filter som är aktiv
  const [activeFilter, setActiveFilter] = useState("All");

  // All menu data från servern
  const [menuData, setMenuData] = useState({
    Mains: [],
    Sides: [],
    Desserts: [],
    Drinks: [],
  });

  // Loading och error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart state - för att visa varukorgen eller ej
  const [showCart, setShowCart] = useState(false);

  // Modal states - för popup-fönstret
  const [isModalOpen, setIsModalOpen] = useState(false); // Är modalen öppen?
  const [selectedItem, setSelectedItem] = useState(null); // Vilket item är valt?

  // Hämta menu data från servern när sidan laddas
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/menuItems");

        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }

        const data = await response.json();

        // Sortera data i kategorier
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
  }, []);

  // När man klickar på plus-knappen - öppna modal istället
  const handleAddItem = (itemId) => {
    // Hitta itemet i menuData
    const allItems = [
      ...menuData.Mains,
      ...menuData.Sides,
      ...menuData.Desserts,
      ...menuData.Drinks,
    ];

    const item = allItems.find((menuItem) => menuItem.id === itemId);

    if (item) {
      handleCardClick(item); // Öppna modal istället för att lägga till direkt
    }
  };

  // När man klickar på hela kortet - öppna modal
  const handleCardClick = (item) => {
    setSelectedItem(item); // Spara vilket item som valdes
    setIsModalOpen(true); // Öppna modalen
  };

  // Stäng modalen
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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

  // Huvudinnehållet på sidan
  return (
    <div className="order-page">
      <Header />

      <div className="main-content">
        {/* Filter knappar */}
        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="content-container">
          {/* Visa antingen alla kategorier eller bara den valda */}
          {activeFilter === "All" ? (
            // Visa alla kategorier
            <>
              <CategorySection
                title="Mains"
                items={menuData.Mains}
                onAddItem={handleAddItem}
                onCardClick={handleCardClick}
              />
              <CategorySection
                title="Sides"
                items={menuData.Sides}
                onAddItem={handleAddItem}
                onCardClick={handleCardClick}
              />
              <CategorySection
                title="Desserts"
                items={menuData.Desserts}
                onAddItem={handleAddItem}
                onCardClick={handleCardClick}
              />
              <CategorySection
                title="Drinks"
                items={menuData.Drinks}
                onAddItem={handleAddItem}
                onCardClick={handleCardClick}
              />
            </>
          ) : (
            // Visa bara den valda kategorin
            <CategorySection
              title={activeFilter}
              items={menuData[activeFilter] || []}
              onAddItem={handleAddItem}
              onCardClick={handleCardClick}
            />
          )}
        </div>
      </div>

      <Footer />

      {/* Modal popup - visas bara när isModalOpen är true */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
      />
    </div>
  );
};

export default Order;
