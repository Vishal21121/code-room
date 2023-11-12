import { Board } from "../models/board.models.js"

export const addBoard = async (req, res) => {
    const { roomId } = req.body
    if (!roomId) {
        return res.status(404).json({
            status: "failure",
            data: {
                statusCode: 404,
                message: "roomId is required"
            }
        })
    }
    try {
        const board = await Board.create({ roomId, "content": "" })
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 201,
                message: "board created successfully",
                value: board
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

export const updateBoard = async (req, res) => {
    const { roomId, content } = req.body
    if (!roomId) {
        return res.status(404).json({
            status: "failure",
            data: {
                statusCode: 404,
                message: "enter the roomId"
            }
        })
    }
    try {
        const board = await Board.findOne({ roomId })
        if (!board) {
            return res.status(404).json({
                status: "failure",
                data: {
                    statusCode: 404,
                    message: "enter correct roomId"
                }
            })
        }
        const boardGot = await Board.updateOne({ roomId }, { $set: { content: content } })
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                message: "Content updated successfully",
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

export const getBoardContent = async (req, res) => {
    const roomId = req.query.roomId
    if (!roomId) {
        return res.status(404).json({
            status: "failure",
            data: {
                statusCode: 404,
                message: "roomId is required"
            }
        })
    }
    try {
        const content = await Board.findOne({ roomId })
        res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: content
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