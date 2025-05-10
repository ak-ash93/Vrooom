import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import { authRoutes, userRoutes } from "./routes/index.js";
dotenv.config();

const app = express();
connectDB();

// middleware implementation
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users/", userRoutes);
app.use("/auth/", authRoutes);

export default app;
