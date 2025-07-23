export const authorizeSelf = (req, res , next)=>{
    const requiredUsername = req.params.username
    const loggedInusername = req.user?.username
    if(requiredUsername !== loggedInusername){
        return res.status(403).json({ error: "Forbidden: You can only modify your own profile" });
    }
    
    next();
}