import express from "express"
import { chatBot, createChatContainer, createChat, getChatContainer, getChats } from "../controllers/chat-bot.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { addBoard, updateBoard, getBoardContent } from "../controllers/board.controllers.js"
import { sendMessage, fetchMessages } from "../controllers/message.controller.js"
import { validation } from "../middleware/validate.middlewares.js"
import { messageValidator } from "../validators/message.validator.js"
import { createChatContainerValidator, createChatValidator } from "../validators/chat-bot.validator.js"
import { notesCreateValidator } from "../validators/notes.validator.js"
import { createNotes, getAllNotes } from "../controllers/notes.controllers.js"

const router = express.Router()

router.route("/chat-bot").post(verifyJWT, chatBot)
router.route("/create-chatContainer").post(verifyJWT, createChatContainerValidator(), validation, createChatContainer)
router.route("/get-chatContainer").get(verifyJWT, getChatContainer)
router.route("/get-chats").get(verifyJWT, getChats)
router.route("/create-chat").post(verifyJWT, createChatValidator(), validation, createChat)
router.route("/update-board").patch(verifyJWT, updateBoard)
router.route("/add-board").post(verifyJWT, addBoard)
router.route("/get-content").get(verifyJWT, getBoardContent)
router.route("/send-message").post(verifyJWT, messageValidator(), validation, sendMessage)
router.route("/get-message").get(verifyJWT, fetchMessages)

// notes routes
router.route("/create-notes").post(verifyJWT, notesCreateValidator(), validation, createNotes)
router.route("/get-notes").get(verifyJWT, getAllNotes)


export default router