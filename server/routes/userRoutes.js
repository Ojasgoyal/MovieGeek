import express from "express"
import { getUserProfile , updateUserProfile ,updatePassword} from "../controllers/userController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { authorizeSelf } from "../middlewares/authorizeSelf.js"
import upload from "../middlewares/multer.js"

const router = express.Router();

router.put("/updatepassword", verifyToken, updatePassword);
router.put("/edit", verifyToken, upload.single("avatar"), updateUserProfile);
router.get("/:username", getUserProfile);

export default router;