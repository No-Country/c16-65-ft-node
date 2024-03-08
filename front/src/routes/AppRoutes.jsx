import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CarritoPage from "../pages/CarritoPage";
import Notfound from "../pages/Notfound";
import Products from "../pages/Products";
import ComicDetail from "../components/ComicDetail";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import PaymentSuccess from "../pages/PaymentSuccess";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/carrito" element={<CarritoPage />} />
      <Route path="/comic-detail/:comicId" element={<ComicDetail />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="*" element={<Notfound />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
