import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "./app/config/db";
// import { seedProducts } from "./app/config/seed";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import cookieParser from "cookie-parser";
const app: Application = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://cycle-craze.vercel.app",
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
app.use(globalErrorHandler);

connectDB();
// seedProducts();

export default app;
