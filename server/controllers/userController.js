import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import bcrypt from "bcryptjs"
import List from "../models/List.js";
import Follow from "../models/Follow.js";

export const getUserProfile = async (req ,res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({username}).select("-password -refreshToken").populate("username name avatar.url");

        if (!user) return res.status(404).json({ error: "User not found" });
        
        const [watchedCount, watchlistCount, favoritesCount, followersCount, followingCount] = await Promise.all([
        List.countDocuments({ user: user._id, status: 'watched' }),
        List.countDocuments({ user: user._id, status: 'watchlist' }),
        List.countDocuments({ user: user._id, status: 'favorites' }),
        Follow.countDocuments({ following: user._id }),
        Follow.countDocuments({ follower: user._id }),
        ]);
 
        res.json({
            user,
            stats: {
                watchedCount,
                watchlistCount,
                favoritesCount,
                followersCount,
                followingCount,
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const updateUserProfile = async (req,res)=>{
    try {
        const {userId} = req.user
        const allowedFields = ["name", "bio"];

        const updates = Object.keys(req.body);
        const isValid = updates.every((field) => allowedFields.includes(field));

        if (!isValid) {
            return res.status(400).json({ error: "Invalid fields in update" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const update = {};
        updates.forEach((field) => {
        update[field] = req.body[field];
        });

        if (req.file && req.file.buffer) {
            if (user.avatar?.public_id){
                await cloudinary.uploader.destroy(user.avatar.public_id);
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
        }

        
        const updatedUser = await User.findByIdAndUpdate(userId,update,{
            new:true,
            runValidators: true,

        }).select("-password -refreshToken");

        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const updatePassword = async (req,res) => {
    try {
        const { userId } = req.user
        const { currPassword , newPassword } = req.body

        if(!currPassword || !newPassword){
            return res.status(400).json({ error: "Both current and new passwords are required" });
        }
        if(currPassword === newPassword){
            return res.status(400).json({ error: "Both current and new passwords are same" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(currPassword, user.password);
        if (!isMatch) return res.status(401).json({ error: "Current password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ error: "Server error: Can't Update Password" });
    }
}