import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Cart from "./pages/Cart";
// import Payment from "./pages/Payment";
// import Confirmation from "./pages/Confirmation";
// import SignIn from "./pages/SignIn";
import "./App.css";

function App() {
  return (
    //<CartProvider>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/signin" element={<SignIn />} /> */}
        </Routes>
      </div>
    </Router>
    //</CartProvider>
  );
}

export default App;
