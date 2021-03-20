import{
    post_program
} from "../Controllers/Program.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";

const router=express.Router()

router.post('/',async (req,res)=> await post_program(req,res));

export default router;