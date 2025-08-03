import Follow from "../models/Follow.js";
import User from "../models/User.js";

export const toggleFollow = async (req,res) => {
    const followerId = req.user.userId
    const username = req.params.username;
    
    try {
        const targetUser = await User.findOne({username})
        if(!targetUser){
            return res.status(404).json({ error: "User not found" });
        }
        const followingId = targetUser._id.toString();
        
        if (followerId === followingId) {
            return res.status(400).json({ error: "You can't follow yourself." });
        }
        
        const existing = await Follow.findOne({follower: followerId, following: followingId})
        
        if(existing){
            await Follow.deleteOne({ _id: existing._id });
            return res.json({ message: 'Unfollowed successfully' });
        } else {
            await Follow.create({ follower: followerId, following: followingId });
            return res.json({ message: 'Followed successfully' });
        }
    } catch (error) {      
        return res.status(500).json({ error: "Could not Follow Server error" });
    }
}

export const getfollowers = async (req,res) =>{
    try {
        const username = req.params.username;
        const targetUser = await User.findOne({ username });
        const userId = targetUser._id;
        const followers = await Follow.find({following:userId})
        .populate("follower", "username name bio avatar.url")
        .sort({ followedAt: -1 })

        res.status(200).json({ followers: followers.map(f => f.follower) });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
export const getfollowing = async (req,res) =>{
    try {
        const username = req.params.username;
        const targetUser = await User.findOne({ username });
        const userId = targetUser._id;
        const following = await Follow.find({follower:userId})
        .populate("following", "username name bio avatar.url")
        .sort({ followedAt: -1 })

        res.status(200).json({ following: following.map(f => f.following) });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}