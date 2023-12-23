import { Router } from "express";
import { profileController } from "../../controller/profile/profile.controller";

const profileRoute = Router();

profileRoute.get("/", profileController.getUserProfile);

profileRoute.get("/followers", profileController.getAllFollowers);

profileRoute.post("/follow/:uuid", profileController.followUser);

profileRoute.put("/unfollow/:uuid", profileController.unFollowUser);

profileRoute.get("/users", profileController.getUsersToFollow);

export = profileRoute;
