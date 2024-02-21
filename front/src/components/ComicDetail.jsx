import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';

function ComicDetail() {
    const [comic, setComic] = useState([])

    const { comicId } = useParams()
    useEffect(() => {
     fetch('https://no-country-cwv9.onrender.com/api/comics/65cbc6551f1455f2ea324bd1')
     .then((response) => response.json())
     .then((data)=> {console.log(data)})
       .catch((error) => {
            console.error('Error fetching product details:', error)
          }
       )
        
      }, [comicId])

    return (
        <div className='card-detail-container flex'>
          <div className="thumbnail w-1/2 p-4">
            <img src="https://www.isubscribe.com.au/images/covers/au/5254/41506/xlarge/TheUltimateGuidetoComicBooks282023142352.jpg" alt=""/>
          </div>
          <div className="details w-1/2 p-4">
            <h2>Title</h2>
            <p>⭐️⭐️⭐️</p>
            <p>Author</p>
            <p>Publisher</p>
            <div className="price">
              <p>Price</p>
              <p>Special price</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-4">ADD TO CART</button>
          </div>
        </div>
      )
}

export default ComicDetail