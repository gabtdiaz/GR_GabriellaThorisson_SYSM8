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
  toggleFavorite,
  isFavorite,
  isLoggedIn,
}) => {
  // Hantera favorit-klick
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Förhindra att kortet klickas
    toggleFavorite(parseInt(item.id));
  };

  // OrderPage - MenuItem-card layout
  return (
    <div
      className="menu-item-card"
      onClick={() => onCardClick && onCardClick(item)} // Lägg till denna onClick
    >
      {/* Favorit-hjärta */}
      {isLoggedIn && (
        <button
          className={`favorite-btn ${
            isFavorite(parseInt(item.id)) ? "is-favorite" : ""
          }`}
          onClick={handleFavoriteClick}
        >
          <img
            src="hearticon.png"
            alt="Add to favorites"
            className="heart-icon"
          />
        </button>
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
            e.stopPropagation(); // Förhindra att kortet klickas
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
