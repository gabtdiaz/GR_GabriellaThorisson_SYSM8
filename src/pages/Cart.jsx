import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Cart.css";

// Cart Item Component - samma som innan
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

// Payment Component - uppdaterad för att ta emot kunduppgifter
const PaymentSection = ({
  cartItems,
  getTotalPrice,
  customerInfo,
  onClose,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCart();

  const totalWithDelivery = getTotalPrice() + 39;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Skapa order objekt
      const orderData = {
        userId: null, // Gästbeställning
        guestInfo: customerInfo,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customizations: item.customizations || {},
        })),
        total: totalWithDelivery,
        status: "pending",
        paymentMethod: paymentMethod,
        deliveryAddress: customerInfo.address,
        createdAt: new Date().toISOString(),
      };

      // Skicka order till JSON server
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const createdOrder = await response.json();

      // Simulera betalning
      setTimeout(() => {
        setIsProcessing(false);
        alert(
          `Order #${createdOrder.id} placed successfully! Thank you ${customerInfo.name}!`
        );
        clearCart();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Order creation failed:", error);
      setIsProcessing(false);
      alert("Ett fel uppstod vid beställningen. Försök igen.");
    }
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
        {/* Visa kunduppgifter */}
        <div className="delivery-info">
          <h3>DELIVERY TO:</h3>
          <p>
            <strong>{customerInfo.name}</strong>
          </p>
          <p>{customerInfo.address}</p>
          <p>{customerInfo.phone}</p>
        </div>

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
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

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
      alert("Vänligen fyll i alla fält för leverans");
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

                  {/* ENKLA KUNDUPPGIFTER - 3 fält */}
                  <div className="customer-fields">
                    <h3 className="customer-fields-title">
                      Delivery Information
                    </h3>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={customerInfo.name}
                      onChange={(e) =>
                        handleCustomerInfoChange("name", e.target.value)
                      }
                      className="customer-input"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleCustomerInfoChange("phone", e.target.value)
                      }
                      className="customer-input"
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

          {/* Höger sida - Payment (visas när checkout klickas) */}
          {showPayment && (
            <div className="cart-right-section">
              <PaymentSection
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
