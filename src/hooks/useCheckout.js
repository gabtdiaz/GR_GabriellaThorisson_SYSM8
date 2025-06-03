import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export const useCheckout = () => {
  const { token } = useAuth();

  // States för checkout
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [orderMessage, setOrderMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Autoifyllning av användardata om man är inloggad
  useEffect(() => {
    if (token) {
      // Om användaren är inloggad
      const savedUser = localStorage.getItem("userData");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setCustomerInfo({
          name: userData.name || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
        setIsEditing(false); // Låser formuläret
      }
    } else {
      setIsEditing(true); // Öppnar formuläret
    }
  }, [token]);

  // Funktioner för checkout
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinueToCheckout = () => {
    // Validering
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

  // Returnera allt som komponenten behöver
  return {
    customerInfo,
    orderMessage,
    isEditing,
    showPayment,
    setOrderMessage,
    setIsEditing,
    handleCustomerInfoChange,
    handleContinueToCheckout,
    handleClosePayment,
  };
};
