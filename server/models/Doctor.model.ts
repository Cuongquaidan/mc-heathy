import mongoose, { Model, Schema, Document } from "mongoose";

interface IDoctor extends Document {
    name: string;
    avatar: string;
    dob: Date;
    speciality: string;
}

const DoctorSchema: Schema<IDoctor> = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    dob: { type: Date, required: true },
    speciality: { type: String, required: true },
});

const DoctorModel: Model<IDoctor> =
    mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default DoctorModel;
