import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";

import "bootswatch/dist/Lux/bootstrap.min.css";

const stripePromise = loadStripe(
  "pk_test_51OpHNsEK8KljwIogktpC8S5E3yFdAeMRCEpfFz7tFFII2DkmXF4P2levpNDuCkAf98JEvKBGq9axLh9npk67fBT600pDXU35KU"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <>
      <Elements stripe={stripePromise}>
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
                <button className="btn btn-success">Buy</button>
              </form>
            </div>
          </div>
        </div>
      </Elements>
    </>
  );
};

export default CheckoutForm;
