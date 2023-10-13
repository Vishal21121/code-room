import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    message: {
        type: String,
    },
    roomId: {
        type: String
    },
    username: {
        type: String
    }
},
    {
        timestamps: true
    }
)

export const Message = mongoose.model("Message", messageSchema)