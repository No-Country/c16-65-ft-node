
import  { useState } from "react";
import Card from '../components/card'


const CarritoPage = ({ carrito }) => {
  return (
    <div>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {carrito.map((item, index) => (
            <Card key={index} title={item.title} price={item.price} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
