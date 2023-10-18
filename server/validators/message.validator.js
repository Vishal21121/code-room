import { body } from "express-validator"
import { AvailableMessageTypes } from "../util/constants.js"

export const messageValidator = () => {
    return [
        body("roomId")
            .trim()
            .notEmpty()
            .withMessage("Please enter roomId"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Please enter username"),
        body("messageType")
            .isIn(AvailableMessageTypes)
            .withMessage("Invalid message type"),
    ]
}