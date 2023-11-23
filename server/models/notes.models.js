import mongoose from "mongoose"

const notesSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

export const Notes = mongoose.model("Notes", notesSchema)