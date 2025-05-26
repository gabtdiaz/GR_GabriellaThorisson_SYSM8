import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Cart.css";

// Cart Item Component - för vänster sida
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
            -
          </button>

          <span className="cart-quantity-number">{item.quantity}</span>

          <button className="cart-plus-btn" onClick={handleQuantityIncrease}>
            +
          </button>
        </div>

        {/* Pris */}
        <div className="cart-price-section">
          <span className="cart-product-price">
            {item.price * item.quantity} SEK
          </span>
        </div>

        {/* Ta bort knapp */}
        <button className="cart-delete-btn" onClick={handleRemoveItem}>
          <img src="/trashcan.png" alt="Ta bort" />
        </button>
      </div>
    </article>
  );
};

// Payment Component - för höger sida (när checkout är aktivt)
const PaymentSection = ({ cartItems, getTotalPrice, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Beräkna totalpris live (inklusive leverans)
  const totalWithDelivery = getTotalPrice() + 49;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulera betalning
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment Successful! Thank you for your order!");
      onClose();
    }, 2000);
  };

  return (
    <div className="payment-section">
      <div className="payment-header">
        <h2 className="payment-title">PAYMENT</h2>
        <button className="payment-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="payment-content">
        <div className="payment-summary">
          <h3>ORDER SUMMARY</h3>
          <div className="summary-row">
            <span>Products ({cartItems.length})</span>
            <span>{getTotalPrice()} SEK</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>39 SEK</span>
          </div>
          <div className="payment-total">
            <span>Total price:</span>
            <strong>{totalWithDelivery} SEK</strong>
          </div>
        </div>

        <div className="payment-methods">
          <h3>CHOOSE PAYMENT METHOD</h3>
          <label className="payment-option">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Card
          </label>
          <label className="payment-option">
            <input
              type="radio"
              value="swish"
              checked={paymentMethod === "swish"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            📱 Swish
          </label>
        </div>

        <div className="payment-form">
          {paymentMethod === "card" && (
            <div className="card-form">
              <input type="text" placeholder="Card number" />
              <div className="card-details">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVC" />
              </div>
              <input type="text" placeholder="Cardholder name" />
            </div>
          )}

          {paymentMethod === "swish" && (
            <div className="swish-form">
              <input type="tel" placeholder="Phone number" />
            </div>
          )}
        </div>

        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay ${totalWithDelivery} SEK`}
        </button>
      </div>
    </div>
  );
};

// Huvudkomponent för Cart-sidan
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, hasItems } =
    useCart();

  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const handleUpdateQuantity = (itemIndex, newQuantity) => {
    updateQuantity(itemIndex, newQuantity);
  };

  const handleRemoveItem = (itemIndex) => {
    removeFromCart(itemIndex);
  };

  const handleContinueToCheckout = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
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
              <h1 className="cart-page-title">Your cart</h1>
              <button className="cart-back-link" onClick={handleGoBack}>
                ← Go Back
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
                      <strong>{getTotalPrice() + 49} SEK</strong>
                    </div>
                  </div>

                  <button
                    className="cart-checkout-button"
                    onClick={handleContinueToCheckout}
                  >
                    Continue to Checkout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Höger sida - Payment (visas när checkout klickas) */}
          {showPayment && (
            <div className="cart-right-section">
              <PaymentSection
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
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
