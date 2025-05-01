import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

// middleware implementation
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
