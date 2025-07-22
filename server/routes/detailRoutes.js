import express from 'express'
import { getDetails } from '../controllers/detailController.js'

const router = express.Router();
router.get('/:type/:id', getDetails);

export default router;