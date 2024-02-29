import React, { useContext } from "react";
import { FaSearch, FaHome, FaCartPlus } from "react-icons/fa";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import LoginButton from "../util/LoginButton";
import logo from "../assets/logo.png"

const Navbar = () => {
  const { getTotalQuantity } = useContext(Context);

  const quantity = getTotalQuantity();

  return (
    <nav >
      <div className="navbar navbar-container">
          <img src={logo} alt=""  className="navbar-logo"/>
        {/* Enlaces de navegación */}
        <ul className="navbar-links">
          <li >
            <Link to="/">
              <FaHome />
            </Link>
          </li>
          <li >
            <Link to="/search">
              <FaSearch />
            </Link>
          </li>
          <li >
            <Link to="/carrito" className="">
              <FaCartPlus /> <samp>{quantity}</samp>{" "}
            </Link>
          </li>
          <li >
            <LoginButton />
          </li>
        </ul>
      </div>

      <hr />
    </nav>
  );
};

export default Navbar;
