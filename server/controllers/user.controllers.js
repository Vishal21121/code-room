import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userid) => {
    try {
        const user = await User.findById(userid)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // updating the refersh token and isLoggedIn in the database
        await User.updateOne(
            { _id: userid },
            { $set: { refreshToken, isLoggedIn: true } }
        )
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        return res.status(500).json({
            success: "failure",
            data: {
                statusCode: 500,
                message: "Something went wrong while generating the access token"
            }
        })
    }

}

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existedUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existedUser) {
            return res.status(409).json({
                status: "failure",
                data: {
                    statusCode: 409,
                    message: "User with this username or email already exists",
                }
            })
        }
        const userCreated = await User.create({ username, email, password })
        const userGot = await User.findById(userCreated._id).select("-password -refereshToken -isLoggedIn");
        if (!userGot) {
            return res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    message: "Internal Server error",
                }
            })
        }
        return res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                message: "User created successfully",
                value: userGot,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }


}


export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // finding the user
        const user = await User.findOne({ email })
        // if user not found return unauthorised response
        if (!user) {
            return res.status(401).json({
                status: "failure",
                data: {
                    statusCode: 401,
                    message: "Please enter correct credentials",
                }
            })
        }
        // checking whether password is correct using the method return in user.models.js
        const passwordCorrect = await user.isPasswordCorrect(password);
        // if password is incorrect return unauthorised response
        if (!passwordCorrect) {
            return res.status(401).json({
                status: "failure",
                data: {
                    statusCode: 401,
                    message: "Please enter correct credentials",
                }
            })
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        // getting the details of the logged in user
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        const options = {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
        return res.status(200)
            .cookie("refreshToken", refreshToken, options)
            .json({
                status: "success",
                data: {
                    message: "User logged in successfully",
                    accessToken,
                    loggedInUser
                }
            })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: "Internal server error"
            }
        })
    }
}

export const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken
    if (!incomingRefreshToken) {
        return res.status(401).json({
            status: "failure",
            data: {
                statusCode: 401,
                message: "Unauthorized request"
            }
        })
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id)
        if (!user) {
            return res.status(401).json({
                success: false,
                data: {
                    statusCode: 401,
                    message: "Invalid refersh token"
                }
            })
        }
        if (incomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({
                success: false,
                data: {
                    statusCode: 401,
                    message: "Referesh token is expired or used"
                }
            })
        }
        const options = {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
        }
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
        return res
            .status(200)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                status: "success",
                data: {
                    statusCode: 200,
                    message: "Access token refereshed",
                    accessToken,
                }
            });

    } catch (error) {
        console.log("helo");
        return res.status(401).json({
            status: "failure",
            data: {
                message: error.message || "Invalid refresh token"
            }
        })
    }
}