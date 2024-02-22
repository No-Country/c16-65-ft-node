import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.js"

router.get("/", UserController.getUsers);

export default router;
