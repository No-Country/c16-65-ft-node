import React, { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCartAndLocalStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (item) => {
    const itemFound = cart.find((e) => e.id === item.id);

    if (itemFound) {
      const updatedCart = cart.map((e) => (e.id === item.id ? { ...e, quantity: e.quantity + 1 } : e));
      updateCartAndLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      updateCartAndLocalStorage(updatedCart);
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart
      .map((e) => (e.id === id ? { ...e, quantity: e.quantity - 1 } : e))
      .filter((e) => e.quantity > 0);
    updateCartAndLocalStorage(updatedCart);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return <Context.Provider value={{ addToCart, removeItem, cart, getTotalQuantity }}>{children}</Context.Provider>;
}
