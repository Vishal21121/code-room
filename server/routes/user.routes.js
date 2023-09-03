import express from "express"
import { userRegisterValidator } from "../validators/user.validator.js"
import validation from "../middleware/validate.middlewares.js"
import { userRegister } from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/register").post(userRegisterValidator(), validation, userRegister);