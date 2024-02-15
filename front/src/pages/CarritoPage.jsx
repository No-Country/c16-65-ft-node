
import React from 'react';

const CarritoPage = ({ carrito }) => {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((comic, index) => (
            <li key={index}>{comic.title} - ${comic.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarritoPage;
