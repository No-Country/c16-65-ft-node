import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { CardElement, Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Card from "../components/card";

const CarritoPage = () => {
  const { cart } = useContext(Context);
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Obtener el usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Objeto de datos para enviar en la solicitud POST
    const parametros = {
      user: user,
      // Otros datos que quieras enviar
    };

    try {
      const { data } = await axios.post(
        "https://no-country-cwv9.onrender.com/api/payment/create-checkout-session",
        parametros
      );
      console.log(parametros, "params");
      console.log("hola");

      // Redirigir al usuario a la URL de la sesión de pago
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const totalGeneral = cart.reduce((total, item) => total + item._id.price, 0);
  
  return (
    <div id="tarjetita" className="p-4">
      <div className="container_c flex flex-wrap -mx-4">
        <h2 className="w-full text-xl font-bold mb-2">Purchase detail</h2>
        {cart.map((item) => (
          <div key={item._id._id} className=" sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
            <div className="bg-white text-black rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
              <Card
                _id={item._id._id}
                title={item._id.title}
                price={item._id.price}
                thumbnail={item._id.thumbnail}
                backupImage="https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg"
              />
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="card-body rounded-lg ">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full" disabled={!stripe}>
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Buy"
            )}
          </button>
        </form>
        <div className="w-full mt-4 text-right text-xl font-bold">
          Total: ${totalGeneral.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
