import { Router } from "express";
import { messageController } from "../../controller/message/message.controller";

const messagesRoute = Router();

messagesRoute.post("/", messageController.postMessage);

messagesRoute.delete("/", messageController.deleteMessage);

messagesRoute.put("/", messageController.updateMessage);

messagesRoute.get("/", messageController.getAllMessages);

export = messagesRoute;
