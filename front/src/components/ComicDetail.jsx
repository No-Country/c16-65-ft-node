import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useAuth0 } from "@auth0/auth0-react";

const ComicDetail = ({ _id, backupImage }) => {
  const { addToGroupedCart } = useContext(Context);
  const [comic, setComic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const handleImageError = (e) => {
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg";
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowAddToCart(true); // Si el usuario está autenticado, mostrar el botón
    } else {
      // Si el usuario no está autenticado, comprobar si hay un usuario local en el almacenamiento
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage && userFromLocalStorage.cart) {
        setShowAddToCart(true); // Si hay un usuario local con un carrito, mostrar el botón
      }
    }
  }, [isAuthenticated]);

  const { comicId } = useParams();

  const handleAddToCart = () => {
    addToGroupedCart({ _id: comicId });
  };

  useEffect(() => {
    fetch(`https://no-country-cwv9.onrender.com/api/comics/${comicId}`)
      .then((response) => response.json())
      .then((data) => {
        setComic(data.oneComic);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [comicId]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <Link to="/products">
            <button className="button">BACK</button>
          </Link>
          <div className="card-detail-container flex flex-col mt-8 p-4 bg-white rounded shadow-lg md:flex-row">
            <div className="thumbnail mb-4 md:w-1/2 md:mb-0 flex justify-center items-center">
              <img
                src={
                  comic.thumbnail ||
                  "https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg"
                }
                alt=""
                className="w-1/2 h-auto mb-4" // Añade un margen inferior
                onError={handleImageError}
              />
            </div>
            <div className="details w-full md:w-1/2 md:ml-4 flex flex-col justify-between">
              {" "}
              {/* Cambia a flex y ajusta alineación */}
              <div>
                <h2 className="text-3xl">{comic.title}</h2>
                <p className="text-gray-700 mb-2">Autor: {comic.author}</p>
                <p className="text-gray-700 mb-2"> {comic.publisher}</p>
                <p className="text-gray-700 mb-2">${comic.price}</p>
                <p className="text-gray-700 mb-4">{comic.description}</p>
              </div>
              {showAddToCart && (
                <Link to="/carrito">
                  <button className="button" onClick={handleAddToCart}>
                    ADD TO CART
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ComicDetail;
