import mongoose from "mongoose";
import bcrypt from "bcrypt"

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
        default: false
    },
    refereshToken: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

export const User = mongoose.model("User", userSchema)
