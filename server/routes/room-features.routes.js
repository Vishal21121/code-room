import express from "express"
import { chatBot } from "../controllers/room-features.controllers.js"
import { verifyJWT } from "../middleware/auth.middlware.js"

const router = express.Router()

router.route("/chat-bot").post(verifyJWT, chatBot)

export default router