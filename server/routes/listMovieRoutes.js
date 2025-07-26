import express from 'express';
import { addToList, removeFromList } from '../controllers/savedlistControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:type/:id/add', verifyToken, addToList);
router.delete('/:type/:id/remove', verifyToken, removeFromList);

export default router;
