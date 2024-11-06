import connect from "../database/conn.js";
import UserModel from "../models/User.model.js";

export async function getUserByID(req, res) {
    await connect();
    try {
        const userID = req.user.id;
        const user = await UserModel.findById(userID).lean();
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        const { password, ...userNoPass } = user;
        return res.status(200).json(userNoPass);
    } catch (error) {
        return res.status(404).send({ error: "Can not find User" });
    }
}
export async function updateProfile(req, res) {
    await connect();
    try {
        const userID = req.user.id;
        const { name, phone, avatar, dob, gender } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(userID, {
            name,
            phone,
            avatar,
            dob,
            gender,
        }).lean();

        if (!updatedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(404).send({ error: "Can not update user profile" });
    }
}
