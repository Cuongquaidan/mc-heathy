import connect from "../database/conn.js";
import UserModel from "../models/User.model.js";

export async function getUserByID(req, res) {
    await connect();
    try {
        const userID = req.query.userID;
        const user = await UserModel.findById(userID);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).send({ error: "Can not find User" });
    }
}
