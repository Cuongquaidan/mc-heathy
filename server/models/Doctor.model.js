import mongoose, { Model, Schema, Document } from "mongoose";
const DoctorSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: { type: String, required: true },
        dob: { type: Date, required: true },
        speciality: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        fees: { type: Number, required: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    { timestamps: true }
);

const DoctorModel =
    mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

export default DoctorModel;
