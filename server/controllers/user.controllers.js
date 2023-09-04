import { User } from "../models/user.models.js"


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existedUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existedUser) {
            res.status(409).json({
                status: "failure",
                data: {
                    statusCode: 409,
                    message: "User with email or username already exists",
                }
            })
        }
        const userCreated = await User.create({ username, email, password })
        const userGot = await User.findById(userCreated._id).select("-password -refereshToken -isLoggedIn");
        if (!userGot) {
            res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    message: "Internal Server error",
                }
            })
        }
        res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                message: "User created successfully",
                value: userGot,
            }
        })
    } catch (error) {
        console.log(error.message);
    }


}

// TODO: Add login controller