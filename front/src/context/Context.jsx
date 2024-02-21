

import React, { createContext, useState } from "react";

export const Context = createContext(null);



export function ContextProvider({ children }) {
    const [cart, setCart] = useState([]);
  
    const addToCart = (item) => {
      const itemFound = cart.find((e) => e.id === item.id);
  
      if (itemFound) {
        setCart((prevCart) =>
          prevCart.map((e) =>
            e.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
      }
    };
  
    const removeItem = (id) => {
      setCart((prevCart) =>
        prevCart.map((e) =>
          e.id === id ? { ...e, quantity: e.quantity - 1 } : e
        ).filter((e) => e.quantity > 0)
      );
    };
  
    const getTotalQuantity = () => {
      return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
  
    return (
      <Context.Provider value={{ addToCart, removeItem, cart, getTotalQuantity }}>
        {children}
      </Context.Provider>
    );
  }
  



