import React, { useEffect, useState } from "react";
import Card from "../components/card";

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://no-country-cwv9.onrender.com/api/comics?limit=100")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data.comics.docs))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("lo que hay en data:", data);

  return (
    <div className="card-list1 grid grid-cols-2 gap-4">
      {data.map((item) => (
        <div key={item._id}>
          <Card
            _id={item._id}
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            to={`/comic-detail/${item._id}`}
          />
        </div>
      ))}
    </div>
  );
}

export default Products;
