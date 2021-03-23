import{
    post_program,
    get_programs,
    get_program,
    update_program
} from "../Controllers/Program.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";

const router=express.Router()

router.get('/',async(req,res)=>await get_programs(req,res));

router.post('/',async (req,res)=> await post_program(req,res));

router.get('/:id',async(req,res)=>await get_program(req,res));

router.put('/:id',async(req,res)=>await update_program(req,res))

export default router;