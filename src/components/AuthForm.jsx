// src/components/AuthForm.js
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  // Hämtar login-funktionen från AuthContext
  const { login } = useAuth();
  // useNavigate används för att skicka användaren till en ny sida efter inloggning
  const navigate = useNavigate();

  // State för att växla mellan login och register
  const [isLogin, setIsLogin] = useState(true);

  // useState för formulärdata (används för både login och register)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault(); // Förhindrar att sidan laddas om vid formulärskick

    try {
      // Hämta användare från JSON server
      const response = await fetch(
        `http://localhost:3001/users?email=${form.email}`
      );
      const users = await response.json();

      // Kolla om användare finns och lösenord stämmer
      if (users.length === 0) {
        throw new Error("Användare hittades inte");
      }

      const user = users[0];
      if (user.password !== form.password) {
        throw new Error("Fel lösenord");
      }

      // Skapa token och spara i AuthContext
      const token = `token_${user.id}`;
      login(token);

      // Skicka användaren vidare
      navigate("/order");
    } catch (error) {
      alert("Inloggning misslyckades: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Förhindrar att sidan laddas om vid formulärskick

    try {
      // Kolla om email redan finns
      const existingResponse = await fetch(
        `http://localhost:3001/users?email=${form.email}`
      );
      const existingUsers = await existingResponse.json();

      if (existingUsers.length > 0) {
        throw new Error("Email redan registrerad");
      }

      // Skapa ny användare i JSON server
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Kunde inte skapa användare");
      }

      const createdUser = await response.json();

      // Logga in användaren direkt efter registrering
      const token = `token_${createdUser.id}`;
      login(token);

      // Skicka användaren vidare
      navigate("/order");
    } catch (error) {
      alert("Registrering misslyckades: " + error.message);
    }
  };

  // Funktion för att växla mellan login och register
  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Rensa formuläret när man växlar
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Logga in" : "Registrera dig"}</h2>

      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        {/* Visar bara namn, telefon och adress om det är registrering */}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Namn"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Telefonnummer"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Adress"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </>
        )}

        {/* Email och lösenord visas alltid */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">{isLogin ? "Logga in" : "Registrera"}</button>
      </form>

      {/* Knapp för att växla mellan login och register */}
      <p>
        {isLogin ? "Har du inget konto? " : "Har du redan ett konto? "}
        <button type="button" onClick={toggleMode} className="toggle-btn">
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
