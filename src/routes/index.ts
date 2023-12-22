import { Router } from "express";
import { tokenHandler } from "../middlewares/token-handler";
import authenticationRoute from "./authentication/authentication.route";
import messagesRoute from "./messages/messages.route";
import profileRoute from "./profile/profile.route";

const apiRoutes = Router();

apiRoutes.use("/auth", authenticationRoute);

apiRoutes.use("/profile", tokenHandler, profileRoute);

apiRoutes.use("/messages", tokenHandler, messagesRoute);

export = apiRoutes;
