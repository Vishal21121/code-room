import express from "express"
import { chatBot, createChatContainer, createChat, getChatContainer, getChats } from "../controllers/chat-bot.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { addBoard, updateBoard, getBoardContent } from "../controllers/board.controllers.js"
import { sendMessage, fetchMessages } from "../controllers/message.controller.js"
import { validation } from "../middleware/validate.middlewares.js"
import { messageValidator } from "../validators/message.validator.js"
import { createChatContainerValidator, createChatValidator } from "../validators/chat-bot.validator.js"

const router = express.Router()

router.route("/chat-bot").post(verifyJWT, chatBot)
router.route("/create-chatContainer").post(verifyJWT, createChatContainerValidator(), validation, createChatContainer)
router.route("/get-chatContainer").post(verifyJWT, getChatContainer)
router.route("/get-chats").post(verifyJWT, getChats)
router.route("/create-chat").post(verifyJWT, createChatValidator(), validation, createChat)
router.route("/update-board").patch(verifyJWT, updateBoard)
router.route("/add-board").post(verifyJWT, addBoard)
router.route("/get-content").post(verifyJWT, getBoardContent)
router.route("/send-message").post(verifyJWT, messageValidator(), validation, sendMessage)
router.route("/get-message").post(verifyJWT, fetchMessages)


export default router