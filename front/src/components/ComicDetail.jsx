import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useAuth0 } from "@auth0/auth0-react";

const ComicDetail = ({ _id, backupImage }) => {
  const { addToGroupedCart, } = useContext(Context);
  const [comic, setComic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const { user, isAuthenticated } = useAuth0();

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



  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <Link to="/products">
            <button className="button">
              BACK
            </button>
          </Link>
          <div className="card-detail-container flex flex-col mt-8 p-4 bg-white rounded shadow-lg md:flex-row">
            <div className="thumbnail mb-4 md:w-1/2 md:mb-0">
              <img
                src={imageError ? backupImage : comic.thumbnail || backupImage}
                alt=""
                className="w-full h-auto"
                onError={handleImageError}
              />
            </div>
            <div className="details w-full md:w-1/2 md:ml-4">
              <h2 className="text-3xl font-semibold mb-2">{comic.title}</h2>
              <p className="text-yellow-500 text-lg mb-2">
                ⭐️⭐️⭐️⭐️⭐️ 5/5
              </p>
              <p className="text-gray-700 mb-2">Autor: {comic.author}</p>
              <p className="text-gray-700 mb-2"> {comic.publisher}</p>
              <p className="text-gray-700 mb-2">${comic.price}</p>
              <p className="text-gray-700 mb-4">{comic.description}</p>

              {showAddToCart && (
                <Link to="/carrito">
                  <button
                    className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-900 transition duration-300"
                    onClick={handleAddToCart}
                  >
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




