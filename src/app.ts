import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "./app/config/db";
import { seedProducts } from "./app/config/seed";
import cors from "cors";
import router from "./app/routes";

const app = express();

app.use(bodyParser.json());
// app.use(cookieParser());

app.use(
  cors({
    origin: ["https://cycle-craze.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1", router);

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
// seedProducts();

export default app;
