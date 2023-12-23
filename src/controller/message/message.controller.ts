import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IVerifyTokenResponse } from "../../middlewares/token-handler";
import { MessageEntity } from "../../typeorm/entities/message.entity";

class MessageController {
  async postMessage(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { content } = request.body;

      const T = new MessageEntity();
      T.userUuid = userUuid;
      T.content = content;

      await T.save();

      return response
        .status(StatusCodes.CREATED)
        .send({ status: true, message: "success" });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async deleteMessage(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { uuid } = request.body;

      const message = await MessageEntity.findOne({
        where: {
          uuid,
          userUuid,
        },
        select: ["uuid"],
      });

      if (!message) {
        return response.status(StatusCodes.NOT_FOUND).send({
          status: false,
          message: "message not found",
        });
      }

      await MessageEntity.delete({
        uuid,
      });

      return response.status(StatusCodes.OK).send({
        status: true,
        message: "message deleted",
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async updateMessage(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;
      const { uuid, content } = request.body;

      const message = await MessageEntity.findOne({
        where: {
          uuid,
          userUuid,
        },
        select: ["uuid"],
      });

      if (!message) {
        return response.status(StatusCodes.NOT_FOUND).send({
          status: false,
          message: "message not found",
        });
      }

      await MessageEntity.update(
        {
          uuid,
          userUuid,
        },
        {
          content,
        }
      );

      return response.status(StatusCodes.OK).send({
        status: true,
        message: "message updated",
      });
    } catch (error: any) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllMessages(request: Request, response: Response) {
    try {
      const { userUuid } = request[`user`] as IVerifyTokenResponse;

      const messages = await MessageEntity.find({
        where: {
          userUuid,
        },
        order: {
          updatedAt: "DESC",
        },
        select: ["uuid", "content"],
      });

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

export const messageController = new MessageController();
