import { body } from "express-validator"

export const createChatContainerValidator = () => {
    return [
        body("roomId")
            .trim()
            .notEmpty()
            .withMessage("Please enter roomId"),
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Please enter username")
    ]
}