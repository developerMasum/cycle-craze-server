import { Router } from "express";
import { productRoutes } from "../modules/product/product.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },

  {
    path: "/product",
    route: productRoutes,
  },

  {
    path: "/payment",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
