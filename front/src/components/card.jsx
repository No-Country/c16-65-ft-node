

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Card({ title, image, price, addToCart }) {
  const handleAddToCart = () => {
    // Lógica para agregar al carrito, por ejemplo, llamar a una función prop "addToCart"
    addToCart({ title, price });
  };

  return (
    <div className="card bg-slate-500 justify-center rounded-md text-center text-white grid-cols-2 gap-4">
      <img className="rounded-md w-20" src='https://www.cnet.com/a/img/resize/95069a632034ea8e75d5518755387b6f28be75ec/hub/2010/07/09/60de24d9-fdc3-11e2-8c7c-d4ae52e62bcc/magneto03.jpg?auto=webp&width=1200' alt={title} />
      <h2 className="text-sm">{title}</h2>
      <p>${price}</p>
      <button className="text-white" onClick={handleAddToCart}>
        <FontAwesomeIcon icon={faShoppingCart} /> Agregar al carrito
      </button>
    </div>
  );
}

export default Card;