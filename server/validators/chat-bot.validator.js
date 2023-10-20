import { body } from "express-validator"
import { AvailableSenderTypes } from "../util/constants.js"

export const createChatContainerValidator = () => {
    return [
        body("roomId")
            .trim()
            .notEmpty()
            .withMessage("Please enter roomId"),
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Please enter chat container name")
    ]
}

export const createChatValidator = () => {
    return [
        body("roomId")
            .trim()
            .notEmpty()
            .withMessage("Please enter roomId"),
        body("chatContainerId")
            .trim()
            .notEmpty()
            .withMessage("Please enter container id"),
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Please enter content"),
        body("senderType")
            .isIn(AvailableSenderTypes)
            .withMessage("Invalid sender type")
    ]
}