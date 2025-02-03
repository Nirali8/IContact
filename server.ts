import express, { Application, Request, Response } from 'express';
import userRouter from './router/userRouter';
import dotenv from "dotenv"
import mongoose from 'mongoose';
dotenv.config({path:"./.env"})

const hostName: string = "127.0.0.1";
const port: string | number | undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string|undefined = process.env.MONGO_DB_DATABASE;


const app: Application = express();

mongoose.connect(dbUrl, { dbName: dbName })
    .then(() => {console.log("Database Connection is ready...")
     })
.catch((err)=>{console.log("Database Is not Connected",err)
})

app.get("/", (request: Request, response: Response) => {
    response.status(200);
    response.json({
        msg: "Welcome To Express Server"
    });
});

//router Configuration

app.use("/api/users", userRouter);

app.listen(Number(port), hostName, () => {
    console.log(`Express Server is started at http://${hostName}:${port}`);
});