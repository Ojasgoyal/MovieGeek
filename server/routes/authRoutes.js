import express from 'express';
import { registerUser, loginUser,refreshAccessToken, logoutUser} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
