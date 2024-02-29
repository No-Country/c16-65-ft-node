import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Card from "../components/card.jsx";
import Products from "./Products.jsx";

const Home = () => {
  // const [originalComics, setOriginalComics] = useState([]);
  // const [comics, setComics] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   //?  obtengo los datos de la API
  //   axios.get("https://no-country-cwv9.onrender.com/api/comics?limit=10")
  //     .then(response => {
  //       const comicsData = response.data.comics.docs;
  //       setOriginalComics(comicsData);
  //       setComics(comicsData);

  //       //? Obtener categorías únicas de los cómics
  //       const uniqueCategories = [...new Set(comicsData.map(comic => comic.category))];
  //       setCategories(["all", ...uniqueCategories]);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

  // const filterComicsByCategory = (category) => {
  //   if (category === "all") {
  //     //? Si la categoría es "all", muestra todos los cómics originales
  //     setComics(originalComics);
  //   } else {

  //     //? Filtra los cómics originales por la categoría seleccionada
  //     const filteredComics = originalComics.filter(comic => comic.category === category);
  //     setComics(filteredComics);
  //   }
  //   setSelectedCategory(category);
  // };

  // const handleSearch = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   const filteredComics = originalComics.filter(comic => comic.title.toLowerCase().includes(term));
  //   setComics(filteredComics);
  // };

  return (
    <>
      <Products />
    </>
    //   <div>
    //     <h2>Comics</h2>

    //     <div className="flex ">
    //       <label><FaSearch/> </label>
    //       <input className="border border-solid border-black " type="text" onChange={handleSearch} value={searchTerm} />
    //     </div>

    //     <div>
    //       <label>Filtrar por categoría: </label>
    //       <select onChange={(e) => filterComicsByCategory(e.target.value)} value={selectedCategory}>
    //         {categories.map((category, index) => (
    //           <option key={index} value={category}>
    //             {category}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Mostrar cómics como tarjetas */}
    //     <div className="grid w-49 grid-cols-4 gap-4">
    //       {comics.map((comic, index) => (
    //         <Card key={index} title={comic.title} image={comic.image} price={comic.price} />
    //       ))}
    //     </div>
    //   </div>
  );
};

export default Home;
