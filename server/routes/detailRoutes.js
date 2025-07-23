import express from 'express'
import { getDetails } from '../controllers/detailController.js'
import { getContent } from '../controllers/contentController.js';


const router = express.Router();
router.get('/:type/:id', getDetails);
router.get('/:type/:id/:content', getContent);

export default router;