import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import { PORT } from "./utils/constants";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.use("/api", [authRouter]);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
