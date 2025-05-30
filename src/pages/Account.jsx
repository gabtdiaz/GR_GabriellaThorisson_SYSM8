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

  return (
    <div className="account-page">
      <Header />

      <main className="account-main">
        <div className="account-container">
          <h1>My Account</h1>

          {/* Användarinfo */}
          <section className="user-info-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{user.phone}</span>
              </div>
              <div className="info-item">
                <label>Address:</label>
                <span>{user.address}</span>
              </div>
            </div>
          </section>

          {/* Beställningshistorik */}
          <section className="orders-section">
            <h2>Order History</h2>
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't made any orders yet.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/order")}
                >
                  Order Now
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleDateString("sv-SE")}
                      </span>
                      <span className={`order-status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>{item.price * item.quantity} SEK</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-total">
                      <strong>Total: {order.total} SEK</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Konto-åtgärder */}
          <section className="account-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/order")}
            >
              Order Food
            </button>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
