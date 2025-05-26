import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
// import Payment from "./pages/Payment";
// import Confirmation from "./pages/Confirmation";
// import SignIn from "./pages/SignIn";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            {/* fler routes läggs till här */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
