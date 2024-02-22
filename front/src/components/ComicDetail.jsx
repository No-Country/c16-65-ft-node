import React, { useState, useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Context } from "../context/Context";

function ComicDetail() {
    const [comic, setComic] = useState([])
    const [loading, setLoading] = useState(true)
    const { addToCart, removeItem } = useContext(Context);

    const { comicId } = useParams()
    console.log(useParams())

    const handleAddToCart = () => {
        addToCart({ comicId });
      };
    useEffect(() => {
        fetch(`https://no-country-cwv9.onrender.com/api/comics/${comicId}`)
            .then((response) => response.json())
            .then((data) => {
                setComic(data.oneComic)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching product details:', error)
                setLoading(false)
            }
            )
        return () => {
        }


    }, [comicId])

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && (
                <>
                    <Link to="/products">
                        <button className="bg-gray-700 text-white px-4 py-2 mt-4 hover:bg-gray-900 transition duration-300">
                            BACK
                        </button>
                    </Link>
                    <div className="card-detail-container flex flex-col mt-8 p-4 bg-white rounded shadow-lg md:flex-row">
                        <div className="thumbnail mb-4 md:w-1/2 md:mb-0">
                            <img src="https://www.isubscribe.com.au/images/covers/au/5254/41506/xlarge/TheUltimateGuidetoComicBooks282023142352.jpg" alt="" className="w-full h-auto" />
                        </div>
                        <div className="details w-full md:w-1/2 md:ml-4">
                            <h2 className="text-3xl font-semibold mb-2">{comic.title}</h2>
                            <p className="text-yellow-500 text-lg mb-2">⭐️⭐️⭐️⭐️⭐️ 5/5</p>
                            <p className="text-gray-700 mb-2">Autor: {comic.author}</p>
                            <p className="text-gray-700 mb-2"> {comic.publisher}</p>
                            <p className="text-gray-700 mb-2">${comic.price}</p>
                            <p className="text-gray-700 mb-4">{comic.description}</p>
                            <button className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-900 transition duration-300" onClick={handleAddToCart}>ADD TO CART</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )


}

export default ComicDetail