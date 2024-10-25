// routes/specialityRoutes.js
import { Router } from "express";
import * as specialityControllers from "../controllers/Speciality.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

// Speciality routes
router
    .route("/getAll")
    .get(verifyAccessToken, specialityControllers.getAllSpecialitys);

export default router;
