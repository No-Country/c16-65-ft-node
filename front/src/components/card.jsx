import React, { useContext, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { RiSubtractFill } from 'react-icons/ri';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';

function Card({ _id, title, price, thumbnail, to, backupImage }) {
  const { addToGroupedCart, removeItem } = useContext(Context);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToGroupedCart({ _id, title, price, thumbnail, quantity: 1 });
  };

  const handleRemoveFromCart = () => {
    removeItem(title);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="max-w-xs mx-auto mb-4 bg-slate-500 text-white rounded-md overflow-hidden">
      <Link to={to}>
        <div className="w-full h-32 object-cover flex justify-center m-2">
          <img
            className="w-50 h-full bg-cover rounded-md"
            src={imageError ? backupImage : thumbnail || backupImage}
            alt={title}
            onError={handleImageError}
          />
        </div>
      </Link>

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
            <Link >
              <FaCartPlus />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
