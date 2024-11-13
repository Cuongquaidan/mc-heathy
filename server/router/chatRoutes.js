import { Router } from "express";
import * as ChatController from "../controllers/Chat.controller.js";

const router = Router();

router.route("/").post(ChatController.createChat);
router.route("/:userId").get(ChatController.findUserChats);
router.route("/find/:firstId/:secondId").get(ChatController.findChat);

export default router;
