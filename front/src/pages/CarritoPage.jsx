import React, { useContext } from "react";
import { Context } from "../context/Context";
import "./carrito.css";

const CarritoPage = () => {
  const { cart } = useContext(Context);
  const getTotalGeneral = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div id="tarjetita">
      <h1>Carrito</h1>
      {cart.length > 0 ? (
        <div>
          <h2>Detalle del Carrito</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div>
                  <img src={item.image} alt={item.title} />
                  <p>{item.id}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price}</p>
                  <p>Total: ${item.quantity * item.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <p>Total General: ${getTotalGeneral()}</p>
          </div>
        </div>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default CarritoPage;
