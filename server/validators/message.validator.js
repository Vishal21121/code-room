import { body } from "express-validator"
import { AvailableMessageTypes } from "../util/constants"

export const messageValidator = () => {
    return [
        body("message")
            .trim()
            .notEmpty()
            .withMessage("Please enter some message"),
        body("roomId")
            .trim()
            .notEmpty()
            .withMessage("Please enter roomId"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Please enter username"),
        body("messsageType")
            .isIn(AvailableMessageTypes)
            .withMessage("Invalid message type"),
    ]
}