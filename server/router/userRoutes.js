import { Router } from "express";
import * as userControllers from "../controllers/user.controller.js";
const router = Router();

router.route("/getUserByID").get(userControllers.getUserByID);

export default router;
