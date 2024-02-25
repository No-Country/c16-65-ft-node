import React, { useContext, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

function Card({ _id, title, price, thumbnail, to }) {
  const { addToCart, removeItem } = useContext(Context);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id: _id, title, price, thumbnail });
  };
   


  const handleRemoveFromCart = () => {
    removeItem(_id); // Usar _id directamente para eliminar el elemento
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="max-w-xs mx-auto mb-4 bg-slate-500 text-white rounded-md overflow-hidden">
      <Link to={to}>
        <img
          className="w-full"
          src={imageError ? "https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg" : thumbnail}
          alt={title}
          onError={handleImageError}
        />
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
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;





// import React, { useContext, useState } from "react";
// import { FaCartPlus } from "react-icons/fa";
// import { RiSubtractFill } from "react-icons/ri";
// import { Context } from "../context/Context";
// import { Link } from "react-router-dom";

// function Card({ id,title, price, thumbnail, to }) {
//   const { addToCart, removeItem } = useContext(Context);
//   const [imageError, setImageError] = useState(false);

//   const handleAddToCart = () => {
//     addToCart({ id , title, price , thumbnail }); //! Merojar la funcion 


//   };

//   const handleRemoveFromCart = () => {
//     removeItem(title);
//   };

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   return (
//     <div className="max-w-xs mx-auto mb-4 bg-slate-500 text-white rounded-md overflow-hidden">
//       <Link to={to}>
//         <img
//           className="w-full"
//           src={imageError ? "https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg" : thumbnail}
//           alt={title}
//           onError={handleImageError}
//         />
//       </Link>

//       <div className="p-4 text-center">
//         <h2 className="text-sm">{title}</h2>
//         <p className="font-bold">${price}</p>
//         <div className="flex justify-center mt-2 space-x-2">
//           <button
//             className="text-white border border-solid border-black p-2 rounded"
//             onClick={handleRemoveFromCart}
//           >
//             <RiSubtractFill />
//           </button>

//           <button className="text-white p-2 rounded" onClick={handleAddToCart}>
//             <FaCartPlus />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
