// src/pages/Cart.jsx - enkel page version
import React from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {
  const { cartItems, getTotalPrice, hasItems } = useCart();
  const navigate = useNavigate();

  if (!hasItems()) {
    return (
      <div>
        <Header />
        <div style={{ padding: "120px 20px", textAlign: "center" }}>
          <h2>Din varukorg är tom</h2>
          <button onClick={() => navigate("/order")}>Fortsätt handla</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={{ padding: "120px 20px" }}>
        <h1>Varukorg</h1>
        {cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              margin: "10px 0",
            }}
          >
            <h3>{item.name}</h3>
            <p>Antal: {item.quantity}</p>
            <p>Pris: {item.price} SEK</p>
          </div>
        ))}
        <h2>Total: {getTotalPrice()} SEK</h2>
        <button onClick={() => alert("Checkout kommer snart!")}>
          Checkout
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
