const Comic = require("../models/Comic");

const create = async (req, res) => {
  const { title, author } = req.body;

  const comic = await Comic.create({ title, author });

  try {
    return res.status(200).json({
      status: "Success",
      comic,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error al crear un comic",
    });
  }
};

module.exports = {
  create,
};
