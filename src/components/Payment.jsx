// src/components/Payment.js
import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import "../css/Payment.css";

const Payment = ({
  cartItems,
  getTotalPrice,
  customerInfo,
  orderMessage,
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
          // Customizations borttaget helt
        })),
        total: totalWithDelivery,
        status: "confirmed", // Ändrat från "pending" till "confirmed"
        paymentMethod: paymentMethod,
        deliveryAddress: customerInfo.address,
        specialInstructions: orderMessage, // Lägg till meddelandet
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

        // Popup-meddelande med bekräftelse
        alert(
          `🎉 Order Confirmed! #${createdOrder.id}\n\n` +
            `✅ Order confirmation sent to ${customerInfo.phone}\n` +
            `🕐 Estimated delivery time: 30 minutes\n` +
            `📍 Delivery to: ${customerInfo.address}\n\n`
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

export default Payment;
