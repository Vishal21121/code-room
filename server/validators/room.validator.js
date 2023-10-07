import { body } from "express-validator";

export const roomValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Please enter the room name")
            .isLowercase()
            .withMessage("Room name must be lowercase")
            .isLength({ min: 3 })
            .withMessage("Room name must be at least 3 characters long"),
        body("users")
            .custom(value => Array.isArray(value))
            .withMessage("User field must be an array")
            .custom(value => Array.isArray(value) && value.length > 0)
            .withMessage("room cannot be created with empty users"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Please enter your password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
        body("admin")
            .trim()
            .notEmpty()
            .withMessage("Please enter a admin name")
            .isLowercase()
            .withMessage("admin name must be lowercase")
            .isLength({ min: 3 })
            .withMessage("admin name must be at least 3 characters long"),
    ]
}