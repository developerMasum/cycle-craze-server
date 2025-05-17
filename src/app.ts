import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "./app/config/db";
import { seedProducts } from "./app/config/seed";
import { orderRoutes } from "./app/modules/order/order.routes";
import { productRoutes } from "./app/modules/product/product.routes";
import cors from "cors";
import { paymentRoutes } from "./app/modules/payment/payment.routes";

const app = express();

app.use(bodyParser.json());
// app.use(cookieParser());

// app.use(cors({ origin: 'http://localhost:5173s', credentials: true }));
app.use(
  cors({
    origin: ["https://trendys.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running!",
    status: "success",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "v1.0.0",
  });
});

connectDB();
seedProducts();

export default app;
