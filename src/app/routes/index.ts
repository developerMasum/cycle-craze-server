import { Router } from "express";
import { productRoutes } from "../modules/product/product.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { orderRoutes } from "../modules/order/order.routes";
import { analyticsRoutes } from "../modules/analytics/analytics.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },

  {
    path: "/product",
    route: productRoutes,
  },

  {
    path: "/orders",
    route: orderRoutes,
  },

  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/analytics",
    route: analyticsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
