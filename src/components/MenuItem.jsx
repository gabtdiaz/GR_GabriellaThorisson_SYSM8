import React from "react";
import "../css/MenuItem.css";

const MenuItem = ({
  item,
  isCheckout = false,
  onAdd,
  onRemove,
  quantity = 0,
}) => {
  if (isCheckout) {
    // Checkout item layout
    return (
      <div className="checkout-item">
        <img src="combo.jpg" alt={item.name} className="checkout-item-img" />
        <div className="checkout-item-info">
          <h3 className="checkout-item-name">{item.name}</h3>
          <p className="checkout-item-desc">{item.description}</p>
          <p className="checkout-item-price">{item.price} SEK</p>
        </div>
        <div className="checkout-item-controls">
          <button
            onClick={() => onRemove(item.id)}
            className="checkout-btn minus"
          >
            -
          </button>
          <span className="checkout-quantity">{quantity}</span>
          <button onClick={() => onAdd(item.id)} className="checkout-btn plus">
            +
          </button>
        </div>
      </div>
    );
  }

  // OrderPage - MenuItem-card layout
  return (
    <div className="menu-item-card">
      {/* Popular bricka */}
      {item.popular && (
        <div className="popular-icon">
          <img className="flame-icon" src="flame-icon.png" alt="Popular" />
          <span className="popular">Popular</span>
        </div>
      )}

      <img src="combo.jpg" alt={item.name} className="item-img" />
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
          <div className="_90-sek">{item.price} SEK</div>
        </div>
      </div>

      <div className="frame-22">
        <div className="frame-plus" onClick={() => onAdd(item.id)}>
          <img className="plus-logo" src="addplus.png" alt="Add" />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
