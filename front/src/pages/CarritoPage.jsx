import React, { useContext } from "react";
import { Context } from "../context/Context";

const CarritoPage = () => {
  const { cart } = useContext(Context);

  const getTotalGeneral = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Función para agrupar los productos por título y sumar las cantidades
  const groupProducts = () => {
    const groupedProducts = {};
  
    cart.forEach((item) => {
      if (groupedProducts[item.title]) {
        groupedProducts[item.title].quantity += item.quantity;
      } else {
        // Usar el _id como clave para asegurar unicidad
        groupedProducts[item.title] = { ...item, _id: item._id };
      }
    });
  
    return Object.values(groupedProducts);
  };

  const groupedCart = groupProducts();

  console.log("Contenido de cart:", cart);
  // console.log('Contenido de groupedCart:', groupedCart);
  return (
    <div id="tarjetita">
      <h1>Carrito</h1>
      {groupedCart.length > 0 ? (
        <div>
          <h2>Detalle del Carrito</h2>
          {groupedCart.map((item) => (
            <div
              key={item._id}
              className="max-w-xs mx-auto mb-4 bg-slate-500 text-white rounded-md overflow-hidden"
            >
              <p>{item.title}</p>
              <img src={item.thumbnail} alt={item.title} />
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price}</p>
              <p>Total: ${item.quantity * item.price}</p>
            </div>
          ))}

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
