import mongoose, { Model, Schema, Document } from "mongoose";

const DoctorSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    dob: { type: Date, required: true },
    speciality: { type: String, required: true },
});

const DoctorModel =
    mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

export default DoctorModel;
