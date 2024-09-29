// routes file
import { Router } from "express";
import * as doctorControllers from "../controllers/Doctor.controller.js";

const router = Router();

router.route("/doctors/getAll").get(doctorControllers.getAllDoctors);
export default router;
