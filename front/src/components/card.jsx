import { useContext, useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { RiSubtractFill } from 'react-icons/ri';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Card({ _id, title, price, thumbnail, to, backupImage }) {
  const { addToGroupedCart, removeItem } = useContext(Context);
  const [imageError, setImageError] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setShowAddToCart(true); // Si el usuario está autenticado, mostrar el botón
    } else {
      // Si el usuario no está autenticado, comprobar si hay un usuario local en el almacenamiento
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage && userFromLocalStorage.cart) {
        setShowAddToCart(true); // Si hay un usuario local con un carrito, mostrar el botón
      }
    }
  }, [isAuthenticated]);

  const handleAddToCart = () => {
    addToGroupedCart({ _id, title, price, thumbnail, quantity: 1 });
  };

  const handleRemoveFromCart = () => {
    removeItem(_id);
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
          {showAddToCart && (
            <button className="text-white p-2 rounded" onClick={handleAddToCart}>
              <Link >
                <FaCartPlus />
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
