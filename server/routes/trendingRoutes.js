import express from 'express'
import { getTrending } from '../controllers/listController.js';

const router = express.Router();

router.get('/:type/week',  (req,res)=>{
    req.params.time = 'week';
    return getTrending(req,res);
})

router.get('/:type/', (req,res)=>{
    req.params.time = 'day';
    return getTrending(req,res);
})


export default router;