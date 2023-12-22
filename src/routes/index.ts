import { Router } from "express";
import authenticationRoute from "./authentication/authentication.route";

const apiRoutes = Router();

apiRoutes.use("/", authenticationRoute);

export = apiRoutes;
