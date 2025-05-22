import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

// Route to create an order
router.get("/:id", OrderController.getOrderByIdController);
router.post("/checkout", OrderController.createOrderController);

export const orderRoutes = router;
