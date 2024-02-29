import { useContext, useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
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
        <div className="card-image-container">
          <img
            className="card-image"
            src={imageError ? backupImage : thumbnail || backupImage}
            alt={title}
            onError={handleImageError}
          />
        </div>
        </div>
      </Link>

      <div className="p-4 text-center">
        <h2 className="text-sm">{title}</h2>
        <p className="font-bold">${price}</p>
        <div className="flex justify-center mt-2 space-x-2">
          {showAddToCart && (
            <button
              className="text-black border border-solid border-black p-2 rounded"
              onClick={handleRemoveFromCart}
            >
              <RiSubtractFill />
            </button>
          )}
          {showAddToCart ? (
            <button
              className="text-black p-2 rounded"
              onClick={handleAddToCart}
            >
              <Link>
                <FaCartPlus />
              </Link>
            </button>
          ) : (
            <div>Login to add to cart</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
