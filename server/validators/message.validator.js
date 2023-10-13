import { body } from "express-validator"

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
    ]
}