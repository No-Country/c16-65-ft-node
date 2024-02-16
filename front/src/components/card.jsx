

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Card({ title, image, price, addToCart }) {
  const handleAddToCart = () => {
    // Lógica para agregar al carrito, por ejemplo, llamar a una función prop "addToCart"
    addToCart({ title, price });
  };

  return (
    <div className="card bg-slate-500  w-40  flex  flex-col py-4 items-center  rounded-md text-center text-white grid-cols-2 gap-4">


      <img className="rounded-md w-20 " src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRXr3nkE519sgdrKVX1HbqumROhquqgLK6A&usqp=CAU' alt={title} />
      <h2 className="text-sm">{title}</h2>
      <p>${price}</p>
      <button className="text-white" onClick={handleAddToCart}>
        <FontAwesomeIcon icon={faShoppingCart} /> Agregar al carrito
      </button>
    </div>
  );
}

export default Card;