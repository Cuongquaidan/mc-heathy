import express from "express";
import cors from "cors";
import connect from "./database/conn.js";
import router from "./router/index.js";
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const PORT = process.env.PORT || 8080; 
app.get("/", (req, res) => {
    res.status(201).json("Home GET Request");
});
app.use("/api/v1", router);
connect()
    .then(() => {
        try {
            app.listen(PORT, () => {
                console.log(`Server start at PORT: ${PORT}`);
            });
        } catch (error) {
            console.log(error);
        }
    })
    .catch((error) => {
        console.log(error);
    });
