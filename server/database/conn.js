import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
async function connect() {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9rxph.mongodb.net/mcheathy?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(uri);
    console.log("Connected database");
    return db;
}
export default connect;
