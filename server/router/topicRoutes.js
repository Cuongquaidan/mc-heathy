import { Router } from "express";
import * as topicControllers from "../controllers/Topic.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/addTopic").post(verifyAccessToken, topicControllers.AddTopic);
router.route("/getAll").get(verifyAccessToken, topicControllers.getAll);
router.route("/getById").get(verifyAccessToken, topicControllers.getById);
router.route("/deleteTopic").delete(verifyAccessToken, topicControllers.deleteTopic);
router.route("/updateTopic").put(verifyAccessToken, topicControllers.updateTopic);

export default router;
