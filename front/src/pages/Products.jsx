import React, { useEffect, useState } from "react";
import Card from "../components/card";

function Products() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://no-country-cwv9.onrender.com/api/comics?limit=${limit}&page=${page}`
      );
      const newData = await response.json();
      setData(Array.from(new Set([...data, ...newData.comics.docs])));
      setTotalDocs(newData.comics.totalDocs);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
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
        {data.length < totalDocs ? (
          <button className="button"
            onClick={loadMore}
          >
            Cargar más comics
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Products;
