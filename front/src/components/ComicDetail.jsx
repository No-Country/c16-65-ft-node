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
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <Link to="/products">
            <button className="button_cd1 font-bold">BACK</button>
          </Link>
          <div className="mian_contaire_cd">
            <div className="card-detail-container flex flex-col mt-8 p-4  rounded shadow-lg md:flex-row">
              <div className="thumbnail mb-4 md:w-1/2 md:mb-0 flex justify-center items-center">
                <img
                  src={
                    comic.thumbnail ||
                    "https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg"
                  }
                  alt=""
                  className="img_cd  mb-4 r"
                  onError={handleImageError}
                />
              </div>
              <div className="details_edc w-full md:w-1/2 md:ml-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold title_cd mb-2">
                    {comic.title}
                  </h2>
                  <p className="text-#3f3c2d font-bold autor_cd mb-2">
                    Autor: {comic.author}
                  </p>
                  <p className="text-#3f3c2d editorial_cd font-bold mb-2">
                    Editorial: {comic.publisher}
                  </p>
                  <p className="text-#3f3c2d price_cd font-bold mb-2">
                    ${comic.price}
                  </p>
                  <p className="text-#3f3c2d description_cd mb-4">
                    {comic.description}
                  </p>
                </div>
                {showAddToCart && (
                  <Link to="/carrito">
                    <button className="button_cd">ADD TO CART</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ComicDetail;
