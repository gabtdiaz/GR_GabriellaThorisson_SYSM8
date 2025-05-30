import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// En komponent som fungerar som provider och delar med sig av auth-data till resten av appen
export const AuthProvider = ({ children }) => {
  // Skapar ett state för token, initialt hämtad från localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Funktion som används för att logga in anv och spara token i localStorage
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    setToken(newToken);
  };

  // Funktion som använda för att logga ut användaren och ta bort token
  const logout = () => {
    localStorage.removeItem("token"); // Ta bort token från localStorage
    localStorage.removeItem("userData"); // Ta bort userData från localStorage
    setToken(null); // Nollställ token i state
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children} {/* Renderar alla komponenter som är barn till AuthProvider */}
    </AuthContext.Provider>
  );
};

// Custom hook för att använda AuthContext i komponenter
export const useAuth = () => {
  const context = useContext(AuthContext); // Hämtar kontextens aktuella värde
  if (!context) {
    // Kastar fel om hooken används utanför en AuthProvider
    throw new Error("useAuth måste användas inom en <AuthProvider>");
  }
  return context; // Returnerar kontextens innehåll (token,login,logout)
};
