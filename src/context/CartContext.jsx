'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};