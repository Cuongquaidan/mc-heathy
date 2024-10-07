// routes/specialityRoutes.js
import { Router } from "express";
import * as specialityControllers from "../controllers/Speciality.controller.js";

const router = Router();

// Speciality routes
router.route("/getAll").get(specialityControllers.getAllSpecialitys);

export default router;
