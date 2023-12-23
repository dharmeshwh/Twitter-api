import express from "express";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

// Parse incoming JSON data
app.use(express.json());

app.use(cookieParser("mySecret"));

// Route handling
app.use("/", apiRoutes);

export = app;
