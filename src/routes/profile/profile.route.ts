import { Router } from "express";
import { profileController } from "../../controller/profile/profile.controller";
import { validateParamData } from "../../middlewares/validator";

const profileRoute = Router();

profileRoute.get("/", profileController.getUserProfile);

profileRoute.get("/followers", profileController.getAllFollowers);

profileRoute.post(
  "/follow/:uuid",
  validateParamData(["uuid"]),
  profileController.followUser
);

profileRoute.put(
  "/unfollow/:uuid",
  validateParamData(["uuid"]),
  profileController.unFollowUser
);

profileRoute.get("/users", profileController.getUsersToFollow);

export = profileRoute;
