import { Router } from "express";
const router = Router();
import PurchaseController from "../controllers/purchase.js"

router.get("/", PurchaseController.getPurchases);

export default router;