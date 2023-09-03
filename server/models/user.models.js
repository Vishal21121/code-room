import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
    },
    refereshToken: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)