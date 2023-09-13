import jwt from "jsonwebtoken"
import { User } from "../models/user.models";

export const verifyJWT = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({
            success: false,
            data: {
                message: "Unauthorized request"
            }
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = User.findById(decodedToken?._id).select("-password -refreshToken -isLoggedIn")
        if (!user) {
            res.status(401).json({
                success: false,
                data: {
                    message: "Invalid access token"
                }
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            data: {
                message: error.message || "Invalid access token"
            }
        })
    }
}

