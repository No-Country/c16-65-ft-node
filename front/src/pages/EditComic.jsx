import React, { useEffect, useState } from "react";
import { editComic, changeAvailable } from "../api/post.api";

const EditComic = () => {
  const [comics, setComics] = useState([]);
  const [editedComics, setEditedComics] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://no-country-cwv9.onrender.com/api/comics?limit=200`
        );
        const newData = await response.json();
        setComics(newData.comics.docs);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (comicId) => {
    setEditMode((prevState) => ({
      ...prevState,
      [comicId]: true,
    }));
  };

  const handleDelete = async (comicId) => {
    try {
      await changeAvailable(comicId, {});
      console.log(`Comic con ID ${comicId} eliminado exitosamente`);
      window.location.reload();
    } catch (error) {
      console.error(`Error al eliminar comic con ID ${comicId}:`, error);
    }
  };

  const handleSave = async (comicId) => {
    try {
      setEditMode((prevState) => ({
        ...prevState,
        [comicId]: false,
      }));

      const editedComic = editedComics[comicId];
      await editComic(comicId, editedComic);
      setEditedComics({});
      window.location.reload();
    } catch (error) {
      console.error("Error al editar comic:", error);
    }
  };

  const handleChange = (comicId, field, value) => {
    setEditedComics((prevState) => ({
      ...prevState,
      [comicId]: {
        ...prevState[comicId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Comic</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comics.map((comic) => (
            <tr key={comic._id}>
              <td>
                {editMode[comic._id] ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-2"
                    value={editedComics[comic._id]?.title || comic.title}
                    onChange={(e) =>
                      handleChange(comic._id, "title", e.target.value)
                    }
                  />
                ) : (
                  comic.title
                )}
              </td>
              <td>
                {editMode[comic._id] ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-2"
                    value={
                      editedComics[comic._id]?.description || comic.description
                    }
                    onChange={(e) =>
                      handleChange(comic._id, "description", e.target.value)
                    }
                  />
                ) : (
                  comic.description
                )}
              </td>
              <td>
                {editMode[comic._id] ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-2"
                    value={editedComics[comic._id]?.author || comic.author}
                    onChange={(e) =>
                      handleChange(comic._id, "author", e.target.value)
                    }
                  />
                ) : (
                  comic.author
                )}
              </td>
              <td>
                {editMode[comic._id] ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-2"
                    value={
                      editedComics[comic._id]?.publisher || comic.publisher
                    }
                    onChange={(e) =>
                      handleChange(comic._id, "publisher", e.target.value)
                    }
                  />
                ) : (
                  comic.publisher
                )}
              </td>
              <td>
                {editMode[comic._id] ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-2"
                    value={editedComics[comic._id]?.category || comic.category}
                    onChange={(e) =>
                      handleChange(comic._id, "category", e.target.value)
                    }
                  />
                ) : (
                  comic.category
                )}
              </td>
              <td>
                {editMode[comic._id] ? (
                  <input
                    type="number"
                    className="border border-gray-300 p-2"
                    value={editedComics[comic._id]?.price || comic.price}
                    onChange={(e) =>
                      handleChange(comic._id, "price", e.target.value)
                    }
                  />
                ) : (
                  comic.price
                )}
              </td>
              <td>{comic.isAvailable ? "Yes" : "No"}</td>
              <td className="flex items-center  m-auto">
                {editMode[comic._id] ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSave(comic._id)}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEdit(comic._id)}
                  >
                    Editar
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleDelete(comic._id)}
                >
                  Cambiar Disponibilidad
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditComic;
