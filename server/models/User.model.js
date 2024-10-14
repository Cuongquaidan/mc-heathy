import mongoose, { Schema } from "mongoose";
import { type } from "os";

const UserScheme = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: Boolean, required: true },
    avatar: { type: String, required: true },
    dob: { type: Date, required: true },
    role: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserScheme);
export default UserModel;
