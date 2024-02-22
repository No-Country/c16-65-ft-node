import React, { useContext } from "react";
import { FaSearch, FaHome, FaCartPlus } from "react-icons/fa";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import LoginButton from "../util/LoginButton";

const Navbar = () => {
  const { getTotalQuantity } = useContext(Context);

  const quantity = getTotalQuantity();

  return (
    <nav className="navbar">
      <div className="container flex justify-between">
        {/* Logo */}
        <h1 className="navbar-logo text-2xl">ComicShop</h1>

        {/* Enlaces de navegación */}
        <ul className="navbar-links flex">
          <li className="px-5"></li>
          <li className="px-5">
            <Link to="/home">
              <FaHome />
            </Link>
          </li>
          <li className="px-5">
            <Link to="/search">
              <FaSearch />
            </Link>
          </li>
          <li className="px-5">
            <Link to="/carrito" className="flex py-1">
              <FaCartPlus /> <samp>{quantity}</samp>{" "}
            </Link>
          </li>
          <li className="px-5">
            <LoginButton />
          </li>
        </ul>
      </div>

      <hr />
    </nav>
  );
};

export default Navbar;
