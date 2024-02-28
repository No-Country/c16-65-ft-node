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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/carrito" element={<CarritoPage />} />
      <Route path="/comic-detail/:comicId" element={<ComicDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/form" element={<FormCreate />} />
      <Route path="*" element={<Notfound />} />
      <Route path="/edit" element={<EditComic />} />
    </Routes>
  );
};

export default AppRoutes;
