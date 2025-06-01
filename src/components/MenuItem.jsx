// src/components/MenuItem.jsx
import React from "react";
import "../css/MenuItem.css";

const MenuItem = ({
  item,
  isCheckout = false,
  onAdd,
  onRemove,
  quantity = 0,
  onCardClick, // Lägg till denna prop
}) => {
  if (isCheckout) {
    // Här ska jag skriva checkout kod...
    return <div className="checkout-item">{/* checkout kod */}</div>;
  }

  // OrderPage - MenuItem-card layout
  return (
    <div
      className="menu-item-card"
      onClick={() => onCardClick && onCardClick(item)} // Lägg till denna onClick
    >
      {/* Popular bricka */}
      {item.popular && (
        <div className="popular-icon">
          <img className="flame-icon" src="flame-icon.png" alt="Popular" />
          <span className="popular">Popular</span>
        </div>
      )}

      <img alt={item.name} className="item-img" src={`${item.image}`} />

      <div className="dish-info">
        <div className="dish-name-frame">
          <div className="dish-name">{item.name}</div>
        </div>
        <div className="dish-description-frame">
          <div className="dish-description">{item.description}</div>
        </div>
        <div className="dish-price-frame">
          <div className="dish-price">{item.price} SEK</div>
        </div>
      </div>

      <div className="menu-item-card-plusBox">
        <div
          className="frame-plus"
          onClick={(e) => {
            onAdd(item.id);
          }}
        >
          <img className="plus-logo" src="addplus.png" alt="Add" />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
