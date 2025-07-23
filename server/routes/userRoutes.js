import express from "express"
import { getUserProfile , updateUserProfile } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { authorizeSelf } from "../middlewares/authorizeSelf.js"

const router = express.Router();

router.get("/:username", getUserProfile);
router.put("/:username", verifyToken, authorizeSelf, updateUserProfile);

export default router;