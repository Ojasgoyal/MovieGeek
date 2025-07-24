import express from "express"
import { getUserProfile , updateUserProfile } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { authorizeSelf } from "../middlewares/authorizeSelf.js"
import upload from "../middlewares/multer.js"

const router = express.Router();

router.get("/:username", getUserProfile);
router.put("/:username", verifyToken,upload.single("avatar"), authorizeSelf, updateUserProfile);

export default router;