import express from "express"
import { roomValidator } from "../validators/room.validator.js"
import { validation } from "../middleware/validate.middlewares.js"
import { createRoom } from "../controllers/room.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = express.Router()


router.route("/create-room").post(verifyJWT, roomValidator(), validation, createRoom)

export default router