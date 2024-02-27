import { Router } from "express";
const router = Router();
import CartController from "../controllers/cart.js"

router.get("/", CartController.getCarts);
router.get("/:id", CartController.getCartById);
router.get("/search/:email", CartController.getCartByEmail);
router.post("/create", CartController.createCartEmpty);
router.post("/add/:cid/product/:pid", CartController.addProdInCart);

export default router;