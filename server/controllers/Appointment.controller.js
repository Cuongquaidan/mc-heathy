import connect from "../database/conn.js";
import AppointmentModel from "../models/Appointment.model.js";

export async function getAll(req, res) {
    await connect();
    try {
        const appointmentsList = await AppointmentModel.find();
        return res.status(200).json(appointmentsList);
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Appointments Data" });
    }
}

export async function getAppointmentByDoctorId(req, res) {
    await connect();
    try {
        const doctorId = req.query.doctorId;
        const appointmentsList = await AppointmentModel.find({
            doctorId: doctorId,
        })
            .select("dateTime")
            .lean();

        return res.status(200).json(appointmentsList);
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Appointments Data" });
    }
}

export async function addAppointment(req, res) {
    await connect();
    try {
        const newAppointment = new AppointmentModel({ ...req.body });
        await newAppointment.save();
        return res.status(200).json({
            message: "Add appointment successfully",
            newAppointment,
        });
    } catch (error) {
        return res.status(500).send({ error: "Error adding appointment" });
    }
}
