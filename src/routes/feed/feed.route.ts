import { Router } from "express";
import { feedController } from "../../controller/feed/feed.controller";

const feedRoute = Router();

feedRoute.get("/", feedController.getFeeds);

export = feedRoute;
