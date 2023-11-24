import { body } from "express-validator";

export const notesCreateValidator = () => {
    return [
        body("roomId")
            .trim()
            .notEmpty()
            .withMessage("Please enter the room id"),
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Please enter the title")
            .isLength({ min: 3 })
            .withMessage("title must be at least 3 characters long"),
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Please enter content")
    ]
}

export const notesUpdateValidator = () => {
    return [
        body("notesId")
            .trim()
            .notEmpty()
            .withMessage("Please enter the room id"),
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Please enter the title")
            .isLength({ min: 3 })
            .withMessage("title must be at least 3 characters long"),
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Please enter content")
    ]
}