import { Router } from "express";
import { OrderController } from "./order.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

// Route to create an order
router.get("/:id", OrderController.getOrderByIdController);
router.post("/checkout", OrderController.createOrderController);
router.get("/my-orders/:id", OrderController.getMyOrders);
router.get("/", OrderController.getAllOrders);
router.patch("/:id", OrderController.updateOrderStatus);

export const orderRoutes = router;
