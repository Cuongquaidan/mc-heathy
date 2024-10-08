import connect from "../database/conn.js";
import AppointmentModel from "../models/Appointment.model.js";
import DoctorModel from "../models/Doctor.model.js";

export async function getAllDoctors(req, res) {
    await connect();
    try {
        const doctorsList = await DoctorModel.find().lean();
        const filteredDoctors = doctorsList.map(
            ({ password, ...doctor }) => doctor
        );
        res.status(200).json(filteredDoctors);
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Doctors Data" });
    }
}
export async function getDoctorById(req, res) {
    await connect();
    try {
        const doctorId = req.query.doctorId;
        const doctor = await DoctorModel.findById(doctorId).lean();
        if (!doctor) {
            return res.status(404).send({ error: "Doctor not found" });
        }
        const { password, ...doctorNoPass } = doctor;
        return res.status(200).json(doctorNoPass);
    } catch (error) {
        console.error("Error fetching doctor data:", error);
        return res.status(404).send({ error: "Cannot Find Doctor Data" });
    }
}
export async function AddDoctor(req, res) {
    await connect();
    try {
        const newDoctor = new DoctorModel({ ...req.body });
        await newDoctor.save();
        const doctor = { password, ...newDoctor };
        res.status(201).json({
            message: "Doctor added successfully",
            doctor: doctor,
        });
    } catch (error) {
        return res.status(500).send({ error: "Error adding doctor" });
    }
}

export async function getAvailableDoctorsByDate(req, res) {
    await connect();
    try {
        const dateString = req.query.date; // Lấy ngày từ query parameters

        // Tạo một đối tượng Date từ chuỗi được cung cấp
        const startOfDay = new Date(dateString);
        const endOfDay = new Date(dateString);

        startOfDay.setUTCHours(0, 0, 0, 0); // Đặt bắt đầu từ 00:00:00 UTC
        endOfDay.setUTCHours(23, 59, 59, 999);

        const appointmentDoctors = await AppointmentModel.find({
            dateTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })
            .select("doctorId")
            .lean();

        const appointmentDoctorsId = appointmentDoctors.map(
            (appointment) => appointment.doctorId
        );
        const availableDoctors = await DoctorModel.find({
            _id: { $nin: appointmentDoctorsId },
        }).lean();
        const filteredDoctors = availableDoctors.map(
            ({ password, ...doctor }) => doctor
        );

        return res.status(200).json(filteredDoctors);
    } catch (error) {
        return res
            .status(404)
            .send({ error: "Cannot Find Available Doctors Data" });
    }
}
export async function getDoctorsBySpeciality(req, res) {
    await connect();
    try {
        const speciality = req.query.speciality;
        const query = speciality ? { speciality } : {};

        const doctors = await DoctorModel.find(query).lean();

        const filteredDoctors = doctors.map(
            ({ password, ...doctor }) => doctor
        );

        return res.status(200).json(filteredDoctors);
    } catch (error) {
        return res
            .status(404)
            .send({ error: "Cannot find doctors by speciality" });
    }
}
