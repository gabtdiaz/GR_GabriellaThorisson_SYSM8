import React, { createContext, useContext, useState, useEffect } from "react";

// Skapa Context
const CartContext = createContext();

// Custom hook för att använda cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Ladda cart från localStorage när app startar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  // Spara cart till localStorage när den ändras
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Lägg till item i cart
  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      // Kolla om exakt samma item redan finns
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Öka kvantiteten på befintligt item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Lägg till som nytt item
        const newItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: quantity,
          addedAt: Date.now(),
        };
        return [...prevItems, newItem]; // Sparar listan av items med den nya uppdaterade
      }
    });
  };

  // Ta bort item från cart
  const removeFromCart = (itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndex)
    );
  };

  // Uppdatera kvaniteten för ett item
  const updateQuantity = (itemIndex, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemIndex);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity: newQuantity,
      };
      return updatedItems;
    });
  };

  // Töm hela varukorgen
  const clearCart = () => {
    setCartItems([]);
  };

  // Beräkna totalpris
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Räkna totalt antal items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Kolla om cart har items
  const hasItems = () => {
    return cartItems.length > 0;
  };

  // Värden som ska vara tillgängliga för alla komponenter
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    hasItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>; //Delar ut data till alla barnkomponenter. (Allt inom CartProvider)
};
