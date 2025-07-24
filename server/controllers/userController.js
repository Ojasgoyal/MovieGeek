import User from "../models/User.js";

export const getUserProfile = async (req ,res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({username}).select("-password").populate("username name avatarUrl");

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
        const update = {};
        updates.forEach((field) => {
        update[field] = req.body[field];
        });

        if (req.file && req.file.path) {
        update.avatarUrl = req.file.path;
        }        

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
