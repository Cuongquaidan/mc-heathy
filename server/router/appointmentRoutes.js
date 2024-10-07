import { Router } from "express";
import * as appointmentControllers from "../controllers/Appointment.controller.js";

const router = Router();

router.route("/getAll").get(appointmentControllers.getAll);
router
    .route("/getByDoctorId")
    .get(appointmentControllers.getAppointmentByDoctorId);
router.route("/addAppointment").post(appointmentControllers.addAppointment);
router.delete("/:id", appointmentControllers.deleteAppointment);

export default router;
