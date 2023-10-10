import { Room } from "../models/room.models.js"
import mongoose from "mongoose"

export const createRoom = async (req, res) => {
    const { users, password, admin, name } = req.body
    try {
        const roomGot = await Room.findOne({ name })
        if (roomGot) {
            return res.status(403).json({
                statusCode: 403,
                status: "failure",
                data: {
                    statusCode: 403,
                    message: "Enter another room name"
                }
            })
        }
        const roomCreated = await Room.create({ name, users, code: "", password, admin, language: "" })
        const roomFound = await Room.findOne({ _id: roomCreated._id }).select("-password ");
        if (!roomFound) {
            return res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    message: "Internal Server error",
                }
            })
        }
        return res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                message: "room created successfully",
                value: roomFound,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }
}

export const joinRoom = async (req, res) => {
    const { name, password } = req.body
    try {
        const roomExist = await Room.findOne({ name })
        if (!roomExist) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "Room does not exist"
                }
            })
        }
        const passwordCorrect = await roomExist.isPasswordCorrect(password)
        if (!passwordCorrect) {
            return res.status(401).json({
                status: "failure",
                data: {
                    statusCode: 401,
                    message: "please enter correct credentials"
                }
            })
        }
        const roomSend = await Room.findOne({ name }).select("-password")
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: roomSend
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }
}

export const updateCode = async (req, res) => {
    const { code, language, roomId } = req.body
    if (!roomId) {
        return res.status(404).json({
            status: "failure",
            data: {
                statusCode: 404,
                message: "Room id is not provided"
            }
        })
    }
    if (!language) {
        return res.status(404).json({
            status: "failure",
            data: {
                statusCode: 404,
                message: "Code language is not provided"
            }
        })
    }
    try {
        const room = await Room.findById({ _id: roomId })
        if (!room) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "Enter correct room id"
                }
            })
        }
        await Room.findOneAndUpdate({ _id: roomId }, { $set: { code: code, language: language } })
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                message: "updated the code"
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error" || error.message
            }
        })
    }
}

export const getCode = async (req, res) => {
    const { roomId } = req.body

    if (!roomId) {
        return res.status(404).json({
            status: "failure",
            data: {
                statusCode: 404,
                message: "Room id is not provided"
            }
        })
    }
    try {
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({
                status: "failure",
                data: {
                    statusCode: 400,
                    message: "Enter correct room id"
                }
            });
        }
        const room = await Room.findById({ _id: roomId }).select("-password")
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: room
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error" || error.message
            }
        })
    }
}