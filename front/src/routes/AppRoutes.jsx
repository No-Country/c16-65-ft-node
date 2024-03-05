import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CarritoPage from "../pages/CarritoPage";
import Search from "../pages/Search";
import Notfound from "../pages/Notfound";
import FormCreate from "../pages/FormCreate";
import Products from "../pages/Products";
import ComicDetail from "../components/ComicDetail";
import EditComic from "../pages/EditComic";
import Profile from "../pages/Profile";
import PaymentSuccess from "../pages/PaymentSuccess";
// import CheckoutForm from "../pages/CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51OpHNsEK8KljwIogktpC8S5E3yFdAeMRCEpfFz7tFFII2DkmXF4P2levpNDuCkAf98JEvKBGq9axLh9npk67fBT600pDXU35KU"
// );

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/carrito" element={<CarritoPage />} />
      <Route path="/comic-detail/:comicId" element={<ComicDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/form" element={<FormCreate />} />
      <Route path="/edit" element={<EditComic />} />
      <Route path="/success" element={<PaymentSuccess />} />
      {/* <Route
        path="/checkout"
        element={
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        }
      /> */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AppRoutes;
