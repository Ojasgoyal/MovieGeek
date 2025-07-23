import express from 'express'
import { search } from '../controllers/searchController.js'

const router = express.Router();
router.get("/search" ,(req,res)=>  {
    req.params.type = 'multi';
    return search(req,res)
});
router.get("/search/:type" , search);
export default router;