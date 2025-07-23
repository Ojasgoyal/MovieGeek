import express from 'express'
import { getList } from '../controllers/listController.js';

const router = express.Router();

router.get('/:type/', getList)
router.get('/:type/:list', getList);

export default router;