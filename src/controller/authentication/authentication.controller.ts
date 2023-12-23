import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import CustomValidation from "../../utils/custom-validation";
import { UserProfileEntity } from "../../typeorm/entities/user.entity";
import { cookieKeyName } from "../../utils/common.utils";
import { FollowersEntity } from "../../typeorm/entities/followers.entity";
import { randomUUID } from "crypto";

class AuthController {
  /**
   *
   * @param request firstName, lastName, email, password, username
   * @param response userDetails
   * Flow:
   * validate username or email
   * check if user already exists
   * if not create an accout and send account details in response
   */
  async signup(request: Request, response: Response) {
    try {
      const { firstName, lastName, email, password, username } = request.body;

      const profileRepo = UserProfileEntity;

      const isUserAlreadyExists = await profileRepo.findOne({
        where: [{ username }, { email }], // Check if a user with the same username or email already exists
      });

      if (isUserAlreadyExists) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .send({ status: true, message: "username or email already exists!" });
      }

      // Create a new UserProfile instance and set its properties
      const user = new UserProfileEntity();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.username = username;
      user.uuid = randomUUID();

      const follower = new FollowersEntity();
      follower.userUuid = user.uuid;
      follower.followerUuid = user.uuid;

      await follower.save();

      // Save the new user profile to the database
      const userDetails = await profileRepo.save(user);

      // Return the success response with the user details
      return response
        .status(StatusCodes.OK)
        .send({ status: true, data: userDetails });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }

  /**
   *
   * @param request username, password
   * @param response Jwt token
   * Flow:
   * check if user exist by using username
   * If exist match it's password
   * If password match create JWT token and send in response
   * else throw error
   */
  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const user = await UserProfileEntity.findOne({
        // We can use findOneOrFail but it doesn't give readable error message
        where: {
          username,
        },
        select: ["password", "username", "uuid"],
      });

      if (!user) {
        // If user does not exist, return unauthorized response
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "User not exits!!" });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // If the password is invalid, return unauthorized response
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "username or password in invalid!" });
      }

      // Generate a JWT token for authentication
      const token = CustomValidation.getJwtToken(user.uuid);

      return response
        .cookie(cookieKeyName, String(token), {
          signed: true,
          sameSite: "none",
          secure: true,
          httpOnly: true,
        })
        .status(StatusCodes.OK)
        .send({
          status: true,
        });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}

export const authController = new AuthController();
