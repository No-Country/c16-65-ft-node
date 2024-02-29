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
