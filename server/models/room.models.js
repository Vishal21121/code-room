import mongoose from "mongoose";
import bcrypt from "bcrypt"


const roomSchema = mongoose.Schema({
    name: {
        type: String
    },
    users: {
        type: Array
    },
    code: {
        type: String
    },
    password: {
        type: String
    },
    admin: {
        type: String
    },
    language: {
        type: String
    },
    version: {
        type: String
    }
}, {
    timestamps: true
}
)

roomSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

roomSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Room = mongoose.model("Room", roomSchema)