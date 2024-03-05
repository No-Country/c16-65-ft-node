import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

import "bootswatch/dist/Lux/bootstrap.min.css";
import Card from "../components/card";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      try {
        const { id } = paymentMethod;

        const { data } = await axios.post(
          "https://no-country-cwv9.onrender.com/api/payment/create-checkout-session",
          {
            id,
            amount: 10000,
            user,
          }
        );

        console.log(data);

        // Redirigir al usuario a la URL de la sesión de pago
        window.location.href = data.url;

        // Limpiar el elemento de la tarjeta después de la redirección
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className="card card-body">
              <img
                src="https://c8.alamy.com/compes/2a70tc9/vintage-comic-1940s-american-ww2-batman-propaganda-comico-no15-ficticio-super-hero-batman-y-robin-ilustro-disparar-una-ametralladora-mantener-esas-balas-volando-seguir-comprando-bonos-de-guerra-y-sellos-10c-precio-etiqueta-ee-uu-segunda-guerra-mundial-2a70tc9.jpg"
                alt="TEST"
                className="img-fluid"
              />
              <div className="form-group">
                <CardElement className="form-control" />
              </div>
              <button className="btn btn-success" disabled={!stripe}>
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Buy"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
