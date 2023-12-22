import express from "express";
import apiRoutes from "./routes";

const app = express();

// Parse incoming JSON data
app.use(express.json());

// Route handling
app.use("/", apiRoutes);

export = app;
