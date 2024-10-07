// routes/index.js
import { Router } from "express";
import doctorRoutes from "./doctorRoutes.js";
import specialityRoutes from "./specialityRoutes.js";
import appointmentRoutes from "./appointmentRoutes.js";

const router = Router();

// Use routes
router.use("/doctors", doctorRoutes);
router.use("/specialitys", specialityRoutes);
router.use("/appointments", appointmentRoutes);

export default router;
