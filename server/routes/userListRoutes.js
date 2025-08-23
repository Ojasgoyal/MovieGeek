import express from 'express';
import { getListItems } from '../controllers/savedlistControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:username/list', getListItems);

export default router;