import express from "express"
import connectToMongoDb from "./db/dbConnect.js"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import roomFeaturesRouter from "./routes/room-features.routes.js"
import { Server } from "socket.io"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
import ACTIONS from "./util/Actions.js"

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

// !TODO: use database for this
const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // io.sockets.adapter.rooms.get(roomId) will return Map and here we are converting it to array 
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on("connection", (socket) => {
    // console.log(socket.id);
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        console.log(roomId, username);
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        console.log({ clients });
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
})


server.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
})