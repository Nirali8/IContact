import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
dotenv.config({path:"./.env"})

const hostName: string = "127.0.0.1";
const port: string | number | undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string|undefined = process.env.MONGO_DB_DATABASE;


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))//passing from data in request body

app.get("/", (request: Request, response: Response) => {
    response.status(200);
    response.json({
        msg: "Welcome To Express Server"
    });
});

//router Configuration
import groupRouter from "./router/groupRouter"
app.use("/groups", groupRouter);

import userRouter from './router/userRouter';
app.use("/user",userRouter);

if (port) {
    app.listen(Number(port), () => {
        if (dbUrl && dbName) {
            mongoose.connect(dbUrl, { dbName: dbName })
                .then((dbResponse) => {
                    console.log("Connection Establish....");
                })
                .catch((error) => {
                    console.error(error);
                    process.exit(0);//Forse Stop Express Server
                });
        }
        console.log(`Express server is started at http://${hostName}:${port}`);
});
}