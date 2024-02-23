import axios from "axios";

export const createNewComic = async (post) => {
  try {
    await axios.post(
      "https://no-country-cwv9.onrender.com/api/comics/create",
      post
    );
    alert("Envío exitoso");
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
  }
};
