// routes file
import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";
import * as specialityControllers from "../controllers/Speciality.controller.js";
import * as appointmentControllers from "../controllers/Appointment.controller.js";

const router = Router();
// doctor
router.route("/doctors/getAll").get(doctorControllers.getAllDoctors);
router.route("/doctors/getDoctorById").get(doctorControllers.getDoctorById);
router.route("/doctors/addDoctor").post(doctorControllers.AddDoctor);
router
    .route("/doctors/getAvailableDoctorsByDate")
    .get(doctorControllers.getAvailableDoctorsByDate);
router
    .route("/doctors/getDoctorsBySpeciality")
    .get(doctorControllers.getDoctorsBySpeciality);
// speciality

router
    .route("/specialitys/getAll")
    .get(specialityControllers.getAllSpecialitys);

// appointment
router.route("/appointments/getAll").get(appointmentControllers.getAll);
router
    .route("/appointments/getByDoctorId")
    .get(appointmentControllers.getAppointmentByDoctorId);

router
    .route("/appointments/addAppointment")
    .post(appointmentControllers.addAppointment);
router.delete("/appointments/:id", appointmentControllers.deleteAppointment);
export default router;
