import connect from "../database/conn.js";
import SpecialityModel from "../models/Speciality.model.js";

export async function getAllSpecialitys(req, res) {
    await connect();
    try {
        const specialitysList = await SpecialityModel.find();
        res.status(200).json(specialitysList);
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find Specialitys Data" });
    }
}
