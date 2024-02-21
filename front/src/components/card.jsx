import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { Context } from "../context/Context"


function Card({ title, price }) {
  const { addToCart, removeItem } = useContext(Context);

  const handleAddToCart = () => {
    addToCart({ id: title, price });
  };


  const handleRemoveFromCart = () => {
    removeItem(title); // Utiliza el título (u otra propiedad única) para identificar el producto
  };

  return (
    <div className="max-w-xs mx-auto mb-4 bg-slate-500 text-white rounded-md overflow-hidden">
   
        <img className="w-full" src="https://storage.googleapis.com/hipcomic/p/d763a667649efd0794c739cf84d05fb5-800.jpg" alt={title} />

      <div className="p-4 text-center">
        <h2 className="text-sm">{title}</h2>
        <p className="font-bold">${price}</p>
        <div className="flex justify-center mt-2 space-x-2">
          <button
            className="text-white border border-solid border-black p-2 rounded"
            onClick={handleRemoveFromCart}
          >
            <RiSubtractFill />
          </button>
          
          <button className="text-white p-2 rounded" onClick={handleAddToCart}>
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

