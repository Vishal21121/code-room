import express from "express"
import { roomCreateValidator, roomJoinValidator } from "../validators/room.validator.js"
import { validation } from "../middleware/validate.middlewares.js"
import { createRoom, joinRoom, updateCode, getCode } from "../controllers/room.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = express.Router()


router.route("/create-room").post(verifyJWT, roomCreateValidator(), validation, createRoom)
router.route("/join-room").post(verifyJWT, roomJoinValidator(), validation, joinRoom)
router.route("/update-code").patch(verifyJWT, updateCode)
router.route("/get-code").post(verifyJWT, getCode)

export default router