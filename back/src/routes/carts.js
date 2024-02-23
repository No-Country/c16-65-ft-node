import { Router } from "express";
const router = Router();
import CartController from "../controllers/cart.js"

router.get("/", CartController.getCarts);
router.get("/:id", CartController.getCartById);
router.post("/create", CartController.createCartEmpty);

export default router;