

import axios from "axios";

export const createNewComic = async (post) => {
  try {
    //! Esperando la ruta para hacer el POST 
    await axios.post("https://no-country-cwv9.onrender.com/api/comics/create", post);
    alert("Envio exitoso");
    
  } catch (error) {
    console.error("Error en la petición:", error);
   
  }
};