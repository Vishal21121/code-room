import mongoose from "mongoose";

const boardSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: null
    }
},
    {
        timestamps: true
    }
)

export const Board = mongoose.model("Board", boardSchema)