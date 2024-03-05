import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://no-country-cwv9.onrender.com/api/comics?title=${searchTerm}`
        );
        const data = await response.json();
        setResults(data.comics.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Resultados de la búsqueda para: {query}</h2>
      <ul>
        {results.map((result) => (
          <li key={result._id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
