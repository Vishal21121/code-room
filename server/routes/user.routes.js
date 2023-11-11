import express from "express"
import { userLoginValidator, userRegisterValidator } from "../validators/user.validator.js"
import { validation } from "../middleware/validate.middlewares.js"
import { registerUser, loginUser, refreshAccessToken } from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/register").post(userRegisterValidator(), validation, registerUser);
router.route("/login").post(userLoginValidator(), validation, loginUser);
router.route("/refreshToken").get(refreshAccessToken)

export default router