'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component that wraps the app and provides cart functionality
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cart, setCart] = useState([]);

  // Effect to load the cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Effect to save the cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (productId) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        // If it exists, update the quantity
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it does not exist, add a new item with quantity 1
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  // Function to update the quantity of a specific item in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to get the total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Provide cart state and functions to the children components
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
