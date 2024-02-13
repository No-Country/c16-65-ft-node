import { Router } from "express";
const router = Router();
import ComicController from "../controllers/comic.js"

// DEVUELVE COMICS
router.get("/", ComicController.getComics);

// CREAR COMICS
router.post("/create", ComicController.createComic);

// EDITAR COMIC
router.put("/edit/:id", ComicController.editComic);

// ELIMINAR COMIC
router.delete("/delete/:id", ComicController.deleteComic);

export default router
