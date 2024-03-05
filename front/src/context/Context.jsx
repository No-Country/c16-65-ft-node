import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCart, addProductCart, deleteProductCart } from "../api/post.api";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userLocal, setUserLocal] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  let currentUser = isAuthenticated ? user : userLocal;

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (!isAuthenticated && userFromLocalStorage) {
      // Si el usuario recuperado del almacenamiento local no tiene la propiedad 'cart', inicialízala como un objeto vacío
      setUserLocal(
        userFromLocalStorage.cart
          ? userFromLocalStorage
          : { ...userFromLocalStorage, cart: {} }
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        let currentUser = isAuthenticated ? user : userLocal;
        if (currentUser) {
          const response = await getCart(currentUser.email);
          const cartData = response.cart.products;
          setCart(cartData);
        } else {
          const storedCart = localStorage.getItem("cart");
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, [isAuthenticated, user, userLocal]);

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
    // Si está autenticado uso el carrito del Back (DB)

    // Si no está autenticado uso el carrito del local storage

    if (itemFound) {
      const updatedCart = cart.map((e) =>
        e.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
      );
      updateCartAndLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      updateCartAndLocalStorage(updatedCart);
    }
  };

  const addToGroupedCart = async (item) => {
    // console.log(item._id);
    await addProductCart(currentUser.cart, item._id);
    // console.log(item, "hola");
  };

  //! cambio
  const removeItem = (pid) => {
    // const updatedCart = cart
    //   .map((e) => (e.title === title ? { ...e, quantity: e.quantity - 1 } : e))
    //   .filter((e) => e.quantity > 0);
    // updateCartAndLocalStorage(updatedCart);
    deleteProductCart(currentUser.cart, pid);
  };

  // const getTotalQuantity = () => {
  //   return cart.reduce((acc, item) => acc + item.quantity, 0);
  // };
  const getTotalQuantity = () => {
    return cart.length;
  };

  return (
    <Context.Provider
      value={{
        addToCart,
        removeItem,
        cart,
        getTotalQuantity,
        addToGroupedCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}
