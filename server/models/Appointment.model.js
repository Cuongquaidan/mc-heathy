import mongoose, { Schema, Types } from "mongoose";

const AppointmentSchema = new Schema(
    {
        userId: { type: Types.ObjectId, required: true },
        dateTime: { type: Date, required: true },
        doctorId: { type: Types.ObjectId, required: true },
        doctorName: { type: String, required: true },
        userName: { type: String, required: true },
        doctorPhone: { type: String, required: true },
        userPhone: { type: String, required: true },
        doctorAvatar: { type: String, required: true },
        userAvatar: { type: String, required: true },
        fees: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const AppointmentModel =
    mongoose.models.Appointment ||
    mongoose.model("Appointment", AppointmentSchema);
export default AppointmentModel;
