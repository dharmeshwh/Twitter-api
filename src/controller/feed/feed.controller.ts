import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IVerifyTokenResponse } from "../../middlewares/token-handler";
import { MessageEntity } from "../../typeorm/entities/message.entity";

class FeedController {
  async getFeeds(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { page = 1 } = request.query;

      const take = 50;
      const offset = (Number(page) - 1) * take;

      const messages = await MessageEntity.createQueryBuilder("message")
        .leftJoin("message.follower", "follower")
        .where("follower.userUuid = :userUuid", {
          userUuid,
        })
        .select([
          "message.content",
          "message.userUuid",
          "message.uuid",
          "message.updatedAt",
        ])
        .orderBy("message.updatedAt", "DESC")
        .take(take)
        .skip(offset)
        .getMany();

      return response.status(StatusCodes.OK).send({
        status: true,
        data: messages,
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
