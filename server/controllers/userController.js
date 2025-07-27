import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const getUserProfile = async (req ,res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({username}).select("-password").populate("username name avatar.url");

        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const updateUserProfile = async (req,res)=>{
    try {
        const {username} = req.params
        const allowedFields = ["name", "bio"];

        const updates = Object.keys(req.body);
        const isValid = updates.every((field) => allowedFields.includes(field));

        if (!isValid) {
            return res.status(400).json({ error: "Invalid fields in update" });
        }

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

        const update = {};
        updates.forEach((field) => {
        update[field] = req.body[field];
        });

        if (req.file && req.file.buffer) {
            if (user.avatar?.public_id){
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }
        }
        
        const streamUpload = () => new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "avatars",
                    transformation: [{ width: 500, height: 500, crop: "limit" }],
                },
                (error,result) => {
                    if(result ) resolve (result);
                    else reject(error); 
                }
            )
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })

        const result = await streamUpload();
        update.avatar = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        
        const updatedUser = await User.findOneAndUpdate({username},update,{
            new:true,
            runValidators: true,

        }).select("-password");

        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
