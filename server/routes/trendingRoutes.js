import express from 'express'
import { getTrending } from '../controllers/listController.js';

const router = express.Router();

router.get('/:type/:time', getTrending);


export default router;