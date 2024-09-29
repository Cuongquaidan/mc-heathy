// routes file
import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";

const router = Router();

router.route("/doctors/getAll").get(doctorControllers.getAllDoctors);
router.route("/doctors/addDoctor").post(doctorControllers.AddDoctor);
export default router;
