import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { In } from "typeorm";
import { IVerifyTokenResponse } from "../../middlewares/token-handler";
import { FollowersEntity } from "../../typeorm/entities/followers.entity";
import { MessageEntity } from "../../typeorm/entities/message.entity";
import { UserProfileEntity } from "../../typeorm/entities/user.entity";

class FeedController {
  async getFeeds(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { page = 1 } = request.query;
      console.log({ userUuid });

      const take = 50;
      const offset = (Number(page) - 1) * take;

      // const feeds = await FollowersEntity.createQueryBuilder("follower")
      //   // .where("follower.userUuid = :userUuid", { userUuid })
      //   // .leftJoinAndSelect("follower.messages", "messages")
      //   // .leftJoinAndSelect("profile.messages", "messages")

      //   // .select(["messages.content", "messages.uuid"])

      //   // .innerJoin("userProfile.follower", "follower")
      //   // .select(["profile.messages"])
      //   // .leftJoin("profile.follower", "follower")
      //   // .where("follower.userUuid = :userUuid", {
      //   //   userUuid,
      //   // })
      //   // .orWhere("profile.uuid = :userUuid", {
      //   //   userUuid,
      //   // })
      //   // .leftJoin("profile.messages", "messages")
      //   // .select(["messages.content"])
      //   .take(take)
      //   .skip(offset)
      //   .getMany();

      const feeds = await FollowersEntity.find({
        where: {},
        relations: ["messages"],
      });

      return response.status(StatusCodes.OK).send({
        status: true,
        data: feeds,
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }
}

export const feedController = new FeedController();
