import express from "express";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Parse incoming JSON data
app.use(express.json());

app.use(cookieParser("mySecret"));

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// Route handling
app.use("/", apiRoutes);

export = app;
