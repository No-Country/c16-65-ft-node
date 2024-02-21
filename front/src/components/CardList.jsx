import { useEffect, useState } from 'react'
import Card from "../components/card"
import { Link, useParams } from 'react-router-dom'

function CardList() {

  const [data, setData] = useState([])
  const { comicId } = useParams()

  useEffect(() => {
    fetch("https://no-country-cwv9.onrender.com/api/comics?limit=10")
      .then((response) => response.json())
      .then((data) => setData(data.comics.docs));
  }, []);


  return (
    <div className="card-list1  grid grid-cols-2 gap-4">
      {/* div que contiene las cards  */}

      {data.map((item) => (
        <Link to={`/comic-detail/${comicId}`}>
          <Card
            key={item._id}
            title={item.title}
            // image={item.image}
            price={item.price}
          />
        </Link>
      ))}
    </div>
  );
}

export default CardList;
