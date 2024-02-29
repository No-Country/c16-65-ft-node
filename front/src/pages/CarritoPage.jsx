import React, { useContext } from "react";
import { Context } from "../context/Context";
import Card from "../components/card";

const CarritoPage = () => {
  const { cart } = useContext(Context);

  return (
    <div id="tarjetita" className="p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito</h1>
      <div className="flex flex-wrap -mx-4">
        <h2 className="w-full text-xl font-bold mb-2">Detalle del Carrito</h2>
        {cart.map((item) => (
          <div
            key={item._id._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
          >
            <div className="bg-white text-black rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
              <Card
                _id={item._id._id}
                title={item._id.title}
                price={item._id.price}
                thumbnail={item._id.thumbnail}
                // to={`/comic-detail/${item._id._id}`}
                backupImage="https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarritoPage;
