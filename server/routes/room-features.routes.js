import express from "express"
import { chatBot } from "../controllers/chat-bot.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { addBoard, updateBoard, getBoardContent } from "../controllers/board.controllers.js"

const router = express.Router()

router.route("/chat-bot").post(verifyJWT, chatBot)
router.route("/update-board").put(verifyJWT, updateBoard)
router.route("/add-board").post(verifyJWT, addBoard)
router.route("/get-content").get(verifyJWT, getBoardContent)

export default router