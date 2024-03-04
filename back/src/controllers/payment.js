import Stripe from "stripe";
import { cartModel } from "../models/Cart.js";
import axios from 'axios';

const makePostRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

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
    success_url: "https://no-country-cwv9.onrender.com/api/payment/success",
    cancel_url: "https://no-country-cwv9.onrender.com/api/payment/cancel",
  });

  if (session) {
    if (session.payment_status === 'paid') {
      const postData = {
        email: user.email
      };
      await makePostRequest('/api/purchases/create', postData);
    }
    return res.json(session);
  } else {
    return res.status(500).json({
      status: "Error",
      message: "Error al crear la sesión de pago",
    });
  }

  // return res.json(session);
};
