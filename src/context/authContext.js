import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || null);

  // funktion för att logga in användare
  const login = async (email, password) => {
    try {
      // Hämta användare från JSON server baserat på email
      const response = await fetch(
        `http://localhost:3001/users?email=${email}`
        const users = await response.json();
