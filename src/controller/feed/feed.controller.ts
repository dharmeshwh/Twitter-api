/**
 * @file FeedController.ts
 * @description Controller for handling feed-related operations in a Node.js application using Express.js.
 */

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IVerifyTokenResponse } from "../../middlewares/token-handler";
import { MessageEntity } from "../../typeorm/entities/message.entity";

/**
 * Controller class for handling feed-related operations.
 */
class FeedController {
  /**
   * Get feeds for the authenticated user.
   * @param {Request} request - Express request object.
   * @param {Response} response - Express response object.
   * @returns {Response} The HTTP response containing feed data or an error message.
   */
  async getFeeds(request: Request, response: Response): Promise<Response> {
    try {
      // Extract user UUID from the authenticated token.
      const { userUuid } = request[`user`] as IVerifyTokenResponse;

      // Extract the page parameter from the request query or default to page 1.
      const { page = 1 } = request.query;

      // Define pagination parameters.
      const take = 50;
      const offset = (Number(page) - 1) * take;

      // Query the database to retrieve messages for the user's followers.
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

      // Return a success response with the fetched feed data.
      return response.status(StatusCodes.OK).send({
        status: true,
        data: messages,
      });
    } catch (error: any) {
      // Return an error response in case of any exception.
      return response.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }
}

// Export an instance of the FeedController class.
export const feedController = new FeedController();
