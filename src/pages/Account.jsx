import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Account.css";

const Account = () => {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Redirecta om man inte är iloggad
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        // Hämta användardata från localStorage
        const savedUser = localStorage.getItem("userData");

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);

          // Hämta användarens beställningar
          const orders = await fetch(
            `http://localhost:3001/orders?userId=${userData.id}`
          );
          const userOrders = await orders.json();
          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return <div></div>;
};

export default Account;
