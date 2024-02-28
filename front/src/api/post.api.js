import axios from "axios";

export const createNewComic = async (post) => {
  try {
    await axios.post("https://no-country-cwv9.onrender.com/api/comics/create", post);
    alert("Envío exitoso");
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
  }
};

export const editComic = async (id, put) => {
  try {
    await axios.put(`https://no-country-cwv9.onrender.com/api/comics/edit/${id}`, put);
    alert("Edición exitosa");
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
  }
};

export const changeAvailable = async (id, requestData) => {
  try {
    await axios.delete(`https://no-country-cwv9.onrender.com/api/comics/delete/${id}`, requestData);
    alert("Cambio de estado exitoso");
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
  }
};
