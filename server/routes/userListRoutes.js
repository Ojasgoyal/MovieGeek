import express from 'express';
import { getListItems } from '../controllers/savedlistControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:username/list', verifyToken, getListItems);

export default router;