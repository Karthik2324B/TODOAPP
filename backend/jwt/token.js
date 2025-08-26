import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const  generateTokenandSaveInCookie =async (userId, res) => {
    const token =  jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d", // Token expiration time
    });
    res.cookie("jwt",token,{
        httpOnly: true,
        secure:false,
        sameSite: "lax",
        path: "/"

    })

    await User.findByIdAndUpdate(userId, { token }, { new: true });
    return token;
};

