import { Router } from "express";
const router = Router();
import PurchaseController from "../controllers/purchase.js"

router.get("/", PurchaseController.getPurchases);
router.get("/search/:email", PurchaseController.getPurchaseByEmail);
router.post("/create", PurchaseController.createPurchase);

export default router;