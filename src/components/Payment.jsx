import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import "./Payment.css";

const Payment = ({ cartItems, getTotalPrice, customerInfo, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("card"); // Sätter kort som standard
  const [isProcessing, setIsProcessing] = useState(false); // För att hantera simulering av betalning
  const { clearCart } = useCart(); // Importerar clearCart från cartContext

  const totalWithDelivery = getTotalPrice() + 39; // Lägger till leveransavgift

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const orderData = {
        userId: null, // Gästorder
        guestInfo: customerInfo,
        items: cartItems.map((item) => ({
          // Loopar genom cartItems
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalWithDelivery,
        paymentMethod: paymentMethod,
        deliveryAddress: customerInfo.address,
        createdAt: new Date().toISOString(), // Skapar en tidsstämpel
      };

      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData), //
      });
      if (!response.ok) {
        throw new Error("Failed to process payment");
      }

      const createOrder = await response.json();

      // Simulera betalning
      setTimeout(() => {
        setIsProcessing(false); //Först processas betalning
        alert(
          `Order #${createOrder.id} placed! Thank you ${customerInfo.name}!`
        ); //Får bekräftelsemeddelande
        clearCart(); // Tömmer varukorgen
        onClose();
      }, 2000); // Simulera 2 sekunders betalningstid
    } catch (error) {
      console.error("Payment error: ", error);
      setIsProcessing(false);
      alert(
        "An error occurred while processing your payment. Please try again later."
      );
    }
  };
};

// Här ska komponenten returneras.
