import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cookieKeyName } from "../utils/common.utils";
import jwt from "jsonwebtoken";

export interface IVerifyTokenResponse {
  userUuid: string;
}

// Function to verify the JWT token and return the decoded data
export const verifyToken = async (token): Promise<IVerifyTokenResponse> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      throw new Error(`No JWT_SECRET exists`);
    }
    // Verify the token using the JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const tokenHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.signedCookies[cookieKeyName];

    if (!token) {
      throw new Error("cookies not found");
    }

    const { userUuid } = await verifyToken(token);

    request[`user`] = { userUuid };

    next();
  } catch (error: any) {
    return response.status(StatusCodes.UNAUTHORIZED).send({
      status: false,
      message: error.message,
    });
  }
};
