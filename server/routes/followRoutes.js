import express from 'express';
import { toggleFollow,getfollowers,getfollowing } from '../controllers/followController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:username/togglefollow', verifyToken, toggleFollow);
router.get('/:username/followers', verifyToken, getfollowers);
router.get('/:username/following', verifyToken, getfollowing);

export default router;