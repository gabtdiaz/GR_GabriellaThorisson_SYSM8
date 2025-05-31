// src/pages/Account.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Account.css";

const Account = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    // Redirect om inte inloggad
    if (!token) {
      navigate("/signin");
      return;
    }

    // Hämta användardata från localStorage
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setEditedUser(userData);

      // Hämta beställningar
      fetchOrders(userData.id);
    }
  }, [token, navigate]);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/orders?userId=${userId}`
      );
      const userOrders = await response.json();
      setOrders(userOrders);
    } catch (error) {
      console.error("Error while fetching orders:", error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      // Avbryt editing - återställ till original värden
      setEditedUser(user);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      // Uppdatera användare i JSON server
      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setIsEditing(false);
        alert("Information updated successfully!");
      }
    } catch (error) {
      console.error("Kunde inte uppdatera:", error);
      alert("Failed to update information");
    }
  };

  // Om ingen user data, visa ingenting (redirect sker i useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="account-page">
      <Header />

      <main className="account-main">
        <div className="account-container">
          {/* Användarinfo */}
          <section className="user-info-section">
            <div className="section-header">
              <h2>PERSONAL INFORMATION</h2>
              <div className="edit-buttons">
                {isEditing ? (
                  <>
                    <button className="btn btn-primary" onClick={saveChanges}>
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={toggleEditing}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-secondary" onClick={toggleEditing}>
                    EDIT
                  </button>
                )}
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span>{user.name || "N/A"}</span>
                )}
              </div>

              <div className="info-item">
                <label>Email:</label>
                <span>{user.email || "N/A"}</span>
              </div>

              <div className="info-item">
                <label>Phone:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedUser.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span>{user.phone || "N/A"}</span>
                )}
              </div>

              <div className="info-item">
                <label>Address:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.address || ""}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <span>{user.address || "N/A"}</span>
                )}
              </div>
            </div>
          </section>

          {/* Beställningshistorik */}
          <section className="orders-section">
            <h2>ORDER HISTORY</h2>
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't made any orders yet.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/order")}
                >
                  ORDER NOW
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
              ORDER
            </button>
            <button className="btn btn-secondary" onClick={handleLogout}>
              LOGOUT
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
