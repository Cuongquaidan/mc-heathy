import connect from "../database/conn.js";
import AppointmentModel from "../models/Appointment.model.js";

export async function getAll(req, res) {
    await connect();
    try {
        const appointmentsList = await AppointmentModel.find();
        res.status(200).json(appointmentsList);
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Appointments Data" });
    }
}
