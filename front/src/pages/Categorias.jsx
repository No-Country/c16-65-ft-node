



// ComicsPage.jsx
import  { useState, useEffect } from "react";
import axios from "axios";
import Card from '../components/card.jsx';
// ...

const ComicsPage = () => {
    const [originalComics, setOriginalComics] = useState([]); // Nuevo estado para almacenar los cómics originales
    const [comics, setComics] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
  
    useEffect(() => {
      // Obtener datos de la API
      axios.get("https://no-country-cwv9.onrender.com/api/comics?limit=10")
        .then(response => {
          const comicsData = response.data.comics.docs;
          setOriginalComics(comicsData); // Almacenar cómics originales
          setComics(comicsData);
          // Obtener categorías únicas de los cómics
          const uniqueCategories = [...new Set(comicsData.map(comic => comic.category))];
          setCategories(["all", ...uniqueCategories]);
        })
        .catch(error => console.error(error));
    }, []);
  
    const filterComicsByCategory = (category) => {
      if (category === "all") {
        // Si la categoría es "all", muestra todos los cómics originales
        setComics(originalComics);
      } else {
        // Filtra los cómics originales por la categoría seleccionada
        const filteredComics = originalComics.filter(comic => comic.category === category);
        setComics(filteredComics);
      }
      setSelectedCategory(category);
    };
  

  
    return (
      <div>
        <h2>Comics</h2>
        
        {/* Filtrar por categoría */}
        <div>
          <label>Filtrar por categoría: </label>
          <select onChange={(e) => filterComicsByCategory(e.target.value)} value={selectedCategory}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
  
        {/* Mostrar cómics como tarjetas */}
        <div className="grid grid-cols-2 gap-4">
          {comics.map((comic, index) => (
            <Card key={index} title={comic.title} image={comic.image} price={comic.price} />
          ))}
        </div>
      </div>
    );
  };
  

  

export default ComicsPage;

