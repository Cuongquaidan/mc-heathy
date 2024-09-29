import connect from "../database/conn.js";
import DoctorModel from "../models/Doctor.model.js";

export async function getAllDoctors(req, res) {
    await connect(); // Đảm bảo kết nối database
    try {
        const doctorsList = await DoctorModel.find(); // Đảm bảo dùng await
        res.status(200).json(doctorsList);
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Doctors Data" });
    }
}
export async function AddDoctor(req, res) {
    await connect();
    try {
        const { name, avatar, dob, speciality } = req.body;
        console.log(name, avatar, dob, speciality);
        const newDoctor = new DoctorModel({ name, avatar, dob, speciality });
        await newDoctor.save();
        res.status(201).json({
            message: "Doctor added successfully",
            doctor: newDoctor,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Error adding doctor" });
    }
}
