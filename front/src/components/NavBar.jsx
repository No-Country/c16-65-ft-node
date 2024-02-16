import React from "react";
import { Link } from "react-router-dom"; // Importa Link si estás usando react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar ">
      <div className="container flex justify-between">
        {/* Logo */}
        <h1 className="navbar-logo text-2xl">ComicShop</h1>

        {/* Enlaces de navegación */}
        <ul className="navbar-links flex   ">
          <li className="px-5 "></li>
          <li className="px-5">
            <a>Cómics</a>
          </li>
          <li className="px-5">
            <a href="https://platzi.com/">Ofertas</a>
          </li>
          <li className="px-5">
            <Link to="/2"> Carrito </Link>
          </li>
        </ul>
      </div>

      <hr />
    </nav>
  );
};

export default Navbar;
