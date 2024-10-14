import { Router } from "express";
import * as mailController from "../controllers/mailerController.js";
import * as authController from "../controllers/Auth.controller.js";
import { localVariables } from "../middlewares/auth.js";

const router = Router();

router
    .route("/register/otp")
    .post(authController.verifyEmail, localVariables, mailController.sendOTP);
router.route("/register/verify-otp/:otp").get(mailController.verifyOTP);
router.route("/register").post(authController.register);

export default router;
// authController.verifyEmail, localVariables, mailController.sendOTP