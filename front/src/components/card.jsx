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

    <div className="card">
      <Link to={to}>
        <div>
        <div className="card-image">
          <img
            className=""
            src={imageError ? backupImage : thumbnail || backupImage}
            alt={title}
            onError={handleImageError}
          />
        </div>
        </div>
      </Link>

      <div>
        <h2 >{title}</h2>
        <p >${price}</p>
        <div >
          <button
            onClick={handleRemoveFromCart}
          >
            <RiSubtractFill />
          </button>
          <button onClick={handleAddToCart}>
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
