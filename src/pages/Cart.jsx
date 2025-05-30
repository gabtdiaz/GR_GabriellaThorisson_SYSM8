// src/pages/Cart.js
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
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
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, hasItems } =
    useCart();
  const { token } = useAuth(); // Lägg till auth
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // useEffect för att auto-fylla kunduppgifter om inloggad
  useEffect(() => {
    if (token) {
      // Hämta användardata från localStorage
      const savedUser = localStorage.getItem("userData");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setCustomerInfo({
          name: userData.name || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
      }
    }
  }, [token]);

  const handleUpdateQuantity = (itemIndex, newQuantity) => {
    updateQuantity(itemIndex, newQuantity);
  };

  const handleRemoveItem = (itemIndex) => {
    removeFromCart(itemIndex);
  };

  const handleContinueToCheckout = () => {
    // Enkel validering
    if (
      !customerInfo.name.trim() ||
      !customerInfo.phone.trim() ||
      !customerInfo.address.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
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

                  {/* KUNDUPPGIFTER - 3 fält */}
                  <div className="customer-fields">
                    <h3 className="customer-fields-title">
                      {token
                        ? "Delivery Information (Pre-filled)"
                        : "Delivery Information"}
                    </h3>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={customerInfo.name}
                      onChange={(e) =>
                        handleCustomerInfoChange("name", e.target.value)
                      }
                      className="customer-input"
                      disabled={token} // Låst om inloggad
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleCustomerInfoChange("phone", e.target.value)
                      }
                      className="customer-input"
                      disabled={token} // Låst om inloggad
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address *"
                      value={customerInfo.address}
                      onChange={(e) =>
                        handleCustomerInfoChange("address", e.target.value)
                      }
                      className="customer-input"
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
