import { Router } from "express";
import { authController } from "../../controller/authentication/authentication.controller";
import { hashPassword } from "../../middlewares/bcrypt";
import { validate } from "../../middlewares/validator";
import { loginContract, signupContract } from "./authentication.contract";

const authenticationRoute = Router();

// Define routes for signup and login

authenticationRoute.post(
  "/signup",
  validate(signupContract), // Validate the request body against the signup contract schema
  hashPassword, // Hash the password using the bcrypt middleware
  authController.signup // Handle the signup logic in the authController
);

authenticationRoute.post(
  "/login",
  validate(loginContract), // Validate the request body against the login contract schema
  authController.login // Handle the login logic in the authController
);

export = authenticationRoute;
