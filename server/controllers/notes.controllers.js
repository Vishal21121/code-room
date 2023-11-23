import { Notes } from "../models/notes.models.js";
import { Room } from "../models/room.models.js";
import mongoose from "mongoose";

// Create a new Note
export const createNotes = async (req, res) => {
    const { roomId, title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({
            status: "failure",
            data: {
                statusCode: 400,
                message: "Enter correct room id"
            }
        });
    }
    try {
        const roomGot = await Room.findById(roomId)
        if (!roomGot) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "no room exists with this roomId"
                }
            })
        }
        const notesCreated = await Notes.create({ roomId, title, content })
        console.log({ notesCreated });
        const notesGot = await Notes.findById(notesCreated)
        if (!notesGot) {
            return res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    message: "Internal server error"
                }
            })
        }
        return res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                message: "notes created successfully",
                value: notesGot
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
// Retrieve all notes
export const getAllNotes = async (req, res) => {
    const roomId = req.query.roomId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({
            status: "failure",
            data: {
                statusCode: 400,
                message: "Enter correct room id"
            }
        });
    }
    try {
        const notesGot = await Notes.find({ roomId })
        if (!notesGot) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "no notes exists with this roomId"
                }
            })
        }
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                message: "notes fetched successfully",
                value: notesGot
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
// update a note
// Delete a note