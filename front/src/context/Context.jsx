import React, { createContext, useState} from "react";

export const Context = createContext(null);



export function ContextProvider({ children }) {



  const [cart, setCart] = useState([]);



  const addToCart = (item) => {
    const itemFound = cart.find((e) => e._id === item._id);
  
    if (itemFound) {
      setCart((prevCart) =>
        prevCart.map((e) =>
          e._id === item._id ? { ...e, quantity: e.quantity + 1 } : e
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1, id: item._id }]);
    }
  };





  const removeItem = (_id) => {
    setCart((prevCart) =>
      prevCart
        .map((e) => (e._id === _id ? { ...e, quantity: e.quantity - 1 } : e))
        .filter((e) => e.quantity > 0)
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




