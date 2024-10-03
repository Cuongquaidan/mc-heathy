import mongoose, { Schema } from "mongoose";

const SpecialitySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
});

const SpecialityModel =
    mongoose.models.Speciality ||
    mongoose.model("Speciality", SpecialitySchema);
export default SpecialityModel;
