import { Router } from "express";
const router = Router();
import ComicController from "../controllers/comic.js";

// DEVUELVE COMICS
router.get("/all", ComicController.getComics);
router.get("/", ComicController.getComicsPaginated);

// DEVUELVE 1 COMIC
router.get("/:id", ComicController.getOneComic);

// CREAR COMICS
router.post("/create", ComicController.createComic);

// EDITAR COMIC
router.put("/edit/:id", ComicController.editComic);

// ELIMINAR COMIC
router.delete("/delete/:id", ComicController.availableComic);

export default router;