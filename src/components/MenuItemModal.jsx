import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import "../css/MenuItemModal.css";

const MenuItemModal = ({ isOpen, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  // Använd cart context
  const { addToCart } = useCart();

  // Resetta quantity till 1 varje gång modalen öppnas
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Stäng modal när man klickar utanför
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Öka kvantitet
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Minska kvantitet (minst 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Lägg till i cart och stäng modal
  const handleAddToCart = () => {
    if (!item) return;

    // Lägg till i cart via context
    addToCart(item, quantity);

    console.log(`Added ${quantity} ${item.name} to cart`);

    // Stäng modal (quantity resettas automatiskt via useEffect när isOpen blir false)
    onClose();
  };

  // Visa inte modal om den inte är öppen
  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="clicked-menu-item-card">
        {/* Bild-sektion med stäng-knapp */}
        <div
          className="frame-26" // Ändra klassnamn om du har tid?
          style={{
            background: item?.image
              ? `url(${item.image}) center`
              : "linear-gradient(135deg, #ff6b6b, #ffa500)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Enkel stäng-knapp */}
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Knappar-sektion (plus/minus och add to cart) */}
        <div className="frame-31">
          <div className="add-remove-btns-frame">
            <div className="frame-34">
              {/* Plus/Minus knappar - samma stil som Cart */}
              <div className="modal-quantity-section">
                <button
                  className="modal-minus-btn"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>

                <span className="modal-quantity-number">{quantity}</span>

                <button className="modal-plus-btn" onClick={increaseQuantity}>
                  +
                </button>
              </div>

              {/* Add to cart knapp */}
              <div className="addtocart-btn" onClick={handleAddToCart}>
                <div className="add-to-cart">
                  ADD {quantity > 1 ? `${quantity} ` : ""}TO CART
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info-sektion (titel, beskrivning, pris) */}
        <div className="frame-33">
          <div className="frame-21-modal">
            <div className="dish-name-modal">{item?.name || "Combo plate"}</div>

            <div className="frame-19-modal">
              <div className="dish-description-modal">
                {item?.description ||
                  "A combo of three different types of tacos"}
              </div>
            </div>

            <div className="frame-20-modal">
              <div className="dish-price-modal">
                <strong>{(item?.price || 90) * quantity} SEK</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
