// src/pages/SignIn.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthForm from "../components/AuthForm";

const SignIn = () => {
  return (
    <div className="signin-page">
      <Header />

      <main className="signin-main">
        <div className="signin-container">
          <AuthForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
