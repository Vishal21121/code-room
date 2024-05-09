import express from "express";
import connectToMongoDb from "./db/dbConnect.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import roomFeaturesRouter from "./routes/room-features.routes.js";
import roomRouter from "./routes/room.routes.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import ACTIONS from "./util/Actions.js";
import path from "path";
import { fileURLToPath } from "url";
import Docker from "dockerode";
import { createWriteStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config({
  path: "./.env",
});

connectToMongoDb();

const corsOptions = {
  origin: ["http://localhost:5173", process.env.ALLOWED_ORIGIN],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/room-features", roomFeaturesRouter);
app.use("/api/v1/room/", roomRouter);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

// TODO: use database for this
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

// TODO: NOT A GOOD WAY
let containerInfo = {}; // storing user's container information

const spinContainer = async (socket, socketId) => {
  const docker = new Docker();
  try {
    docker
      .createContainer({
        Image: "my-react-image:0.0.1.RELEASE",
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        OpenStdin: true,
        ExposedPorts: {
          "5173/tcp": {},
        },
        HostConfig: {
          PortBindings: {
            "5173/tcp": [
              {
                HostPort: "3000",
              },
            ],
          },
        },
      })
      .then(function (container) {
        containerInfo[socketId] = { container, id: container.id };
        container.start(async function (data) {
          const exec = await container.exec({
            Cmd: ["/bin/sh"],
            AttachStderr: true,
            AttachStdout: true,
            AttachStdin: true,
            Tty: true,
          });
          exec.start({ hijack: true, stdin: true }, function (err, stream) {
            if (err) {
              console.log("err", err);
              return;
            }
            stream.on("data", (chunk) => {
              console.log("data from container", chunk);
              socket.emit("data", chunk);
            });
            socket.on("data", (data) => {
              console.log("data received", data);
              stream.write(data);
            });
          });
        });
      });
    console.log(`container started`);
  } catch (error) {
    console.log("error", error);
  }
};

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
    spinContainer(socket, socket.id);
  });

  socket.on(ACTIONS.BOARD_CHANGE, ({ roomId, elements }) => {
    // console.log({ elements });
    socket.to(roomId).emit(ACTIONS.BOARD_CHANGE, { elements });
  });

  socket.on(ACTIONS.PERMISSION_CHANGE, ({ roomId, changedPermissionUser }) => {
    socket
      .to(roomId)
      .emit(ACTIONS.PERMISSION_CHANGE, { changedPermissionUser });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ code, roomId, language, version }) => {
    socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code, language, version });
  });

  socket.on(ACTIONS.MESSAGE_SEND, ({ roomId, value }) => {
    io.in(roomId).emit(ACTIONS.MESSAGE_SEND, { roomId, value });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
    if (containerInfo[socket.id]) {
      const { container, id } = containerInfo[socket.id];
      container?.stop(id);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
