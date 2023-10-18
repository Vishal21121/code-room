import mongoose from "mongoose"
import { AvailableMessageTypes } from "../util/constants.js"

const messageSchema = mongoose.Schema({
    message: {
        type: String,
    },
    roomId: {
        type: String
    },
    username: {
        type: String
    },
    messageType: {
        type: String,
        enum: AvailableMessageTypes
    },
    imageUrl: {
        type: String
    }
},
    {
        timestamps: true
    }
)

export const Message = mongoose.model("Message", messageSchema)