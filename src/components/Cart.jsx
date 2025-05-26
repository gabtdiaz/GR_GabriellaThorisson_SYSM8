import React from "react";
import { useCart } from "../context/cartContext";
import "../css/Cart.css";

// Cart Item Component - semantisk och tydlig
const CartItem = ({ item, index, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityIncrease = () => {
    onUpdateQuantity(index, item.quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(index, item.quantity - 1);
    }
  };

  const handleRemoveItem = () => {
    onRemoveItem(index);
  };

  return (
    <article className="cart-product-item">
      <div className="cart-product-content">
        {/* Produktbild */}
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="cart-product-image"
        />

        {/* Produktinfo */}
        <div className="cart-product-info">
          <h3 className="cart-product-name">{item.name}</h3>
        </div>

        {/* Quantity kontroller */}
        <div className="cart-quantity-section">
          <button
            className="cart-minus-btn"
            onClick={handleQuantityDecrease}
            disabled={item.quantity <= 1}
          >
            <img src="/minus-circle.png" alt="Minus" />
          </button>

          <span className="cart-quantity-number">{item.quantity}</span>

          <button className="cart-plus-btn" onClick={handleQuantityIncrease}>
            <img src="/plus-circle.png" alt="Plus" />
          </button>
        </div>

        {/* Pris */}
        <div className="cart-price-section">
          <span className="cart-product-price">{item.price} SEK</span>
        </div>

        {/* Ta bort knapp */}
        <button className="cart-delete-btn" onClick={handleRemoveItem}>
          <img src="/trash-can.png" alt="Ta bort" />
        </button>
      </div>
    </article>
  );
};

// Cart Component - som overlay över vilken sida som helst
const Cart = ({ isOpen, onClose, onContinueToCheckout }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, hasItems } =
    useCart();

  const handleUpdateQuantity = (itemIndex, newQuantity) => {
    updateQuantity(itemIndex, newQuantity);
  };

  const handleRemoveItem = (itemIndex) => {
    removeFromCart(itemIndex);
  };

  const handleCheckoutClick = () => {
    onClose(); // Stäng cart overlay
    onContinueToCheckout(); // Öppna checkout overlay
  };

  // Stäng cart när man klickar utanför
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay-backdrop" onClick={handleOverlayClick}>
      <div className="cart-overlay-container">
        {/* Cart Dropdown - rullar ner från höger hörn */}
        <section className="cart-overlay-content">
          <div className="cart-dropdown-container">
            {/* Header med titel och stäng */}
            <header className="cart-header-section">
              <h1 className="cart-title-text">ORDER SUMMARY</h1>
              <button className="cart-close-button" onClick={onClose}>
                <img src="/close-icon.png" alt="Stäng" />
              </button>
            </header>

            {/* Cart innehåll */}
            <div className="cart-content-area">
              {!hasItems() ? (
                <div className="cart-empty-state">
                  <p>Din varukorg är tom</p>
                  <button onClick={onClose} className="cart-continue-shopping">
                    Fortsätt handla
                  </button>
                </div>
              ) : (
                <>
                  {/* Lista med produkter */}
                  <div className="cart-products-list">
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={`${item.id}-${index}`}
                        item={item}
                        index={index}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </div>

                  {/* Checkout knapp */}
                  <footer className="cart-checkout-section">
                    <button
                      className="cart-checkout-button"
                      onClick={handleCheckoutClick}
                    >
                      <span className="cart-checkout-text">Go to Checkout</span>
                      <span className="cart-total-price">
                        {getTotalPrice()} SEK
                      </span>
                    </button>
                  </footer>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
