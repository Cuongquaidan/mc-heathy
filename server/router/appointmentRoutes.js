import { Router } from "express";
import * as appointmentControllers from "../controllers/Appointment.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/get").get(verifyAccessToken, appointmentControllers.get);
router
    .route("/getByDoctorId")
    .get(verifyAccessToken, appointmentControllers.getAppointmentByDoctorId);
router.route("/addAppointment").post(appointmentControllers.addAppointment);
router.route("/:id").delete(appointmentControllers.deleteAppointment);
export default router;
