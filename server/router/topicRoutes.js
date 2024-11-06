import { Router } from "express";
import * as topicControllers from "../controllers/Topic.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/addTopic").post(verifyAccessToken, topicControllers.AddTopic);

export default router;
