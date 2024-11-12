import { Router } from "express";
import * as appointmentControllers from "../controllers/Appointment.controller.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = Router();

router.route("/get").get(verifyAccessToken, appointmentControllers.get);
router
    .route("/getByDoctorId")
    .get(verifyAccessToken, appointmentControllers.getAppointmentByDoctorId);
router
    .route("/getByDoctorIdPagination")
    .get(
        verifyAccessToken,
        appointmentControllers.getAppointmentByDoctorIdPagination
    );
router
    .route("/getAppointmentByUserId")
    .get(verifyAccessToken, appointmentControllers.getAppointmentByUserId);

router
    .route("/getAppointmentInNext3DaysByDoctorId")
    .get(
        verifyAccessToken,
        appointmentControllers.getAppointmentInNext3DaysByDoctorId
    );
router.route("/addAppointment").post(appointmentControllers.addAppointment);
router.route("/:id").delete(appointmentControllers.deleteAppointment);

export default router;
