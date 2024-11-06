import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/getAll").get(verifyAccessToken, doctorControllers.getAllDoctors);
router
    .route("/getDoctorById")
    .get(verifyAccessToken, doctorControllers.getDoctorById);
router.route("/addDoctor").post(doctorControllers.AddDoctor);
router
    .route("/updateDoctor")
    .patch(verifyAccessToken, doctorControllers.updateDoctor);
router
    .route("/getAvailableDoctorsByDate")
    .get(verifyAccessToken, doctorControllers.getAvailableDoctorsByDate);
router
    .route("/getDoctorsBySpeciality")
    .get(verifyAccessToken, doctorControllers.getDoctorsBySpeciality);
router
    .route("/deleteDoctor")
    .delete(verifyAccessToken, doctorControllers.deleteDoctor);

export default router;
