import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.js"

router.get("/", UserController.getUsers);
router.post("/create", UserController.createUser);

export default router;