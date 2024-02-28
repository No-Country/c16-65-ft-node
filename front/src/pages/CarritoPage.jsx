import React, { useContext } from "react";
import { Context } from "../context/Context";
import Card from "../components/card";

const CarritoPage = () => {
  const { cart } = useContext(Context);
  console.log(cart)
  const comics = (cart) => {
    cart.forEach(comic => {
      console.log(comic.title)
    });
  }
  comics(cart)
  // const groupProducts = (cartItems) => {
  //   const groupedProducts = {};

  //   cartItems.forEach((item) => {
  //     if (groupedProducts[item.title]) {
  //       groupedProducts[item.title].quantity += item.quantity;
  //     } else {
  //       groupedProducts[item.title] = { ...item };
  //     }
  //   });

  //   return Object.values(groupedProducts);
  // };

  // const groupedCart = groupProducts(cart);

  // const getTotalGeneral = () => {
  //   return groupedCart.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   );
  // };

  return (
    <div>
      <span>{cart.length}</span>
    </div>
    // <div id="tarjetita" className="p-4">
    //   <h1 className="text-3xl font-bold mb-4">Carrito</h1>
    //   {groupedCart.length > 0 ? (
    //     <div className="flex flex-wrap -mx-4">
    //       <h2 className="w-full text-xl font-bold mb-2">Detalle del Carrito</h2>
    //       {groupedCart.map((item) => (
    //         <div
    //           key={item._id}
    //           className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
    //         >
    //           <div className="bg-white text-black rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
    //             <Card
    //               _id={item._id}
    //               title={item.title}
    //               price={item.price}
    //               thumbnail={item.thumbnail}
    //               // to={`/comic-detail/${item._id}`}
    //               backupImage="https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg"
    //             />
    //             <p className="text-center">Cantidad: {item.quantity}</p>
    //             <p className="text-center">
    //               Total: ${item.quantity * item.price}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //       <div className="w-full">
    //         <p className="font-bold text-xl mt-4">
    //           Total General: ${getTotalGeneral()}
    //         </p>
    //       </div>
    //     </div>
    //   ) : (
    //     <p className="text-xl">El carrito está vacío</p>
    //   )}
    // </div>
  );
};

export default CarritoPage;
