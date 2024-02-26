import React, { useEffect, useState } from "react";
import Card from "../components/card";

function Products() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  console.log("data1", data);
  console.log("totalDocs", totalDocs);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://no-country-cwv9.onrender.com/api/comics?limit=${limit}&page=${page}`
      );
      const newData = await response.json();
      console.log("newData", newData.comics.docs);
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
    console.log("ejecutando useEffect");
    fetchData();
  }, [limit, page]);

  return (
    <>
      <div className="card-list1 grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item._id}>
            <Card
              title={item.title}
              thumbnail={item.thumbnail}
              price={item.price}
              to={`/comic-detail/${item._id}`}
            />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {data.length < totalDocs ? (
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
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
