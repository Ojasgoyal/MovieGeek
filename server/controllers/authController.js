import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
import jwt from "jsonwebtoken"

export const registerUser = async (req , res) => {
    try {
        const {name , username , email , password } = req.body

        if(!username || !email || !password){
            return res.status(400).json({ error: "All fields are required" })

        }

        const existingUser = await User.findOne({
            $or: [{email},{username}]
        })
        if(existingUser){
            return res.status(409).json({ error: "User already exists" })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            username,
            email,
            password : hashedPassword,
        }) 

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();
        res
          .cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(201)
          .json({ 
            message: "User registered successfully",
            accessToken,
            user: {
                
                _id: user._id,
                username: user.username,
                email: user.email,
            },
          });
    } catch (error){
        res.status(500).json({ error: "Server error" });
    }
}


export const loginUser = async (req,res) => {
    try {
        const {email , password} = req.body

        if (!email || !password){
            return res.status(400).json({ error: "Email and password are required" })
        }

        const user = await User.findOne({email})
        if (!user){
            return res.status(404).json({ error: "User not found" })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({error: "Invalid credentials"})
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res
          .cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({
            message: "Login successful",
            accessToken,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const refreshAccessToken = async (req,res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ error: "No refresh token" });
        
        const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user || user.refreshToken !== token) {
        return res.status(403).json({ error: "Invalid refresh token" });
        }

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });

    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }

}

export const logoutUser = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }).json({ message: "Logged out successfully" });

  } catch {
    res.clearCookie("refreshToken").sendStatus(204);
  }
};
