import { Router } from "express";
const router = Router();
import CartController from "../controllers/cart.js"

router.get("/", CartController.getCarts);
router.get("/:id", CartController.getCartById);
router.get("/search/:email", CartController.getCartByEmail);
router.post("/create", CartController.createCartEmpty);
router.post("/add/:cid/product/:pid", CartController.addProdInCart);
router.delete("/delete/:cid/product/:pid", CartController.deleteProdInCart);
router.delete("/delete/:cid", CartController.emptyCart);

export default router;