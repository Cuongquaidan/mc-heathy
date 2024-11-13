import { Router } from "express";
import * as MessageController from "../controllers/Message.controller.js";

const router = Router();

router.route("/").post(MessageController.createMessage);
router.route("/:chatId").get(MessageController.getMessages);

export default router;
