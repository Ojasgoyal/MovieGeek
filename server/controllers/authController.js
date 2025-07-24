import User from "../models/User.js"
import bcrypt from "bcryptjs"
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
        await user.save();
        console.log("✅ User registered:", user.username);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error){
        console.error("❌ Register error:", error);
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

        const token = jwt.sign(
            { userId: user._id ,username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        console.log("✅ User logged in:", user.username);
        res.status(200).json({
        message: "Login successful",
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
}