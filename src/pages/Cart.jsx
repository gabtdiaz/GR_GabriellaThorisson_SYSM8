import React from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout"; // Importera hooken
import Header from "../components/Header";
import Footer from "../components/Footer";
import Payment from "../components/Payment";
import "../css/Cart.css";

// Cart Item Component
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
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="cart-product-image"
        />
        <div className="cart-product-info">
          <h3 className="cart-product-name">{item.name}</h3>
        </div>
        <div className="cart-quantity-section">
          <button
            className="cart-minus-btn"
            onClick={handleQuantityDecrease}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="cart-quantity-number">{item.quantity}</span>
          <button className="cart-plus-btn" onClick={handleQuantityIncrease}>
            +
          </button>
        </div>
        <div className="cart-price-section">
          <span className="cart-product-price">
            {item.price * item.quantity} SEK
          </span>
        </div>
        <button className="cart-delete-btn" onClick={handleRemoveItem}>
          <img src="/trashcan.png" alt="Ta bort" />
        </button>
      </div>
    </article>
  );
};

// Huvudkomponent för Cart-sidan
const Cart = () => {
  // Hooks
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, hasItems } =
    useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  // Checkout hook - innehåller all checkout-logik
  const {
    customerInfo,
    orderMessage,
    isEditing,
    showPayment,
    setOrderMessage,
    setIsEditing,
    handleCustomerInfoChange,
    handleContinueToCheckout,
    handleClosePayment,
  } = useCheckout();

  // Cart funktioner
  const handleUpdateQuantity = (itemIndex, newQuantity) => {
    updateQuantity(itemIndex, newQuantity);
  };

  const handleRemoveItem = (itemIndex) => {
    removeFromCart(itemIndex);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="cart-page">
      <Header />

      <main className="cart-main-container">
        <div className="cart-page-content">
          {/* Vänster sida - Cart Items */}
          <div className="cart-left-section">
            <div className="cart-header-section">
              <h1 className="cart-page-title">YOUR CART</h1>
              <button className="cart-back-link" onClick={handleGoBack}>
                ← GO BACK
              </button>
            </div>

            {!hasItems() ? (
              <div className="cart-empty-state">
                <h2>Your cart is empty</h2>
                <p>Add products to continue</p>
                <button
                  onClick={() => navigate("/order")}
                  className="cart-continue-shopping"
                >
                  ORDER NOW
                </button>
              </div>
            ) : (
              <>
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

                <div className="cart-summary-section">
                  <div className="cart-total-summary">
                    <div className="summary-row">
                      <span>Products ({cartItems.length})</span>
                      <span>{getTotalPrice()} SEK</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span>39 SEK</span>
                    </div>
                    <div className="summary-row total-row">
                      <strong>Total</strong>
                      <strong>{getTotalPrice() + 39} SEK</strong>
                    </div>
                  </div>

                  {/* Meddelande till resturangen */}
                  <div className="order-message-section">
                    <h3 className="message-title">Special Instructions</h3>
                    <textarea
                      placeholder="Message to the restaurant (optional)..."
                      value={orderMessage}
                      onChange={(e) => setOrderMessage(e.target.value)}
                      className="message-textarea"
                      rows="3"
                    />
                  </div>

                  {/* Kunduppgifter */}
                  <div className="customer-fields">
                    <div className="customer-fields-header">
                      <h3 className="customer-fields-title">
                        {token
                          ? "Delivery Information"
                          : "Delivery Information"}
                      </h3>
                      {token && (
                        <button
                          type="button"
                          className="edit-info-btn"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? "Lock" : "Edit"}
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={customerInfo.name}
                      onChange={(e) =>
                        handleCustomerInfoChange("name", e.target.value)
                      }
                      className="customer-input"
                      disabled={token && !isEditing}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleCustomerInfoChange("phone", e.target.value)
                      }
                      className="customer-input"
                      disabled={token && !isEditing}
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address *"
                      value={customerInfo.address}
                      onChange={(e) =>
                        handleCustomerInfoChange("address", e.target.value)
                      }
                      className="customer-input"
                      disabled={token && !isEditing}
                    />
                  </div>

                  <button
                    className="show-order-button"
                    onClick={handleContinueToCheckout}
                  >
                    Continue to Checkout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Höger sida - Payment Component */}
          {showPayment && (
            <div className="cart-right-section">
              <Payment
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                customerInfo={customerInfo}
                orderMessage={orderMessage}
                onClose={handleClosePayment}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
