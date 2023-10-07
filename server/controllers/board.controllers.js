import { Board } from "../models/board.models.js"

export const addBoard = async (req, res) => {
    const { roomId } = req.body
    if (!roomId) {
        return res.status(404).json({
            statusCode: 404,
            status: "failure",
            data: {
                message: "roomId is required"
            }
        })
    }
    try {
        const board = await Board.create({ roomId, "content": "" })
        return res.status(200).json({
            statusCode: 201,
            status: "success",
            data: {
                message: "board created successfully",
                value: board
            }
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            status: "failure",
            data: {
                message: error.message || "Internal server error"
            }
        })
    }

}

export const updateBoard = async (req, res) => {
    const { roomId, content } = req.body
    if (!roomId) {
        return res.status(404).json({
            statusCode: 404,
            status: "failure",
            data: {
                message: "enter the roomId"
            }
        })
    }
    try {
        const board = await Board.findOne({ roomId })
        if (!board) {
            return res.status(404).json({
                statusCode: 404,
                status: "failure",
                data: {
                    message: "enter correct roomId"
                }
            })
        }
        const boardGot = await Board.updateOne({ roomId }, { $set: { content: content } })
        return res.status(200).json({
            statusCode: 200,
            status: "success",
            data: {
                message: "Content updated successfully",
            }
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            status: "failure",
            data: {
                message: error.message || "Internal server error"
            }
        })
    }
}

export const getBoardContent = async (req, res) => {
    const { roomId } = req.body
    if (!roomId) {
        return res.status(404).json({
            statusCode: 404,
            status: "failure",
            data: {
                message: "roomId is required"
            }
        })
    }
    try {
        const content = await Board.findOne({ roomId })
        res.status(200).json({
            statusCode: 200,
            status: "success",
            data: {
                value: content
            }
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            status: "failure",
            data: {
                message: error.message || "Internal server error"
            }
        })
    }
}