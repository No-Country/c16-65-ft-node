import { comicModel } from "../models/Comic.js";

const getAllComics = async (req, res) => {
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

const getComics = async (req, res) => {
  try {
    let comics;

    // Verificar si se proporciona el parámetro isAvailable en la consulta
    const { isAvailable } = req.query;

    if (isAvailable !== undefined) {
      // Si isAvailable es proporcionado en la consulta, convertirlo a booleano
      const isAvailableBool = isAvailable.toLowerCase() === "true";

      // Consultar los cómics según el valor de isAvailable
      comics = await comicModel.find({ isAvailable: isAvailableBool });
    } else {
      // Si no se proporciona el parámetro isAvailable, obtener todos los cómics
      comics = await comicModel.find();
    }

    return res.status(200).json({
      status: "Success",
      comics,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al obtener los cómics",
      error: error,
    });
  }
};

// Conseguir 1 comic por id
const getOneComic = async (req, res) => {
  try {
    const id = req.params.id;
    const oneComic = await comicModel.findById(id);

    if (!oneComic) {
      return res.status(404).json({
        status: "Error",
        mensaje: "No se han encontrado comics",
      });
    }

    return res.status(200).json({
      status: "Success",
      oneComic,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al obtener el comic",
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

    const comicEditTest = await comicModel.findById(idComic);
    if (!comicEditTest) {
      return res.status(404).json({
        status: "Error",
        mensaje: "No se ha encontrado el Comic",
      });
    }

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

// const deleteComic = async (req, res) => {
//   try {
//     const idComic = req.params.id;
//     const { isAvailable } = req.body;

//     const comicEditTest = await comicModel.findById(idComic);
//     if (!comicEditTest) {
//       return res.status(404).json({
//         status: "Error",
//         mensaje: "No se ha encontrado el Comic",
//       });
//     }

//     const newComicEdit = await comicModel.updateOne(
//       { _id: idComic },
//       { $set: { isAvailable: isAvailable } },
//     );
//     return res.status(200).json({
//       status: "Success",
//       mensaje: "Campo isAvailable editado con Éxito",
//       newComicEdit,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "Error",
//       mensaje: "Error al editar un comic",
//       error: error,
//     });
//   }
// };

const availableComic = async (req, res) => {
  try {
    const idComic = req.params.id;

    const comicEditTest = await comicModel.findById(idComic);
    if (!comicEditTest) {
      return res.status(404).json({
        status: "Error",
        mensaje: "No se ha encontrado el Comic",
      });
    }

    const newIsAvailable = !comicEditTest.isAvailable;

    const newComicEdit = await comicModel.updateOne(
      { _id: idComic },
      { $set: { isAvailable: newIsAvailable } },
    );
    return res.status(200).json({
      status: "Success",
      mensaje: "Campo isAvailable editado con Éxito",
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

const getComicsPaginated = async (req, res) => {
  try {
    const { limit, page, title, category, isAvailable, sort } = req.query;

    let sortOptions = {}
    if (sort === "asc") {
      sortOptions = { price: 1 }
    } else if (sort === "desc") {
      sortOptions = { price: -1 }
    }
    const options = {
      limit: limit ? parseInt(limit, 10) : 5,
      page: page ? parseInt(page, 10) : 1,
      sort: sortOptions
    };

    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (isAvailable) {
      const isAvailableBool = isAvailable.toLowerCase() === "true";
      query.isAvailable = isAvailableBool;
    }

    const comics = await comicModel.paginate(query, options);

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

export default {
  getAllComics,
  createComic,
  getComics,
  getOneComic,
  editComic,
  getComicsPaginated,
  availableComic,
};
