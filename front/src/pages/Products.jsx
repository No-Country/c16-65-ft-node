import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Card from "../components/card";
import "../pages/products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://no-country-cwv9.onrender.com/api/comics?limit=${limit}&page=${page}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }${sortByPrice ? `&sort=${sortByPrice}` : ""}${
          searchTitle ? `&title=${searchTitle}` : ""
        }`
      );
      const newData = await response.json();

      if (page === 1) {
        setData(newData.comics.docs);
      } else {
        setData((prevData) => [...prevData, ...newData.comics.docs]);
      }

      setTotalDocs(newData.comics.totalDocs);
      setNoResults(newData.comics.docs.length === 0);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
    setData([]);
    setTotalDocs(0);
    setNoResults(false);
  };

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    setSortByPrice(newSortBy);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
    setPage(1);
    setNoResults(false);
  };

  useEffect(() => {
    fetchData();
  }, [limit, page, selectedCategory, sortByPrice, searchTitle]);

  return (
    <div
      id="container_Products"
      style={{ display: "flex", borderRadius: "5px" }}
    >
      <div id="filtrado">
        <div className="search">
          <div>
            <FaSearch className="search-icon" />
            <input
              className="inpubarsearch"
              type="text"
              id="searchInput"
              value={searchTitle}
              onChange={handleSearchChange}
              placeholder="  Batman"
            />
          </div>
        </div>
        <div className="category-filter">
          <select
            style={{ cursor: "pointer" }}
            id="categoryDropdown"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Acción">Acción</option>
            <option value="Superhéroes">Superhéroes</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Misterio">Misterio</option>
          </select>
        </div>
        <div className="sort-by">
          <label htmlFor="sortBy"></label>
          <select
            id="sortBy"
            value={sortByPrice}
            onChange={handleSortByChange}
            style={{ cursor: "pointer" }}
          >
            <option value="">Sort by price</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
      <div>
        {noResults && (
          <h1
            className="noResults"
            style={{
              textAlign: "center",
              fontSize: "2em", // Puedes ajustar el tamaño según tus preferencias
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            No results found.
          </h1>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {data.map((item) => (
            <div
              key={`${item._id}-${item.title}`}
              className="tarjeta rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 w-100%"
            >
              <Card
                _id={item._id}
                title={item.title}
                price={item.price}
                thumbnail={item.thumbnail}
                to={`/comic-detail/${item._id}`}
                backupImage="https://upload.wikimedia.org/wikipedia/en/0/07/Invincible_Issue_75.jpeg"
              />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {data.length < totalDocs && (
            <button className="buttonP" onClick={loadMore}>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
