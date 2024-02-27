import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated == true) {
      console.log("Está autenticado");
    } else {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [isAuthenticated]);

  const updateCartAndLocalStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const groupProducts = (cartItems) => {
    const groupedProducts = {};

    cartItems.forEach((item) => {
      if (groupedProducts[item.title]) {
        groupedProducts[item.title].quantity += item.quantity;
      } else {
        groupedProducts[item.title] = { ...item };
      }
    });

    return Object.values(groupedProducts);
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

  const addToGroupedCart = (item) => {
    const updatedGroupedCart = groupProducts([...cart, item]);
    updateCartAndLocalStorage(updatedGroupedCart);
  };

  //! cambio
  const removeItem = (title) => {
    const updatedCart = cart
      .map((e) => (e.title === title ? { ...e, quantity: e.quantity - 1 } : e))
      .filter((e) => e.quantity > 0);
    updateCartAndLocalStorage(updatedCart);
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <Context.Provider value={{ addToCart, removeItem, cart, getTotalQuantity, addToGroupedCart }}>
      {children}
    </Context.Provider>
  );
}
