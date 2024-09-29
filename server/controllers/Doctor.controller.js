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
