import Stripe from "stripe";
import { cartModel } from "../models/Cart.js";

const stripe = new Stripe(
  "sk_test_51OpHNsEK8KljwIog2Ro96dbDBuvPcr2X2DKFwQpDnrK6GSBlnyEiAyE3BFOv8J6Ob1sX2MehVKqn5P00boV3odu300O2oBWoC2"
);

export const createSession = async (req, res) => {
  const user = req.body.user;
  const cartUser = await cartModel.findById(user.cart).populate("products._id");

  const lineItems = cartUser.products.map(product => {
    return {
      price_data: {
        product_data: {
          name: product._id.title,
          description: product._id.description,
        },
        currency: "usd",
        unit_amount: product._id.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "https://pagetwo.onrender.com/success",
    cancel_url: "https://pagetwo.onrender.com/cancel",
  });

  return res.json(session);
};
