// src/hooks/useFavorites.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export const useFavorites = () => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Hämta favoriter när komponenten laddas
  useEffect(() => {
    if (token) {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        setFavorites(user.favorites || []);
      }
    } else {
      setFavorites([]); // Tom om ej inloggad
    }
  }, [token]);

  // Lägg till/ta bort favorit
  const toggleFavorite = async (itemId) => {
    if (!token) return; // Bara för inloggade

    const userData = JSON.parse(localStorage.getItem("userData"));
    const isCurrentlyFavorite = favorites.includes(itemId);

    let newFavorites;
    if (isCurrentlyFavorite) {
      // Ta bort från favoriter
      newFavorites = favorites.filter((id) => id !== itemId);
    } else {
      // Lägg till i favoriter
      newFavorites = [...favorites, itemId];
    }

    // Uppdatera lokalt först
    setFavorites(newFavorites);

    try {
      // Uppdatera användare i JSON server
      const updatedUser = {
        ...userData,
        favorites: newFavorites,
      };

      const response = await fetch(
        `http://localhost:3001/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        // Uppdatera localStorage
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      } else {
        // Återställ om fel
        setFavorites(favorites);
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
      // Återställ om fel
      setFavorites(favorites);
    }
  };

  // Kolla om item är favorit
  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoggedIn: !!token,
  };
};
