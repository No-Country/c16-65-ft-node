const express = require("express");
const router = express.Router();
const ComicController = require("../controllers/comic");

// DEVUELVE COMICS
router.get("/", ComicController.getComics);

// DEVUELVE 1 COMIC
router.get("/:id", ComicController.getOneComic);

// CREAR COMICS
router.post("/create", ComicController.createComic);

// EDITAR COMIC
router.put("/edit/:id", ComicController.editComic);

// ELIMINAR COMIC
router.delete("/delete/:id", ComicController.deleteComic);

module.exports = router;
