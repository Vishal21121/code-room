import express from "express"
import { chatBot } from "../controllers/chat-bot.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { addBoard, updateBoard, getBoardContent } from "../controllers/board.controllers.js"
import { sendMessage } from "../controllers/message.controller.js"
import { validation } from "../middleware/validate.middlewares.js"
import { messageValidator } from "../validators/message.validator.js"

const router = express.Router()

router.route("/chat-bot").post(verifyJWT, chatBot)
router.route("/update-board").patch(verifyJWT, updateBoard)
router.route("/add-board").post(verifyJWT, addBoard)
router.route("/get-content").post(verifyJWT, getBoardContent)
router.route("/send-message").post(verifyJWT, messageValidator(), validation, sendMessage)

export default router