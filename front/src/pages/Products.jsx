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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {data.map((item) => (
        <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
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
  );
}

export default Products;
