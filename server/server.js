import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.status(201).json("Home GET Request");
});

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
