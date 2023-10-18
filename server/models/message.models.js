import mongoose from "mongoose"
import { AvailableMessageTypes } from "../util/constants"

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
    }
},
    {
        timestamps: true
    }
)

export const Message = mongoose.model("Message", messageSchema)