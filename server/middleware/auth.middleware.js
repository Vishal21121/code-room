import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            success: false,
            data: {
                statusCode: 401,
                message: "Unauthorized request"
            }
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = User.findById(decodedToken?._id).select("-password -refreshToken -isLoggedIn")
        if (!user) {
            return res.status(401).json({
                success: false,
                data: {
                    statusCode: 401,
                    message: "Invalid access token"
                }
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {
                statusCode: 401,
                message: error.message || "Invalid access token"
            }
        })
    }
}

