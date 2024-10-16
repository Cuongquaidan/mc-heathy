import { Router } from "express";
import * as appointmentControllers from "../controllers/Appointment.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/getAll").get(verifyAccessToken, appointmentControllers.getAll);
router
    .route("/getByDoctorId")
    .get(verifyAccessToken, appointmentControllers.getAppointmentByDoctorId);
router
    .route("/addAppointment")
    .post(verifyAccessToken, appointmentControllers.addAppointment);
router
    .route("/:id")
    .delete(verifyAccessToken, appointmentControllers.deleteAppointment);
export default router;
