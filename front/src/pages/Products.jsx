import { useEffect, useState } from "react";
import Card from "../components/card";
import { Link, useParams } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  console.log("data", data);

  const fetchData = async () => {
    const response = await fetch(
      `https://no-country-cwv9.onrender.com/api/comics?limit=${limit}&page=${page}`
    );
    const newData = await response.json();
    setData((prevData) => [...prevData, ...newData.comics.docs]);
    setTotalPages(newData.totalPages);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  return (
    <div>
      <div className="card-list1 grid grid-cols-2 gap-4">
        {data.map((item) => (
          <Link to={`/comic-detail/${item._id}`} key={item._id}>
            <Card title={item.title} price={item.price} />
          </Link>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
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
      </div>
    </div>
  );
}

export default Products;
