import { Router } from "express";
import { profileController } from "../../controller/profile/profile.controller";

const profileRoute = Router();

profileRoute.get("/", profileController.getUserProfile);

profileRoute.get("/followers", profileController.getAllFollowers);

profileRoute.post("/follow", profileController.followUser);

profileRoute.put("/unfollow", profileController.unFollowUser);

export = profileRoute;
