import { Router } from "express";
import * as userControllers from "../controllers/User.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";
const router = Router();

router
    .route("/getUserByID")
    .get(verifyAccessToken, userControllers.getUserByID);
router
    .route("/getUserByQueryID")
    .get(verifyAccessToken, userControllers.getUserByQueryID);

router
    .route("/updateUserProfile")
    .patch(verifyAccessToken, userControllers.updateProfile);

export default router;
