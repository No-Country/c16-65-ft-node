import { useEffect, useState } from "react";
import Card from "./card.jsx";

function CardList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://no-country-cwv9.onrender.com/api/comics?limit=10")
      .then((response) => response.json())
      .then((data) => setData(data.comics.docs));
  }, []);

  return (
    <div className="card-list ">
     
      {data.map((item) => (
        <Card
          key={item._id}
          title={item.title}
          // image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default CardList;
