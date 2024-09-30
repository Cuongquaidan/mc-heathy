// routes file
import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";
import * as specialityControllers from "../controllers/Speciality.controller.js";

const router = Router();
// doctor
router.route("/doctors/getAll").get(doctorControllers.getAllDoctors);
router.route("/doctors/addDoctor").post(doctorControllers.AddDoctor);

// speciality

router
    .route("/specialitys/getAll")
    .get(specialityControllers.getAllSpecialitys);
export default router;
