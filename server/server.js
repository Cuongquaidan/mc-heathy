import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

app.get("/", (req, res) => {
    res.status(201).json("Home GET Request");
});
app.use("/api/v1", router);
connect()
    .then(() => {
        try {
            app.listen(port, () => {
                console.log(`Server start at port: ${port}`);
            });
        } catch (error) {
            console.log(error);
        }
    })
    .catch((error) => {
        console.log("Invalid connection");
    });
