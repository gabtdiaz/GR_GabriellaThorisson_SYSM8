// src/components/MenuItem.jsx
import React from "react";

const MenuItem = ({ item, variant = "order" }) => {
  const handleAddToCart = () => {
    // Här lägg till logik för att lägga till i kundvagn
    console.log("Added to cart:", item);
  };

  if (variant === "checkout") {
    // Smal version för kundvagn - stackad vertikalt
    return (
      <div className="checkout-item-card">
        <img className="checkout-item-img" src={item.image} alt={item.name} />
        <div className="checkout-item-content">
          <div className="checkout-item-info">
            <div className="checkout-item-name">{item.name}</div>
          </div>
          <div className="checkout-item-description">{item.description}</div>
          <div className="checkout-item-price">{item.price}</div>
        </div>
        <div className="checkout-controls">
          <button className="quantity-btn" aria-label="Minska antal">
            -
          </button>
          <span className="quantity">1</span>
          <button className="quantity-btn" aria-label="Öka antal">
            +
          </button>
        </div>
      </div>
    );
  }

  // Standard version för order-sidan - exakt som din HTML
  return (
    <div className="menu-item-card">
      <img className="item-img" src={item.image} alt={item.name} />
      <div className="frame-21">
        <div className="frame-18">
          <div className="combo-plate">{item.name}</div>
        </div>
        <div className="frame-19">
          <div className="a-combo-of-three-different-types-of-tacos">
            {item.description}
          </div>
        </div>
        <div className="frame-20">
          <div className="_90-sek">{item.price}</div>
        </div>
        {item.isPopular && (
          <div className="popular-badge">
            <svg
              className="flame-icon"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2C8 2 12 4 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 6 6 4 6 4C6 4 7 5 8 6C8 4 8 2 8 2Z"
                fill="#FF6B35"
              />
            </svg>
            <span className="popular-text">Popular</span>
          </div>
        )}
      </div>
      <div className="frame-22">
        <div className="frame-plus" onClick={handleAddToCart}>
          <svg
            className="plus-logo"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
