import React, { useState,useEffect } from 'react'

function ComicDetail() {


    return (
        <div className='card-detail-container'>
          <div className="thumbnail">
          <img src="https://www.isubscribe.com.au/images/covers/au/5254/41506/xlarge/TheUltimateGuidetoComicBooks282023142352.jpg" alt=""/>
          </div>
          <div className="details">
            <h2>Title</h2>
            <p>⭐️⭐️⭐️</p>
            <p>Author</p>
            <p>Publisher</p>
            <div className="price" >
              <p>Price</p>
              <p>Special price</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga debitis adipisci, aut numquam fugit porro nam accusamus ratione fugiat minima ullam. Error, maiores totam explicabo ad quos quisquam asperiores molestiae!</p>
            <button>ADD TO CHART</button>
          </div>
        </div>
      )
}

export default ComicDetail