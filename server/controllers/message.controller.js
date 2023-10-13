import { Message } from "../models/message.models.js";
import { Room } from "../models/room.models.js"
import mongoose from "mongoose";


export const sendMessage = async (req, res) => {
    const { message, roomId, username } = req.body
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
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "no room present with this roomId"
                }
            })
        }
        if (!room.users.includes(username)) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "no user exits with this username in this room"
                }
            })
        }
        const messageSaved = await Message.create({ message, roomId, username })
        const messageGot = await Message.findOne({ _id: messageSaved._id })
        if (!messageGot) {
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
                message: "message created successfully",
                value: messageGot,
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: error.message || "Internal server error"
            }
        })
    }
}

export const fetchMessages = async (req, res) => {
    const { roomId } = req.body
    if (!roomId) {
        return res.status(400).json({
            status: "failure",
            data: {
                statusCode: 400,
                message: "roomId not provided"
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
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "no room present with this roomId"
                }
            })
        }
        const messages = await Message.find({ roomId: roomId })
        res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: messages
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: error.message || "Internal server error"
            }
        })
    }

}