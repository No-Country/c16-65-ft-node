import { comicModel } from "../models/Comic.js"

const getComics = async (req, res) => {
  try {
    const comics = await comicModel.find();
    return res.status(200).json({
      status: "Success",
      comics,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al obtener los comics",
      error: error,
    });
  }
};

const createComic = async (req, res) => {
  try {
    const { title, author, description, publisher, category, price, thumbnail, pdf } = req.body;

    const comic = { title, author, description, publisher, category, price, thumbnail, pdf };
    const newComic = await comicModel.create(comic);

    return res.status(200).json({
      status: "Success",
      newComic,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al crear un comic",
      error: error,
    });
  }
};

const editComic = async (req, res) => {
  try {
    const idComic = req.params.id;
    const { title, author, description, publisher, category, price, thumbnail, pdf } = req.body;
    const comicEdit = { title, author, description, publisher, category, price, thumbnail, pdf };

    const newComicEdit = await comicModel.findByIdAndUpdate(idComic, comicEdit);
    return res.status(200).json({
      status: "Success",
      mensaje: "Comic Editado con Éxito",
      newComicEdit,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al editar un comic",
      error: error,
    });
  }
};

const deleteComic = async (req, res) => {
  try {
    const idComic = req.params.id;
    const comicDelete = await comicModel.findByIdAndDelete(idComic);

    return res.status(200).json({
      status: "Success",
      mensaje: "Comic Eliminado con Éxito",
      comicDelete,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al eliminar un comic",
      error: error,
    });
  }
};

export default {
  createComic,
  getComics,
  editComic,
  deleteComic,
}