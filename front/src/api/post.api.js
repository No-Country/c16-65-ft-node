import axios from "axios";
import Swal from "sweetalert2";

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

export const editComic = async (id, put) => {
  try {
    await axios.put(
      `https://no-country-cwv9.onrender.com/api/comics/edit/${id}`,
      put
    );
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
    await axios.delete(
      `https://no-country-cwv9.onrender.com/api/comics/delete/${id}`,
      requestData
    );
    alert("Cambio de estado exitoso");
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
  }
};

export const getCart = async (email) => {
  try {
    const response = await fetch(
      `https://no-country-cwv9.onrender.com/api/carts/search/${email}`
    );
    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
  }
};

export const addProductCart = async (cid, pid) => {
  const url = `https://no-country-cwv9.onrender.com/api/carts/add/${cid}/product/${pid}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Producto agregado al carrito con éxito.",
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al agregar el producto al carrito.",
    });
  }
};

export const deleteProductCart = async (cid, pid) => {
  const url = `https://no-country-cwv9.onrender.com/api/carts/delete/${cid}/product/${pid}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Producto eliminado del carrito.",
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    console.error("Error al enviar la solicitud DELETE:", error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al eliminar el producto del carrito.",
    });
  }
};
