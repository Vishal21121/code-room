import express from "express"
import connectToMongoDb from "./db/dbConnect.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const app = express()

connectToMongoDb()


app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
})