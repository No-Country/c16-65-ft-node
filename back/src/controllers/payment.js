import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OpHNsEK8KljwIog2Ro96dbDBuvPcr2X2DKFwQpDnrK6GSBlnyEiAyE3BFOv8J6Ob1sX2MehVKqn5P00boV3odu300O2oBWoC2",
);

export const createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: "Comic",
            description: "Comic",
          },
          currency: "usd",
          unit_amount: 20000,
        },
        quantity: 1,
      },
      {
        price_data: {
          product_data: {
            name: "Comic 2 ",
            description: "Comic",
          },
          currency: "usd",
          unit_amount: 10000,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "/api/payment/success",
    cancel_url: "/api/payment/cancel",
  });
  return res.json(session);
};
