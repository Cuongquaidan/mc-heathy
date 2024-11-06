import { error } from "console";
import connect from "../database/conn.js";
import AppointmentModel from "../models/Appointment.model.js";

export async function get(req, res) {
    await connect();
    try {
        const page = parseInt(req.query.page) || 1; // Nếu không có `page` thì mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Nếu không có `limit` thì mặc định là 10
        const searchPatientPhone = req.query.patientPhone || "";
        const offset = (page - 1) * 20; // Mặc định 1 trang có 20 lịch
        const total = await AppointmentModel.countDocuments();
        const appointmentsList = await AppointmentModel.find({
            userPhone: { $regex: searchPatientPhone },
        })
            .skip(offset)
            .limit(limit)
            .lean();
        return res.status(200).json({ appointmentsList, total });
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
export async function getAppointmentByUserId(req, res) {
    await connect();
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1; // Nếu không có `page` thì mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Nếu không có `limit` thì mặc định là 10
        const offset = (page - 1) * 20; // Mặc định 1 trang có 20 lịch
        const total = await AppointmentModel.find({
            userId,
        }).countDocuments();

        const appointmentsList = await AppointmentModel.find({
            userId,
        })
            .skip(offset)
            .limit(limit)
            .lean();

        return res.status(200).json({ appointmentsList, total });
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Appointments Data" });
    }
}
export async function addAppointment(req, res) {
    await connect();
    try {
        const newAppointment = new AppointmentModel({ ...req.body });
        const appointmentDate = new Date(newAppointment.dateTime);
        appointmentDate.setHours(0, 0, 0, 0);
        const existingAppointment = await AppointmentModel.findOne({
            doctorId: newAppointment.doctorId,
            dateTime: {
                $gte: appointmentDate,
                $lt: new Date(appointmentDate.getTime() + 24 * 60 * 60 * 1000),
            },
        });

        if (existingAppointment) {
            return res
                .status(409)
                .send({ message: "Appointment already exists for this date." });
        }

        await newAppointment.save();
        return res.status(200).json({
            message: "Add appointment successfully",
            newAppointment,
        });
    } catch (error) {
        return res.status(500).send({ error: "Error adding appointment" });
    }
}

export async function deleteAppointment(req, res) {
    await connect();
    try {
        const appointment_id = req.params.id;
        const deletedAppointment = await AppointmentModel.findByIdAndDelete(
            appointment_id
        );
        if (!deletedAppointment)
            return res.status(404).send({ error: "Appointment not found" });
        return res.status(200).json({
            message: "Appointment deleted successfully",
            deletedAppointment,
        });
    } catch (error) {
        return res.status(500).send({ error: "Error deleting appointment" });
    }
}
