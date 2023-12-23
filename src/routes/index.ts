import { Router } from "express";
import { tokenHandler } from "../middlewares/token-handler";
import authenticationRoute from "./authentication/authentication.route";
import feedRoute from "./feed/feed.route";
import messagesRoute from "./messages/messages.route";
import profileRoute from "./profile/profile.route";

const apiRoutes = Router();

apiRoutes.use("/auth", authenticationRoute);

apiRoutes.use("/profile", tokenHandler, profileRoute);

apiRoutes.use("/message", tokenHandler, messagesRoute);

apiRoutes.use("/feed", tokenHandler, feedRoute);

export = apiRoutes;
