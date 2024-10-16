import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/getAll").get(verifyAccessToken, doctorControllers.getAllDoctors);
router
    .route("/getDoctorById")
    .get(verifyAccessToken, doctorControllers.getDoctorById);
router.route("/addDoctor").post(verifyAccessToken, doctorControllers.AddDoctor);
router
    .route("/getAvailableDoctorsByDate")
    .get(verifyAccessToken, doctorControllers.getAvailableDoctorsByDate);
router
    .route("/getDoctorsBySpeciality")
    .get(verifyAccessToken, doctorControllers.getDoctorsBySpeciality);

export default router;
