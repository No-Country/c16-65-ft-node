import React, { useContext, useState, useEffect} from "react";
import { FaCartPlus} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import LoginButton from "../util/LoginButton";
import logo from "../assets/logo.png"
import { useAuth0 } from "@auth0/auth0-react";
import "../components/navbar.css"

const Navbar = () => {
  const { getTotalQuantity } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
 

  const quantity = getTotalQuantity();


  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if(isAuthenticated){
      setShowAddToCart(true)
    }else{
      const userFromLocalStorage = JSON.parse
      (localStorage.getItem("user"));
      if (userFromLocalStorage && userFromLocalStorage.cart) {
        setShowAddToCart(true);
      
    }
  }
  },[isAuthenticated])
  

  const toggleMenu = () =>{
    setIsOpen((open) => !open)
  }

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <nav className="nav-header">
      <div className="navbar navbar-container">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt=""  className="navbar-logo"/>
        </Link>
        <ul className={`nav-header_menuItems ${isOpen ? "is-open": ""}`}>
            <div className="navbar-links">
              { showAddToCart ?(
            <li >
              <Link to="/carrito" onClick={closeMenu}>
                <FaCartPlus />
                <samp>{quantity}</samp>{""}
            </Link>
            </li>

              ): null }
            <li className="login-button" onClick={closeMenu}>
              <LoginButton />
            </li>
            </div>
          </ul>
        <li className="nav-header-trigger" onClick={toggleMenu}><TiThMenu /></li>
      </div>
    </nav>
  );
};

export default Navbar;
