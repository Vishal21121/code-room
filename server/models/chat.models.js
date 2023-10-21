import mongoose from "mongoose"
import { AvailableSenderTypes } from "../util/constants.js"

const chatContainerSchema = mongoose.Schema({
    name: {
        type: String
    },
    roomId: {
        type: String
    }
})

const chatSchema = mongoose.Schema({
    chatContainerId: {
        type: String
    },
    content: {
        type: String
    },
    senderType: {
        type: String,
        enum: AvailableSenderTypes
    },
})

export const Chat = mongoose.model("Chat", chatSchema)
export const ChatContainer = mongoose.model("ChatContainer", chatContainerSchema)
