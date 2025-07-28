import jwt from "jsonwebtoken"

export const generateAccessToken = (user) => {
    return jwt.sign({userId: user._id, username: user.username},process.env.JWT_ACCESS_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE,
    })
}

export const generateRefreshToken = (user) => {
    return jwt.sign({userId: user._id},process.env.JWT_REFRESH_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRE,
    })
}