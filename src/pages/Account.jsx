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

    const fetchUserData = async () => {};
  });
};

export default Account;
