import express from "express"
import connectToMongoDb from "./db/dbConnect.js"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"

dotenv.config({
    path: "./.env"
})

const app = express()

connectToMongoDb()

app.use(express.json())

app.use("/api/v1/users", userRouter)


app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
})