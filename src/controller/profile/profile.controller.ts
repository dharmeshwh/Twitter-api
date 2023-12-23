import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { In, Not } from "typeorm";
import { IVerifyTokenResponse } from "../../middlewares/token-handler";
import { FollowersEntity } from "../../typeorm/entities/followers.entity";
import { UserProfileEntity } from "../../typeorm/entities/user.entity";

class ProfileController {
  async getUserProfile(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;

      const user = await UserProfileEntity.findOne({
        where: {
          uuid: userUuid,
        },
        select: ["email", "firstName", "lastName", "username", "email", "uuid"],
      });

      if (!user) {
        return response.status(StatusCodes.NOT_FOUND).send({
          status: false,
          message: "user not found",
        });
      }

      return response.status(StatusCodes.OK).send({
        status: true,
        data: user,
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllFollowers(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;

      const followers = await FollowersEntity.find({
        where: {
          userUuid,
          followerUuid: Not(In([userUuid])),
        },
      });

      return response.status(StatusCodes.OK).send({
        status: true,
        data: followers,
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async followUser(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { uuid } = request.params;

      const isUserExist = await UserProfileEntity.findOne({
        where: { uuid },
        select: ["uuid"],
      });

      if (!isUserExist) {
        return response.status(StatusCodes.NOT_FOUND).send({
          status: false,
          message: "user not found",
        });
      }

      const isAlreadyFollowing = await FollowersEntity.findOne({
        where: {
          userUuid,
          followerUuid: uuid,
        },
        select: ["uuid"],
      });

      if (isAlreadyFollowing) {
        return response.status(StatusCodes.CONFLICT).send({
          status: false,
          message: "you are already following this user",
        });
      }

      const T = new FollowersEntity();
      T.userUuid = userUuid;
      T.followerUuid = uuid;

      await T.save();

      return response.status(StatusCodes.OK).send({
        status: true,
        message: "you started following the user!",
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async unFollowUser(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { uuid } = request.params;

      const isUserExist = await UserProfileEntity.findOne({
        where: { uuid },
        select: ["uuid"],
      });

      if (!isUserExist) {
        return response.status(StatusCodes.NOT_FOUND).send({
          status: false,
          message: "user not found",
        });
      }

      const isAlreadyFollowing = await FollowersEntity.findOne({
        where: {
          userUuid,
          followerUuid: uuid,
        },
        select: ["uuid"],
      });

      if (!isAlreadyFollowing) {
        return response.status(StatusCodes.CONFLICT).send({
          status: false,
          message: "you are not following this user",
        });
      }

      await FollowersEntity.delete({
        followerUuid: uuid,
        userUuid,
      });

      return response.status(StatusCodes.OK).send({
        status: true,
        message: "user unfollowed!",
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async getUsersToFollow(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { page = 1 } = request.query;

      const take = 50;
      const offset = (Number(page) - 1) * take;

      const users = await UserProfileEntity.createQueryBuilder("user")
        .leftJoin("user.follower", "follower")
        .select([
          "user.firstName",
          "user.lastName",
          "user.username",
          "user.email",
          "user.uuid",
        ])
        .where("user.uuid != :userUuid", { userUuid })
        .andWhere(
          "follower.userUuid IS NULL OR follower.userUuid != :userUuid",
          {
            userUuid,
          }
        )
        .take(take)
        .skip(offset)
        .getMany();

      return response.status(StatusCodes.OK).send({
        status: true,
        data: users,
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }
}

export const profileController = new ProfileController();
