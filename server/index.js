import express from "express"
import connectToMongoDb from "./db/dbConnect.js"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import roomFeaturesRouter from "./routes/room-features.routes.js"
import { Server } from "socket.io"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const server = http.createServer(app);
const io = new Server(server);

dotenv.config({
    path: "./.env"
})

connectToMongoDb()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/room-features", roomFeaturesRouter)

io.on("connection", (socket) => {
    console.log(socket.id);
})


server.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
})