import { Router } from "express";
import { messageController } from "../../controller/message/message.controller";
import { validate } from "../../middlewares/validator";
import {
  commonUuidBodyContract,
  postMessageContract,
  updateMessageContract,
} from "./message.contract";

const messagesRoute = Router();

messagesRoute.post(
  "/",
  validate(postMessageContract),
  messageController.postMessage
);

messagesRoute.delete(
  "/",
  validate(commonUuidBodyContract),
  messageController.deleteMessage
);

messagesRoute.put(
  "/",
  validate(updateMessageContract),
  messageController.updateMessage
);

messagesRoute.get("/", messageController.getAllMessages);

export = messagesRoute;
