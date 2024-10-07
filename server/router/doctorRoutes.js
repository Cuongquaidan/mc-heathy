import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";

const router = Router();

router.route("/getAll").get(doctorControllers.getAllDoctors);
router.route("/getDoctorById").get(doctorControllers.getDoctorById);
router.route("/addDoctor").post(doctorControllers.AddDoctor);
router
    .route("/getAvailableDoctorsByDate")
    .get(doctorControllers.getAvailableDoctorsByDate);
router
    .route("/getDoctorsBySpeciality")
    .get(doctorControllers.getDoctorsBySpeciality);

export default router;
